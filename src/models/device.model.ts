import { DataType } from "sequelize-typescript";
import { sequelize } from "../configs/db.config";
import  {User}  from "./user.model";

const Device = sequelize.define('Device', {
    userId: {
        type: DataType.INTEGER,
        allowNull: false
    },
    device_id: {
        type: DataType.STRING,
        allowNull: false,
        unique: true
    },
    device_type: {
        type: DataType.STRING,
        allowNull: false,
        unique: true
    }
    },{
        tableName: 'devices',
        paranoid: true,
    }
);

Device.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id'
});

export { Device };