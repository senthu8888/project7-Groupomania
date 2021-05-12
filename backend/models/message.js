const db = require("../config/database");
("use strict");
module.exports = (sequelize, DataTypes) => {
	const Message = sequelize.define("Message", {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		content: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		likes: DataTypes.INTEGER,
		DisLikes: DataTypes.INTEGER,
		imageUrl: { type: DataTypes.STRING, allowNull: true },
	});
	Message.associate = (models) => {
		Message.belongsTo(models.User, {
			foreignKey: {
				allowNull: false,
				onDelete: "CASCADE",
			},
		});
		Message.hasMany(models.Like);
		Message.hasMany(models.Comment);
	};
	return Message;
};
