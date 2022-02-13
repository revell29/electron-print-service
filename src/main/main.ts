/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-cycle */
/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  Tray,
  Menu,
  nativeImage,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import usbDetect from 'usb-detection';
import escpos from 'escpos';
import USB from 'escpos-usb';
import { WebSocketServer } from 'ws';
import { resolveHtmlPath } from './util';
import MenuBuilder from './menu';
import printAdapter from './printer';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;
let wss: WebSocketServer | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

let tray: Tray | null = null;
function createTray() {
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const icon = `${RESOURCES_PATH}/icon.png`;
  const trayicon = nativeImage.createFromPath(icon);
  tray = new Tray(trayicon.resize({ width: 16 }));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show App',
      click: () => {
        createWindow();
      },
    },
    {
      label: 'Quit',
      click: () => {
        app.quit(); // actually quit the app.
      },
    },
  ]);

  tray.setContextMenu(contextMenu);
}

const createWindow = async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  if (!tray) {
    createTray();
  }

  if (!wss) {
    wss = new WebSocketServer({ port: 4444 }, () => {
      console.log(`WebSocket Server is running on port 4444`);
    });

    wss.on('connection', (ws) => {
      console.log('[WebSocket] connected');
      mainWindow?.webContents.send('server-on', true);

      ws.on('message', async (data) => {
        try {
          await printAdapter(data);
        } catch (error) {
          ws.send({
            message: 'error',
            detail: error,
          });
        }
      });
    });
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    title: 'Jubelio Print Service',
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('page-title-updated', (e) => {
    e.preventDefault();
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */
app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
  // app.dock.hide(); // for macOS
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);

usbDetect.startMonitoring();

ipcMain.on('printer', async (event) => {
  usbDetect.startMonitoring();
  const deviceConnected = await USB.findPrinter();

  if (deviceConnected.length === 0) {
    const device = await USB.getDevice();
    const options = { width: 80 };
    const printer = new escpos.Printer(device, options);
    device.open(() => {
      printer.print('Test Print after connected').flush();
    });
  } else {
    usbDetect.find((err, devices) => {
      if (err) log.error(err);

      const findDevice = devices.find(
        (device) =>
          device.productId === deviceConnected[0].deviceDescriptor.idProduct
      );
      event.reply('printer', findDevice);
      return findDevice;
    });
  }
});

usbDetect.on('remove', (devices) => {
  console.log('[Device removed]', devices.deviceName);
  mainWindow?.webContents.send('printer', null);
});

usbDetect.on('add', (devices) => {
  console.log('[Device added]', devices.deviceName);
  mainWindow?.webContents.send('printer', devices);
});
