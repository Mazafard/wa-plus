# Changelog

All notable changes to this project will be documented in this file.

## [1.1.5] - 2026-07-02
### Fixed
- Fixed Mozilla validation errors by adding `data_collection_permissions: ["none"]` to the Firefox manifest.
- Resolved a Firefox manifest warning by removing an incorrectly sized `96.png` icon file.

## [1.1.4] - 2026-07-02
### Added
- Added support for Mozilla Firefox (configured `gecko.id` in manifest).
- Added Firefox automated build (`.zip`) step to the GitHub Actions CI pipeline.
- Created `PUBLISHING_FIREFOX.md` with instructions for submitting to the Mozilla Add-ons store.

## [1.1.2] - 2026-07-02
### Fixed
- Fixed CI failure by allowing `npm version` to succeed gracefully when the version is already manually bumped locally (`--allow-same-version`).

## [1.1.1] - 2026-07-02
### Added
- Implemented a fully automated, centralized dynamic versioning system. The GitHub Release tag now automatically injects the version into the manifest and UI before zipping.
- Added the official Chrome Web Store link to the `docs/index.html` landing page.
### Changed
- Configured WXT to output build artifacts cleanly to a standard `dist/` directory instead of `.output/`.

## [1.1.0] - 2026-07-02
### Removed
- Removed unused WXT boilerplate scripts (`background.ts` and `content.ts`) to eliminate unnecessary permissions.

## [1.0.0] - 2026-07-01
### Added
- Initial release of WA+ (WhatsApp Plus Exporter).
- Fast memory extraction from WhatsApp Web React Fiber tree.
- Exports Names, Phone Numbers, Admin Statuses, and Avatars to CSV/JSON.
- 100% local, privacy-first architecture with zero external APIs.
