let extractedData = [];

document.addEventListener('DOMContentLoaded', () => {
    const statusEl = document.getElementById('status');
    const resultsList = document.getElementById('resultsList');
    const fetchBtn = document.getElementById('fetchBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    fetchBtn.addEventListener('click', async () => {
        statusEl.textContent = 'Fetching...';
        fetchBtn.disabled = true;
        downloadBtn.disabled = true;
        resultsList.innerHTML = '';

        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            if (!tab) {
                statusEl.textContent = 'No active tab found.';
                fetchBtn.disabled = false;
                return;
            }

            // Execute the script directly in the MAIN world to bypass CSP
            const injectionResults = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                world: 'MAIN',
                func: async () => {
                    try {
                        console.log("[WA Exporter] Initiating React-based ID Extraction...");

                        let groupInfoDrawer = document.querySelector('section[data-testid="group-info-drawer-body"]');

                        if (!groupInfoDrawer) {
                            return [{ error: "Please click on the group name first to open the information panel on the right." }];
                        }

                        let reactKey = Object.keys(groupInfoDrawer).find(key => key.startsWith('__reactFiber$'));
                        let targetGroupId = null;

                        if (reactKey) {
                            let node = groupInfoDrawer[reactKey];
                            while (node) {
                                if (node.pendingProps && node.pendingProps.chat && node.pendingProps.chat.id) {
                                    let chatIdObj = node.pendingProps.chat.id;
                                    targetGroupId = chatIdObj._serialized || (chatIdObj.user + "@" + chatIdObj.server) || chatIdObj;
                                    break;
                                }
                                if (node.pendingProps && node.pendingProps.jid) {
                                    targetGroupId = node.pendingProps.jid;
                                    break;
                                }
                                node = node.return;
                            }
                        }

                        if (!targetGroupId) {
                            return [{ error: "Group ID was not extracted. Please refresh the page and try again." }];
                        }
                        console.log(`[WA Exporter] Target Group ID found: ${targetGroupId}`);

                        console.log("[WA Exporter] Connecting to IndexedDB...");
                        let db = await new Promise((resolve, reject) => {
                            let req = indexedDB.open('model-storage');
                            req.onsuccess = () => resolve(req.result);
                            req.onerror = () => reject(new Error("Database access denied."));
                        });

                        let tx = db.transaction(['participant', 'contact'], 'readonly');
                        let participantStore = tx.objectStore('participant');
                        let contactStore = tx.objectStore('contact');

                        // ۳. دریافت لیست اعضا بر اساس LID
                        let targetGroupMeta = await new Promise(resolve => {
                            let req = participantStore.get(targetGroupId);
                            req.onsuccess = () => resolve(req.result);
                        });

                        if (!targetGroupMeta || !targetGroupMeta.participants) {
                            return [{ error: "The list of members in this group is empty in the database." }];
                        }

                        let allContacts = await new Promise(resolve => {
                            let req = contactStore.getAll();
                            req.onsuccess = () => resolve(req.result);
                        });

                        let results = [];
                        let participantsList = targetGroupMeta.participants || [];
                        let adminsList = targetGroupMeta.admins || [];

                        console.log(`[WA Exporter] Extracting ${participantsList.length} members using LID cross-referencing...`);

                        participantsList.forEach(lid => {
                            let contactInfo = allContacts.find(c => c.id === lid);


                            let rawPhone = (contactInfo && contactInfo.phoneNumber) ? contactInfo.phoneNumber : lid;
                            let cleanNumber = rawPhone.split('@')[0];


                            let name = (contactInfo && contactInfo.name) ? contactInfo.name :
                                (contactInfo && contactInfo.shortName) ? contactInfo.shortName :
                                    (contactInfo && contactInfo.pushname) ? contactInfo.pushname : "";

                            results.push({
                                "Phone Number": "+" + cleanNumber,
                                "Name": name,
                                "Admin": adminsList.includes(lid) ? "Yes" : "No"
                            });
                        });

                        console.log("[WA Exporter] Extraction complete! Data sent to UI.");
                        return results;

                    } catch (err) {
                        console.error("[WA Exporter] Fatal Error:", err);
                        return [{ error: err.message }];
                    }
                }
            });

            // Retrieve the returned array from the first frame's execution result
            const results = injectionResults[0].result;

            if (!results || results.length === 0) {
                statusEl.textContent = 'Total Items: 0';
                resultsList.innerHTML = '<li style="text-align: center; color: var(--text-secondary); background: transparent; border: none;">No data returned.</li>';
                fetchBtn.disabled = false;
                return;
            }

            // Check if the script returned an error object
            if (results.length === 1 && results[0].error) {
                statusEl.textContent = 'Error during extraction.';
                resultsList.innerHTML = `<li style="color: #ef4444; font-size: 13px; background: transparent; border: none;">${results[0].error}</li>`;
                fetchBtn.disabled = false;
                return;
            }

            extractedData = results;
            statusEl.textContent = `Total Items: ${extractedData.length}`;

            // Render the list
            extractedData.forEach(item => {
                const li = document.createElement('li');
                li.textContent = JSON.stringify(item, null, 2);
                resultsList.appendChild(li);
            });

            // Enable buttons
            downloadBtn.disabled = false;

        } catch (err) {
            console.error(err);
            statusEl.textContent = 'Error: Could not execute script.';
            resultsList.innerHTML = `<li style="color: #ef4444; font-size: 13px; background: transparent; border: none;">${err.message}</li>`;
        }

        fetchBtn.disabled = false;
    });

    // Download Handler
    downloadBtn.addEventListener('click', () => {
        let csvContent = "Data\n";
        extractedData.forEach(item => {
            const str = typeof item === 'string' ? item : JSON.stringify(item);
            const escaped = str.replace(/"/g, '""');
            csvContent += `"${escaped}"\n`;
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        chrome.downloads.download({
            url: url,
            filename: 'local_db_export.csv',
            saveAs: false
        }, () => {
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        });
    });
});
