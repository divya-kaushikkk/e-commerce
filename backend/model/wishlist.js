import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

export const Wishlist = sequelize.define("Wishlist",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        timestamps: true
    }
);

