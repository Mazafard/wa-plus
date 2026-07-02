export function downloadCSV(data: any[], filename = 'wa_plus_export.csv', fullInfo = false) {
    if (!data || data.length === 0) return;

    let headers = ["Phone Number", "Name"];
    if (fullInfo) {
        headers = ["Phone Number", "Name", "Admin", "Pushname", "Short Name", "Is Business", "Is Enterprise", "Is My Contact", "LID"];
    }

    let csvContent = headers.join(',') + "\n";
    
    data.forEach(item => {
        let row = headers.map(header => {
            let val = item[header] || "";
            return `"${String(val).replace(/"/g, '""')}"`;
        });
        csvContent += row.join(',') + "\n";
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    browser.downloads.download({
        url: url,
        filename: filename,
        saveAs: false
    }).then(() => {
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
}

export function downloadJSON(data: any[], filename = 'wa_plus_export.json', fullInfo = false) {
    if (!data || data.length === 0) return;

    let processedData = data;
    if (!fullInfo) {
        processedData = data.map(item => ({
            "Phone Number": item["Phone Number"],
            "Name": item["Name"]
        }));
    }

    const jsonContent = JSON.stringify(processedData, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    browser.downloads.download({
        url: url,
        filename: filename,
        saveAs: false
    }).then(() => {
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
}

export async function copyToClipboard(data: any[], format: string, fullInfo = false) {
    if (!data || data.length === 0) return;

    let textToCopy = '';
    
    let processedData = data;
    if (!fullInfo) {
        processedData = data.map(item => ({
            "Phone Number": item["Phone Number"],
            "Name": item["Name"]
        }));
    }

    if (format === 'json') {
        textToCopy = JSON.stringify(processedData, null, 2);
    } else {
        let headers = ["Phone Number", "Name"];
        if (fullInfo) {
            headers = ["Phone Number", "Name", "Admin", "Pushname", "Short Name", "Is Business", "Is Enterprise", "Is My Contact", "LID"];
        }
        textToCopy = headers.join('\t') + "\n" + processedData.map(item => headers.map(h => item[h] || "").join('\t')).join('\n');
    }

    await navigator.clipboard.writeText(textToCopy);
}
