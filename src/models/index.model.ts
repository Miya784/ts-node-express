import { sequelize } from "../configs/db.config";
import { Sequelize, SyncOptions } from "sequelize";
import { Device } from "./device.model";
import { User } from "./user.model";
import { Status } from "./status.model";


const db: any = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

const sync = async ({ ...args }: SyncOptions) => {
    await User.sync(args);
    await Device.sync(args);
    await Status.sync(args);
  };

export { sync };
export default db;
