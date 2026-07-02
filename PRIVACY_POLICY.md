# Privacy Policy for WA+

**Effective Date:** 2026

WA+ ("the Extension") is committed to protecting your privacy and ensuring your data remains completely secure. This Privacy Policy outlines how the Extension handles your information.

## 1. Data Collection & Usage

**We do not collect, transmit, store, or sell any personal data.** 

The Extension operates strictly on a "local-first" architecture. All data extraction, processing, and formatting of WhatsApp Web participant lists occur entirely within the boundaries of your local machine and your browser's execution context.

- **Participant Data:** Phone numbers, names, and admin statuses are extracted directly from your active WhatsApp Web session's local `IndexedDB` database.
- **Exporting:** When you download a CSV or JSON file, the file is generated locally by your browser. At no point is this data sent to any external server, API, or third-party service.

## 2. Permissions Justification

To function properly, the Extension requires the following Chrome permissions, all of which are used strictly for local operations:

- **`activeTab`**: Required to identify and interact with the currently active WhatsApp Web tab.
- **`scripting`**: Required to execute the data extraction script directly within the WhatsApp Web page context. This is necessary to securely access the local IndexedDB instance.
- **`downloads`**: Required to generate and save the exported CSV or JSON files directly to your computer's local filesystem.

## 3. Third-Party Access

Because the Extension does not collect or transmit data, no third parties have access to your WhatsApp information through this Extension.

## 4. Changes to this Policy

If we modify this Privacy Policy, we will update the "Effective Date" at the top of this document. We encourage you to review it periodically.

## 5. Contact Us

If you have any questions or concerns regarding this Privacy Policy, please open an issue on our [GitHub Repository](https://github.com/Mazafard/wa-plus/issues).
