import { DataType } from "sequelize-typescript";
import { sequelize } from "../configs/db.config";
import { Device } from "./device.model";

const Status = sequelize.define('Status', {
    device_type:{
        type: DataType.STRING,
        allowNull: false
    },
    device_id:{
        type: DataType.STRING,
        allowNull: false
    },
    status:{
        type: DataType.STRING,
        allowNull: false
    }
    },{
        tableName: 'status',
        paranoid: true,
    }
);

Status.belongsTo(Device,{
    foreignKey: 'device_id',
    targetKey: 'device_id'
});

Status.belongsTo(Device,{
    foreignKey: 'device_type',
    targetKey: 'device_type'
});
