const bodyParser = require("body-parser");
const db = require("../config/database");
const jwt = require("jsonwebtoken");
const message = require("../models/message");
const fs = require("fs");

exports.getAllMessage = (req, res, next) => {
	db.Message.findAll({
		include: [
			{
				model: db.User,
				attributes: ["id", "pseudo"],
			},
		],
		order: [["id", "DESC"]],
	})
		.then((messages) => {
			const Messages = [];
			messages.forEach((message) =>
				Messages.push({
					id: message.id,
					title: message.title,
					content: message.content,
					imageUrl: message.imageUrl,
					likes: message.likes,
					DisLikes: message.DisLikes,
					pseudo: message.User.pseudo,
					userId: message.userId,
					createdAt: message.createdAt,
				})
			);

			return res.status(200).json({ Messages });
		})

		.catch((error) => res.status(500).json(error));
};

exports.createMessage = async (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1];
	const decodedToken = jwt.verify(token, process.env.PASS_WORD);
	const userId = decodedToken.userId;
	if (!req.file) {
		db.Message.create({
			...req.body,
			UserId: userId,
			imageUrl: "",
		})
			.then((message) => res.status(201).json({ message }))

			.catch((error) => res.status(500).json(error));
	} else if (req.file) {
		db.Message.create({
			...req.body,
			UserId: userId,
			imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
		})
			.then((message) => res.status(201).json({ message }))

			.catch((error) => res.status(500).json(error));
	}
};

exports.deleteMessage = async (req, res, next) => {
	db.Message.findOne({
		where: {
			message_id: req.params.id,
		},
	})
		.then((message) => {
			const filename = message.imageUrl.split("/images/")[1];

			fs.unlink(`images/${filename}`, () => {
				db.Message.destroy({ where: { message_id: req.params.id } })
					.then(() =>
						res
							.status(200)
							.json({ message: "Votre suppression a été pris en compte !" })
					)
					.catch((error) => res.status(400).json({ error }));
			});
		})
		.catch((error) => res.status(500).json(error));
};

exports.getOneMessage = (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1];
	const decodedToken = jwt.verify(token, process.env.PASS_WORD);
	const userId = decodedToken.userId;

	db.Message.findOne({
		where: {
			userId: userId,
			message_id: req.params.id,
		},
	})
		.then((message) => res.status(201).json({ message }))
		.catch((error) => res.status(500).json(error));
};

exports.updateOneMessage = (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1];
	const decodedToken = jwt.verify(token, process.env.PASS_WORD);
	const userId = decodedToken.userId;

	db.Message.update(
		{ title: req.body.title, content: req.body.content } || {
			...req.body,
			imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
		},
		{
			where: {
				userId: userId,
				message_id: req.params.id,
			},
		}
	)
		.then((message) => res.status(201).json({ message }))
		.catch((error) => res.status(500).json(error));
};

exports.likeMessage = async (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1];
	const decodedToken = jwt.verify(token, process.env.PASS_WORD);
	const userId = decodedToken.userId;
	const liked = await db.Like.findOne({
		where: {
			messageId: req.params.id,
			userId: userId,
		},
	});

	const disliked = await db.Like.findOne({
		where: {
			messageId: req.params.id,
			userId: userId,
		},
	});

	if (liked) {
		await liked.destroy();
	} else if (disliked) {
		disliked.like = 1;
		await disliked.save();
	} else {
		await db.Like.create({
			messageId: req.params.id,
			userId: userId,
			likeType: req.body.likeType,
		});

		if (req.body.likeType == 1) {
			db.Like.findAndCountAll({
				where: {
					messageId: req.params.id,
					likeType: 1,
				},
			})
				.then((result) => {
					db.Message.update(
						{
							likes: result.count,
						},
						{
							where: {
								message_id: req.params.id,
							},
						}
					)
						.then((message) => res.status(201).json({ message }))
						.catch((error) => res.status(500).json(error));
				})
				.catch((error) => res.status(500).json(error));
		} else if (req.body.likeType == -1) {
			db.Like.findAndCountAll({
				where: {
					messageId: req.params.id,
					likeType: -1,
				},
			})
				.then((result) => {
					db.Message.update(
						{
							DisLikes: result.count,
						},
						{
							where: {
								message_id: req.params.id,
							},
						}
					)
						.then((message) => res.status(201).json({ message }))
						.catch((error) => res.status(500).json(error));
				})
				.catch((error) => res.status(500).json(error));
		}
	}
};
