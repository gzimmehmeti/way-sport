import { app, BrowserWindow, ipcMain } from "electron";
import { DataSource } from "typeorm";
import { User } from "./entities/user";
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
if (require("electron-squirrel-startup")) {
  app.quit();
}
const conn = new DataSource({
  type: "better-sqlite3",
  database: "./data/my-db.db",
  synchronize: true,
  entities: [User],
});

const createWindow = async (): Promise<void> => {
  await conn.initialize();
  console.log("Database connected");

  // // Creating a new user
  // const newUser = new User();
  // newUser.firstName = "john_doe";
  // newUser.lastName = "john.doe@example.com";

  // const userRepository = conn.getRepository(User);
  // const savedUser = await userRepository.save(newUser);
  // console.log("User saved to database:", savedUser);

  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.webContents.openDevTools();
};

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle("create-user", async (e, data) => {
  const newUser = new User();
  newUser.firstName = "john_doe";
  newUser.lastName = "john.doe@example.com";
  newUser.isActive = true;
  const userRepository = conn.getRepository(User);
  const savedUser = await userRepository.save(newUser);
  return savedUser;
});

ipcMain.handle("get-users", async (e, data) => {
  const userRepository = conn.getRepository(User);
  const allUsers = await userRepository.find();
  console.log("All Users:", allUsers);
  return allUsers;
});
