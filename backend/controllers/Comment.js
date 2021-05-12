const db = require("../config/database");
const jwt = require("jsonwebtoken");
const comment = require("../models/comment");
const fs = require("fs");
exports.getAllComments = (req, res, next) => {
	db.Comment.findAll({
		include: [
			{
				model: db.User,
				attributes: ["id", "pseudo"],
			},
		],
	})
		.then((items) => {
			const Comments = [];
			items.forEach((item) =>
				Comments.push({
					id: item.id,
					comment: item.comment,
					messageId: item.messageId,
					pseudo: item.User.pseudo,
					userId: item.userId,
					createdAt: item.createdAt,
				})
			);
			return res.status(200).json({ Comments });
		})

		.catch((error) => res.status(500).json(error));
};

exports.createComment = (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1];
	const decodedToken = jwt.verify(token, process.env.PASS_WORD);
	const userId = decodedToken.userId;
	db.Comment.create({
		messageId: req.body.messageId,
		UserId: userId,
		comment: req.body.comment,
	})
		.then((comment) => res.status(201).json({ comment }))
		.catch((error) => console.log(error));
};

exports.getOneComment = (req, res, next) => {
	db.Comment.findOne({
		where: {
			id: req.params.id,
		},
	})
		.then((comment) => res.status(201).json({ comment }))
		.catch((error) => res.status(500).json(error));
};

exports.deleteComment = async (req, res, next) => {
	db.Comment.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((comment) => {
			res.status(200).json({ message: "Votre suppression a été pris en compte !" });
		})
		.catch((error) => res.statu(500).json({ error }));
};

exports.updateOneComment = (req, res, next) => {
	db.Comment.update(
		{
			comment: req.body.comment,
		},
		{
			where: {
				messageId: req.body.messageId,
				id: req.params.id,
			},
		}
	)
		.then((comment) =>
			res.status(201).json({ message: "Votre modification a été pris en compte !" })
		)
		.catch((error) => res.status(500).json(error));
};
