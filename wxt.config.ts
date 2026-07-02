import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  outDir: 'dist',
  manifest: {
    name: "WA+",
    description: "A professional tool to extract group participants and metadata seamlessly from WhatsApp Web.",
    browser_specific_settings: {
      gecko: {
        id: "wa-plus@fard.pt",
        strict_min_version: "109.0",
        data_collection_permissions: {
          required: ["none"]
        }
      }
    },
    permissions: ["activeTab", "scripting", "downloads"],
    content_security_policy: {
      extension_pages: "script-src 'self'; object-src 'self'; img-src 'self' data: https://*.whatsapp.net https://*.fbcdn.net;"
    },
    action: {
      default_title: "WA+",
      default_icon: {
        "16": "icon/16.png",
        "32": "icon/32.png",
        "48": "icon/48.png",
        "128": "icon/128.png"
      }
    }
  }
});
