const {app, BrowserWindow, session, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')

// 保持一个对于 window 对象的全局引用，如果你不这样做，
// 当 JavaScript 对象被垃圾回收， window 会被自动地关闭
let win
let Menu = require('electron').Menu

var downloadTask = {}

// Modify the user agent for all requests to the following urls.
function createWindow () {
	// 去掉默认菜单栏。
	// Menu.setApplicationMenu(null);
	// 创建浏览器窗口。
	mainWindow = new BrowserWindow({
		width: 1080,
		height: 820,
		resizable: false,
		// minWidth: 1080,
		// minHeight: 820,
		frame: false,
		// webPreferences: {
		//	 experimentalFeatures: true
		// },
		// transparent: true
	})

	// 加载应用的 index.html。
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}))

	// 打开开发者工具。
	// mainWindow.webContents.openDevTools()

	// 当 window 被关闭，这个事件会被触发。
	mainWindow.on('closed', () => {
		// 取消引用 window 对象，如果你的应用支持多窗口的话，
		// 通常会把多个 window 对象存放在一个数组里面，
		// 与此同时，你应该删除相应的元素。
		mainWindow = null
	})

	// mainWindow.webContents.session.on('will-download', (event, item, webContents) => {

	// 	const totalBytes = item.getTotalBytes();

	// 	if(downloadTask["used"] == "playing-notify"){
	// 		var filePath = path.join(__dirname+"/cache",downloadTask["filename"]);
	// 		var iconPath = filePath
	// 		try{
	// 			fs.openSync(filePath, 'r+')
	// 			notifier.notify({
	// 				title: downloadTask["title"],
	// 				message: downloadTask["message"],
	// 				icon: iconPath,
	// 				sound: false,
	// 				wait: false
	// 			}, false);
	// 			event.preventDefault()
	// 			return
	// 		}
	// 		catch(e){
	// 			console.log(e)
	// 		}
	// 	}
	// 	else if(downloadTask["used"] == "song-download"){
	// 		var filePath = path.join(app.getPath('downloads'),downloadTask["filename"]);
	// 		var iconPath = ""
	// 	}
	// 	else{
	// 		event.preventDefault()
	// 		return
	// 	}
	// 	console.log(filePath)
	// 	item.setSavePath(filePath);

	// 	item.on('updated', (event, state) => {
	// 		if (state === 'interrupted') {
	// 				console.log('Download is interrupted but can be resumed')
	// 		} 
	// 		else if (state === 'progressing') {
	// 			if (item.isPaused()) {
	// 				console.log('Download is paused')
	// 			}
	// 			else {
	// 				console.log(`Received bytes: ${item.getReceivedBytes()}`)
	// 			}
	// 		}
	// 	})
	// 	item.once('done', (event, state) => {
	// 		if (state === 'completed') {
	// 			console.log('Download successfully')
	// 			notifier.notify({
	// 				title: downloadTask["title"],
	// 				message: downloadTask["message"],
	// 				icon: iconPath,
	// 				sound: false,
	// 				wait: false
	// 			}, false);
	// 		}
	// 	})
	// });
	
}
// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
	// 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
	// 否则绝大部分应用及其菜单栏会保持激活。
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	// 在这文件，你可以续写应用剩下主进程代码。
	// 也可以拆分成几个文件，然后用 require 导入。
	if (mainWindow === null) {
		createWindow()
	}
	// session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
	// 	details.requestHeaders['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Electron/1.7.5 Safari/537.36'
	// 	callback({cancel: false, requestHeaders: details.requestHeaders})
	// })
})

// ipcMain.on('download', (event, task) => {
// 	console.log('get download request', task)
// 	downloadTask = JSON.parse(task)
// 	event.sender.send('feedback','i will download')
// 	mainWindow.webContents.downloadURL(downloadTask["url"]);
// });






