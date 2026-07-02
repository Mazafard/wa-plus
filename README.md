# WA+ (WhatsApp Plus Exporter)

A privacy-focused, highly optimized Chrome Extension that extracts participant data (phone numbers, names, and admin status) directly from active WhatsApp Web groups. Built entirely with the [WXT Framework](https://wxt.dev/) and React, WA+ bypasses traditional DOM-scraping limitations by tapping securely into the Main World execution context to interface with internal WhatsApp Webpack modules.

## Features

- **Blazing Fast Extraction:** Hooks directly into WhatsApp's internal IndexedDB (`model-storage`) to pull participant arrays and metadata, bypassing all scrolling and UI-scraping bottlenecks.
- **Privacy First:** 100% of data extraction and CSV/JSON generation happens entirely locally on your machine. Absolutely zero data is sent to external servers.
- **Rich Metadata Options:** Configurable extraction allows you to strip it down to just Phone Numbers and Names, or expand it to include Pushnames, Admin Status, Business/Enterprise flags, and raw LIDs.
- **Modern UI/UX:** Built with React, featuring a sleek, dark-themed Glassmorphism Bento Box layout.
- **HMR Enabled:** Built on the WXT framework, powered by Vite, enabling instant Hot Module Replacement during development.

## Installation (From Source)

Because this extension uses Manifest V3 and the WXT build system, you'll need Node.js installed to build it locally.

### Prerequisites
- Node.js (v18+)
- `pnpm` (recommended), `npm`, or `bun`

### 1. Clone the repository
```bash
git clone https://github.com/Mazafard/wa-plus.git
cd wa-plus
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Build for Production
```bash
pnpm run build
```
This command compiles the React code and generates the final extension inside the `.output/chrome-mv3/` folder.

### 4. Load into Chrome
1. Open Chrome and navigate to `chrome://extensions/`.
2. Toggle **Developer Mode** on (top right corner).
3. Click **Load unpacked** (top left).
4. Select the `.output/chrome-mv3/` folder generated in the previous step.
5. Pin the WA+ extension to your toolbar!

## Development

To spin up the local development environment with instant Hot Module Replacement (HMR):

```bash
pnpm run dev
```

This will automatically launch a sandboxed instance of Chrome with the extension pre-loaded. Any changes you make to `App.tsx` or the extraction utilities will instantly reflect in the extension without needing to manually reload it.

## Packaging for Chrome Web Store

To generate a production-ready `.zip` file for publishing to the Chrome Web Store:

```bash
pnpm run zip
```
The zip file will be generated in the `.output/` directory (e.g., `.output/wa-plus-1.0.0-chrome.zip`).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
<sub>**Disclaimer:** This project was built strictly for educational purposes to explore the WXT framework and Chrome Extension APIs. The author assumes no legal responsibility or liability for how this software is used. However, you are completely free to fork, modify, or use this code as a base to create your own instances!</sub>
