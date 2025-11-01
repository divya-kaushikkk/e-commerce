import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
export const Users = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("user", "admin"),
    defaultValue: "user",
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  resetToken: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null
  },
  resetTokenExpiry: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  },
},
  {
    timestamps:true,
});

