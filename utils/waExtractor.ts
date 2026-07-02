export async function extractLocalData() {
    try {
        console.log("[WA Exporter] Initiating React-based ID Extraction...");

        let groupInfoDrawer = document.querySelector('section[data-testid="group-info-drawer-body"]');

        if (!groupInfoDrawer) {
            return [{ error: "Please click on the group name first to open the information panel on the right." }];
        }

        // @ts-ignore
        let reactKey = Object.keys(groupInfoDrawer).find(key => key.startsWith('__reactFiber$'));
        let targetGroupId = null;

        if (reactKey) {
            // @ts-ignore
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
        let db = await new Promise<IDBDatabase>((resolve, reject) => {
            let req = indexedDB.open('model-storage');
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(new Error("Database access denied."));
        });

        let tx = db.transaction(['participant', 'contact', 'profile-pic-thumb'], 'readonly');
        let participantStore = tx.objectStore('participant');
        let contactStore = tx.objectStore('contact');
        let picStore = tx.objectStore('profile-pic-thumb'); // Added picture store

        // Fetch group metadata
        let targetGroupMeta = await new Promise<any>(resolve => {
            let req = participantStore.get(targetGroupId);
            req.onsuccess = () => resolve(req.result);
        });

        if (!targetGroupMeta || !targetGroupMeta.participants) {
             return [{ error: "No participants found in the database." }];
        }

        // Fetch all contacts
        let allContacts = await new Promise<any[]>(resolve => {
            let req = contactStore.getAll();
            req.onsuccess = () => resolve(req.result);
        });

        // Fetch all profile pictures
        let allPics = await new Promise<any[]>(resolve => {
            let req = picStore.getAll();
            req.onsuccess = () => resolve(req.result);
        });

        let results: any[] = [];
        let participantsList = targetGroupMeta.participants || [];
        let adminsList = targetGroupMeta.admins || [];

        console.log(`[WA Exporter] Extracting ${participantsList.length} members using LID cross-referencing...`);

        participantsList.forEach((lid: string) => {
            let contactInfo = allContacts.find(c => c.id === lid);
            let picInfo = allPics.find(p => p.id === lid);
            
            // Extract Phone Number
            let rawPhone = (contactInfo && contactInfo.phoneNumber) ? contactInfo.phoneNumber : lid;
            let cleanNumber = rawPhone.split('@')[0];

            // Extract Name (Saved name OR ~Pushname)
            let name = "Unknown User";
            if (contactInfo && contactInfo.name) {
                name = contactInfo.name;
            } else if (contactInfo && contactInfo.pushname) {
                name = "~" + contactInfo.pushname;
            }

            // Extract Avatar URL (High-res eurl or previewEurl)
            let avatarUrl = null;
            if (picInfo && (picInfo.eurl || picInfo.previewEurl)) {
                avatarUrl = picInfo.eurl || picInfo.previewEurl;
            }

            results.push({
                "Phone Number": "+" + cleanNumber,
                "Name": name,
                "Admin": adminsList.includes(lid) ? "Yes" : "No",
                "Avatar": avatarUrl,
                "Pushname": (contactInfo && contactInfo.pushname) ? contactInfo.pushname : "",
                "Short Name": (contactInfo && contactInfo.shortName) ? contactInfo.shortName : "",
                "Is Business": (contactInfo && contactInfo.isBusiness) ? "Yes" : "No",
                "Is Enterprise": (contactInfo && contactInfo.isEnterprise) ? "Yes" : "No",
                "Is My Contact": (contactInfo && contactInfo.isMyContact) ? "Yes" : "No",
                "LID": lid
            });
        });

        console.log("[WA Exporter] Extraction complete! Data sent to UI.");
        return results;

    } catch (err: any) {
        console.error("[WA Exporter] Fatal Error:", err);
        return [{ error: err.message }];
    }
}
