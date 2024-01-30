import { app, BrowserWindow, shell, ipcMain, Menu, Tray } from 'electron'
import { release } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { startBot, stopBot} from "../bot";
import fs from 'node:fs'
import util from 'node:util'
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let tray = null;  // 用来存放系统托盘


const creatLogFile = (apikey: string)=> {
  const TEMPPATH = 'temp'
  console.log('app.getPath', app.getPath('userData'))
  const basePath = path.join(app.getPath('userData'), TEMPPATH)
  console.log('basePath', basePath)
  fs.mkdir(basePath, {recursive: true}, err => {
    if (err) console.log(`mkdir path: ${basePath} err`)
  })

  const logPath = basePath + `${apikey}-wechat-assistant.log`
  const logFile = fs.createWriteStream(logPath, {flags: 'w'})
  console.log('logPath', logPath)
  console.log = function () {
    logFile.write(util.format.apply(null, arguments) + '\n')
    process.stdout.write(util.format.apply(null, arguments) + '\n')
  }

  console.error = function () {
    logFile.write(util.format.apply(null, arguments) + '\n')
    process.stderr.write(util.format.apply(null, arguments) + '\n')
  }
  console.log('logFile', logPath)
  return logPath
}

process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
    ? join(process.env.DIST_ELECTRON, '../public')
    : process.env.DIST

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}


// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.mjs')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')
Menu.setApplicationMenu(null)
async function createWindow() {
  win = new BrowserWindow({
    title: '智能微秘书客户端',
    icon: join(process.env.VITE_PUBLIC, 'favicon.ico'),
    resizable: false,
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: true,
      contextIsolation: false,
    },
  })
  // 创建系统托盘
  tray = new Tray(join(process.env.VITE_PUBLIC, 'logo.png'),);
  // 菜单模板
  let menu = [
    {
      label: '显示主窗口',
      id: 'show-window',
      enabled: !win.show,
      click() {
        win.show();
      }
    },
    {
      label: '退出',
      role: 'quit'
    }
  ];

  // 构建菜单
  menu = Menu.buildFromTemplate(menu);
  // 给系统托盘设置菜单
  tray.setContextMenu(menu);
  // 给托盘图标设置气球提示
  tray.setToolTip('智能微秘书');

  // 窗口最小化
  win.on('minimize', ev => {
    // 阻止最小化
    ev.preventDefault();
    // 隐藏窗口
    win.hide();
  });

  // 托盘图标被双击
  tray.on('double-click', () => {
    // 显示窗口
    win.show();
  });

  // 窗口隐藏
  win.on('hide', () => {
    // 启用菜单的显示主窗口项
    menu.getMenuItemById('show-window').enabled = true;
    // 重新设置系统托盘菜单
    tray.setContextMenu(menu);
  });

  // 窗口显示
  win.on('show', () => {
    // 禁用显示主窗口项
    menu.getMenuItemById('show-window').enabled = false;
    // 重新设置系统托盘菜单
    tray.setContextMenu(menu);
  });

  if (process.env.VITE_DEV_SERVER_URL) { // electron-vite-vue#298
    win.loadURL(url)
    // Open devTool if the app is not packaged
    // win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:') || url.startsWith('http:')) shell.openExternal(url)
    return { action: 'deny' }
  })
  // win.webContents.on('will-navigate', (event, url) => { }) #344
}

app.whenReady().then(()=> {
  createWindow().then(()=> {
    // 监听前端页面调用的方法
    ipcMain.handle('startBot', handleStartBot)
    ipcMain.on('stopBot', handleStopBot)
    ipcMain.handle('openLog', openLogPath)
  })
})


app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})

function handleStartBot(event, params) {
  console.log('params', params)
  const config = JSON.parse(params)
  startBot(config)
  return creatLogFile(config.apiKey)
}

function handleStopBot() {
  stopBot()
}

function openLogPath(event, path) {
  shell.openPath(path)
}
