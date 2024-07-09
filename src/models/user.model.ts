import { DataType } from "sequelize-typescript";
import { sequelize } from "../configs/db.config";

const User = sequelize.define('User', {
    user: {
        type: DataType.STRING,
        allowNull: false
    },
    password: {
        type: DataType.STRING,
        allowNull: false
    }
    },{
        tableName: 'users',
        paranoid: true,
    }
);

export { User };