const { app, BrowserWindow, ipcMain, dialog } = require("electron");
require("@electron/remote/main").initialize();

const path = require("path");
const url = require("url");
// TODO: Remove electron reload stuff for release
const electronReload = require("electron-reload");
electronReload(__dirname, {
	electron: path.join(__dirname, "node_modules", ".bin", "electron"),
	hardResetMethod: "exit",
});

let win;

// Create app
function createWindow() {
	win = new BrowserWindow({
		width: 780,
		height: 700,
		// autoHideMenuBar: true,
		webPreferences: { enableRemoteModule: true, nodeIntegration: true, contextIsolation: false },
	});

	require("@electron/remote/main").enable(win.webContents);

	win.loadURL(
		url.format({
			pathname: path.join(__dirname, "index.html"),
			protocol: "file:",
			slashes: true,
		})
	);

	win.on("closed", function () {
		win = null;
	});
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
	if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
	if (win === null) createWindow();
});
