// src/config/db.config.ts

import { Sequelize } from 'sequelize';

const DB_URL = process.env.DATABASE_URL || "postgresql://postgres:burhan7730@localhost:7889/postgres";

export const sequelize = new Sequelize(DB_URL, {
    define: {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+07:00',
});

const db = {
    sequelize,
};

export default db;
