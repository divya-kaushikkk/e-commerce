// import { sequelize } from "../config/db.js";
// import { DataTypes } from "sequelize";

// export const Payment = sequelize.define(
//   "Payment",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     orderId: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     stripePaymentId: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     amount: {
//         type: DataTypes.FLOAT,
//         allowNull: false
//     },
//     currency: {
//         type: DataTypes.STRING,
//         defaultValue: "INR",
//         allowNull: false
//     },
//     status: {
//         type: DataTypes.ENUM("pending", "succeeded", "failed", "refunded"),
//         defaultValue: "pending",
//         allowNull: false

//     }
//   },
//   {
//     timestamps: true,
//   }
// );
// await sequelize.sync();
