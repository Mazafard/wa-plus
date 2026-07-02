import { useState, useMemo } from 'react';
import './App.css';
import { extractLocalData } from '@/utils/waExtractor';
import { downloadCSV, downloadJSON, copyToClipboard } from '@/utils/exporter';

export default function App() {
  const [activeTab, setActiveTab] = useState('data');
  const [status, setStatus] = useState('Ready to extract');
  const [extractedData, setExtractedData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFormat, setCurrentFormat] = useState('csv');
  const [adminsOnly, setAdminsOnly] = useState(false);
  const [exportFullInfo, setExportFullInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const filteredData = useMemo(() => {
    let filtered = extractedData;
    if (adminsOnly) {
      filtered = filtered.filter(item => item.Admin === "Yes");
    }
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        (item.Name && item.Name.toLowerCase().includes(lower)) || 
        (item['Phone Number'] && item['Phone Number'].toLowerCase().includes(lower))
      );
    }
    return filtered;
  }, [extractedData, adminsOnly, searchTerm]);

  const handleFetch = async () => {
    setIsLoading(true);
    setStatus('Fetching...');
    setExtractedData([]);

    try {
      const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
      if (!tab || !tab.id) {
        setStatus('No active tab found.');
        setIsLoading(false);
        return;
      }

      const injectionResults = await browser.scripting.executeScript({
        target: { tabId: tab.id },
        world: 'MAIN',
        func: extractLocalData
      });

      const results = injectionResults[0]?.result as any[];

      if (!results || results.length === 0) {
        setStatus('Total Items: 0');
        setIsLoading(false);
        return;
      }

      if (results.length === 1 && results[0].error) {
        setStatus(`Error: ${results[0].error}`);
        setIsLoading(false);
        return;
      }

      setExtractedData(results);
      setStatus(`Showing ${results.length} total items`);
    } catch (err: any) {
      console.error(err);
      setStatus(`Error: ${err.message || 'Could not execute script.'}`);
    }
    setIsLoading(false);
  };

  const handleDownload = () => {
    if (currentFormat === 'csv') {
      downloadCSV(filteredData, 'wa_plus_export.csv', exportFullInfo);
    } else {
      downloadJSON(filteredData, 'wa_plus_export.json', exportFullInfo);
    }
  };

  const handleCopy = async (e: any) => {
    const btn = e.target;
    try {
      await copyToClipboard(filteredData, currentFormat, exportFullInfo);
      const originalText = btn.textContent;
      btn.textContent = 'Copied!';
      btn.style.background = 'rgba(34, 197, 94, 0.2)';
      btn.style.borderColor = 'rgba(34, 197, 94, 0.5)';
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
      }, 2000);
    } catch (err) {
      setStatus('Failed to copy to clipboard.');
    }
  };

  const handleClear = () => {
    setExtractedData([]);
    setSearchTerm('');
    setStatus('Data cleared.');
  };

  return (
    <div className="app-container">
      <header className="bento-item header-item">
        <div className="header-top">
          {/* @ts-ignore */}
          <img src={browser.runtime.getURL('/icon-128.png')} alt="Logo" className="logo-img" style={{ width: 24, height: 24, borderRadius: 6 }} />
          <h2>WA+</h2>
        </div>
        <div id="status">{status}</div>
      </header>

      <nav className="bento-item nav-tabs">
        <button className={`tab-btn ${activeTab === 'data' ? 'active' : ''}`} onClick={() => setActiveTab('data')}>Data</button>
        <button className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>Settings</button>
        <button className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>About</button>
      </nav>

      {/* DATA TAB */}
      <div className={`tab-content ${activeTab === 'data' ? 'active' : ''}`} style={{ display: activeTab === 'data' ? 'flex' : 'none' }}>
        <div className="bento-item action-item">
          <button onClick={handleFetch} disabled={isLoading} className="glass-btn primary">
            {isLoading ? 'Fetching...' : 'Fetch Participants'}
          </button>
        </div>

        {extractedData.length > 0 && (
          <div className="bento-item search-container">
            <input 
              type="text" 
              className="glass-input" 
              placeholder="Search by name or number..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        <div className="bento-item list-container-item">
          <ul className="results-list">
            {extractedData.length === 0 ? (
              <li style={{ textAlign: 'center', color: 'var(--text-secondary)', background: 'transparent', border: 'none' }}>
                {status.startsWith('Error') ? status : 'Click fetch to load data.'}
              </li>
            ) : filteredData.length === 0 ? (
              <li style={{ textAlign: 'center', color: 'var(--text-secondary)', background: 'transparent', border: 'none' }}>
                No matches found.
              </li>
            ) : (
              filteredData.map((item, idx) => (
                <li key={idx} className="contact-item">
                  <div className="contact-avatar">
                    {item.Avatar ? (
                        <img src={item.Avatar} alt="avatar" />
                    ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                    )}
                  </div>
                  <div className="contact-info">
                    <div className="contact-name">
                        <strong>{item.Name || 'Unknown'}</strong>
                        {item.Admin === 'Yes' && <span className="admin-badge">⭐ Admin</span>}
                    </div>
                    <div className="contact-phone">{item['Phone Number']}</div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        <footer className="bento-item footer-item">
          <button onClick={handleDownload} disabled={isLoading || extractedData.length === 0} className="glass-btn primary">Download</button>
          <button onClick={handleCopy} disabled={isLoading || extractedData.length === 0} className="glass-btn secondary">Copy All</button>
        </footer>
      </div>

      {/* SETTINGS TAB */}
      <div className={`tab-content ${activeTab === 'settings' ? 'active' : ''}`} style={{ display: activeTab === 'settings' ? 'flex' : 'none' }}>
        <div className="bento-item settings-list">
          <div className="setting-item">
            <label>Export Format</label>
            <select className="glass-select" value={currentFormat} onChange={(e) => setCurrentFormat(e.target.value)}>
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
            </select>
          </div>
          <div className="setting-item">
            <label>Extract Admins Only</label>
            <label className="switch">
              <input type="checkbox" checked={adminsOnly} onChange={(e) => setAdminsOnly(e.target.checked)} />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="setting-item">
            <label>Export Full Metadata<br/><span style={{fontSize: 10, color: 'var(--text-secondary)'}}>Include Pushname, Admin, Business status, LID</span></label>
            <label className="switch">
              <input type="checkbox" checked={exportFullInfo} onChange={(e) => setExportFullInfo(e.target.checked)} />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="setting-item">
            <button onClick={handleClear} className="glass-btn secondary" style={{ marginTop: 10 }}>Clear Cached Data</button>
          </div>
        </div>
      </div>

      {/* ABOUT TAB */}
      <div className={`tab-content ${activeTab === 'about' ? 'active' : ''}`} style={{ display: activeTab === 'about' ? 'flex' : 'none' }}>
        <div className="bento-item about-container">
          {/* @ts-ignore */}
          <img src={browser.runtime.getURL('/icon-128.png')} alt="WA+" className="about-logo" />
          <h3>WhatsApp Exporter +</h3>
          <p>A professional tool to extract group participants and metadata seamlessly from WhatsApp Web using secure native execution.</p>
          
          <div className="about-links">
            <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="glass-btn secondary github-btn">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              GitHub Profile
            </a>
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 'auto' }}>Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}
