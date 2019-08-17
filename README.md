# SSH manager

## About

This desktop app was created to have some ssh connections on board and ability to save their settings.

## How to use

### `yarn install-all`
Electron side deps will be installed then frontend side deps will be installed.

### `yarn dev`
You can use hot reload dev mode for frontend react app in this electron app. Electron app BrowserWindow will be created when `http://localhost:3000` will be available.

### `yarn fresh-prod-start`
Fresh frontend will be built to `frontend/build` then will be used.

### `yarn start`
Old build will be used in `frontend/build`.

### `yarn dist`
You can run `$ yarn dist` (to package in a distributable format (e.g. dmg, windows installer, deb package)) or `$ yarn pack` (only generates the package directory without really packaging it. This is useful for testing purposes). See also [electron-builder](https://www.electron.build/). **Note!** to build rpm, executable rpmbuild is required, please install: `$ sudo apt-get install rpm`

See result in `/release`.

To ensure your native dependencies are always matched with electron version, simply add script `"postinstall": "electron-builder install-app-deps"` to your `package.json`.
