# Jubelio POS Print Service

A Print service for Jubelio POS Web-Based. These apps helped to connect with hardware like Printer or etc with the USB method.

## Features

This repository was build with :

- [Electron](https://electron.org)
- [node-usb-detection](https://github.com/MadLittleMods/node-usb-detection)
- [escpos](https://github.com/song940/node-escpos)
- [ReactJS](https://reactjs.org)
- [Electron React Boilerplate](https://electron-react-boilerplate.js.org/)

## Getting Started

### Clone the repo and install dependencies:

```bash
git clone https://github.com/revell29/electron-print-service.git your-project-name
cd your-project-name
npm install
```

### Starting Development

start the app in the `dev` environment

```bash
npm run start
```

### Packaging for production

To package apps for the local platform:

```bash
npm run package
```

## Issue

if you run this repo and got error `usb.on` not function you should remove or disabled this code.

Open file `node_modules/escpos-usb/index.js`, then search this code and comment this on line `52`

```bash
usb.on('detach', function(device){
  if(device == self.device) {
  self.emit('detach'    , device);
  self.emit('disconnect', device);
  self.device = null;
  }
});
```

and line `169`

```bash
usb.removeAllListeners('detach');
```
