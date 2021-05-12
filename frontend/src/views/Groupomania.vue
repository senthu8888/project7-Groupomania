<template>
	<v-main>
		<v-container>
			<nav>
				<v-toolbar src="" class="hidden-sm-and-down fontHeader">
					<v-toolbar-title>
						<v-toolbar-title class="font-weight-bold" color="black">
							<RouterLink class="text-decoration-none" to="Profile"
								>Bienvenue {{ user.pseudo }}
								<v-icon>mdi-account-circle</v-icon></RouterLink
							>
						</v-toolbar-title></v-toolbar-title
					>
					<v-spacer></v-spacer>
					<v-toolbar-title class="mx-4 " v-if="user.isAdmin == true">
						<RouterLink to="Users" style="text-decoration: none; color: inherit;"
							>Accès Utilisateurs</RouterLink
						>
					</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-toolbar-title
						class="mx-4"
						@click="logout()"
						src="../img/logout-svgrepo-com.svg"
						alt="logout"
						>Déconnecter <v-icon>mdi-logout</v-icon></v-toolbar-title
					>
				</v-toolbar>
				<v-toolbar ap class="hidden-md-and-up nav-container fontHeader">
					<v-icon @click="drawer = !drawer">mdi-menu</v-icon>
				</v-toolbar>
				<v-navigation-drawer v-model="drawer" ap>
					<v-toolbar-title>
						<v-toolbar-title class="font-weight-bold" color="black">
							<RouterLink class="text-decoration-none" to="Profile"
								>Bienvenue {{ user.pseudo }}
								<v-icon>mdi-account-circle</v-icon></RouterLink
							>
						</v-toolbar-title></v-toolbar-title
					>
					<v-toolbar-items class="d-flex flex-column">
						<v-toolbar-title class="mx-4" v-if="user.isAdmin == true">
							<RouterLink style="text-decoration: none; color: inherit;" to="Users"
								>Accès Utilisateurs</RouterLink
							>
						</v-toolbar-title>
						<v-toolbar-title
							class="mx-4"
							@click="logout()"
							src="/../img/logout-svgrepo-com.svg"
							alt="logout"
							>Déconnecter</v-toolbar-title
						>
					</v-toolbar-items>
				</v-navigation-drawer>
			</nav>
			<v-card class="mx-auto pa-4 mt-1 fontHeader" max-width="600px">
				<v-toolbar>
					<v-toolbar-title class="font-weight-bold" color="black"
						>Ajouter une publication</v-toolbar-title
					>
					<v-spacer></v-spacer>
					<v-btn fab small @click="isEditing = !isEditing">
						<v-icon v-if="isEditing">
							mdi-close
						</v-icon>
						<v-icon v-else>
							mdi-pencil
						</v-icon>
					</v-btn>
				</v-toolbar>
				<v-form
					enctype="multipart/form-data"
					class="add-post publication"
					name="add-post"
					ref="MyForm"
				>
					<v-label class="publication">Titre</v-label>
					<v-text-field
						:disabled="!isEditing"
						v-model="title"
						color="black"
					></v-text-field>
					<v-label class="publication">Contenu</v-label>
					<v-text-field
						:disabled="!isEditing"
						v-model="content"
						color="white"
						item-text="name"
					>
					</v-text-field>
					<v-file-input ref="file" @change="selectFile"></v-file-input>

					<v-divider></v-divider>
					<v-spacer></v-spacer>
					<v-row align="center" justify="space-around">
						<v-btn :disabled="!isEditing" color="success" @click="post">
							Publier
						</v-btn>
					</v-row>
				</v-form>
			</v-card>
			<v-card
				v-for="message in messages"
				:key="message.id"
				class="mx-auto pa-4 my-4 fontss"
				max-width="900"
			>
				<div class="text-right">
					<v-menu offset-y v-if="message.userId == user.id || user.isAdmin == true">
						<template
							v-slot:activator="{
								on,
								attrs,
							}"
						>
							<v-btn v-bind="attrs" v-on="on">
								<v-icon>mdi-tune</v-icon>
							</v-btn>
						</template>
						<v-list class="d-flex flex-column">
							<v-icon
								color="blue"
								v-if="message.userId == user.id"
								@click="edit = message.id"
								>mdi-pencil
							</v-icon>
							<v-icon
								color="red"
								v-if="message.userId == user.id || user.isAdmin == true"
								@click="remove(message)"
								>mdi-delete</v-icon
							>
						</v-list>
					</v-menu>
				</div>
				<v-card-title class="users">
					<v-icon large left> </v-icon>
					<span class="title font-weight-bold titlePseudo"> {{ message.pseudo }}</span>
				</v-card-title>
				<v-card-title>
					{{ message.title }}
				</v-card-title>
				<v-img :src="message.imageUrl"></v-img>
				<p>
					{{ message.content }}
				</p>
				<small>{{ message.createdAt }} </small>
				<v-form
					class="add-new-post publication"
					name="add-new-post"
					v-if="edit === message.id"
				>
					<label for="title" class="publication">
						titre de publication :
					</label>
					<input
						type="text"
						class="form-control"
						name="title"
						id="title"
						v-model="message.title"
					/>
					<br />
					<label for="content" class="publication">
						contenu de la publication :
						<textarea
							id="content"
							name="content"
							rows="0"
							cols="40"
							v-model="message.content"
						></textarea>
					</label>
					<br />
					<v-btn
						type="button"
						class="btn btn-success"
						color="green"
						data-dismiss="modal"
						v-if="edit === message.id"
						@click="modify(message)"
						>Enregistrer
					</v-btn>
					<v-btn
						type="button"
						class="btn btn-default"
						color="primary"
						data-dismiss="modal"
						v-if="edit === message.id"
						@click="edit = !edit"
						>Fermer</v-btn
					></v-form
				>

				<div class="react">
					<div class="likes">
						<v-tooltip top>
							<template
								v-slot:activator="{
									on,
									attrs,
								}"
							>
								<v-icon
									class="px-2"
									v-bind="attrs"
									v-on="on"
									color="green"
									@click="userLike(message)"
									>mdi-thumb-up</v-icon
								>
								<span>{{ countLike }} </span>
							</template>
							<span>J'aime !</span>
						</v-tooltip>
					</div>
					<div class="dislikes">
						<v-tooltip top>
							<template
								v-slot:activator="{
									on,
									attrs,
								}"
							>
								<v-icon
									class="px-2"
									color="red"
									v-bind="attrs"
									v-on="on"
									@click="userDislike(message)"
									>mdi-thumb-down</v-icon
								>
								<span>{{ countDisLike }}</span>
							</template>
							<span>J'aime pas !</span>
						</v-tooltip>
					</div>
				</div>
				<v-card elevation="9" color="#FFF">
					<div class="pa-2 my-2" v-for="item in items" :key="item.id">
						<h3 v-if="item.messageId == message.id">
							{{ item.pseudo }}
						</h3>
						<p v-if="item.messageId == message.id">
							{{ item.comment }}
						</p>

						<small v-if="item.messageId == message.id">{{ item.createdAt }} </small>
						<v-icon
							v-if="item.messageId == message.id"
							color="primary"
							@click="edit = item.id"
							>mdi-pencil
						</v-icon>

						<v-icon
							v-if="item.messageId == message.id"
							class="btn"
							@click="removeComment(item)"
							>mdi-delete</v-icon
						>
						<form class="edit-comment" v-if="edit === item.id">
							<label for="message.message_id"> {{ item.pseudo }} : </label><br />
							<textarea id="message.message_id" rows="1" v-model="item.comment">
							</textarea>
							<v-icon
								type="button"
								class="btn btn-success"
								color="succes"
								data-dismiss="modal"
								@click="modifyComment(item)"
								>mdi-arrow-up-bold-box-outline</v-icon
							>
							<v-icon
								type="button"
								class="btn btn-default"
								color="primary"
								data-dismiss="modal"
								v-if="edit === item.id"
								@click="edit = !edit"
								>Fermer</v-icon
							>
						</form>
					</div>

					<div class="comment" color="red">
						<label for="add-comment" class="bold"> {{ user.pseudo }}</label
						><br />
						<textarea
							id="add-comment"
							rows="1"
							v-model="comment"
							placeholder="Ajouter commentaire"
						></textarea>

						<v-icon class="btn btn-primary btn-block" @click="postComment(message)"
							>mdi-check</v-icon
						>
					</div>
				</v-card>
			</v-card>
		</v-container>
	</v-main>
</template>

<script>
import axios from "axios";
export default {
	data() {
		return {
			drawer: false,
			isEditing: null,
			like: 1,
			disLike: -1,
			comment: "",
			edit: false,
			file: "",
			title: "",
			content: "",
			user: [],
			messages: [],
			items: [],
			rows: [],
			reacts: [],
			messageId: "",
			countLike: "",
			countDisLike: "",
			options: [{ edit: "Edit" }, { delete: "Delete" }],
		};
	},
	created() {
		axios
			.get("http://localhost:3000/message/messages", {
				headers: {
					Authorization: "Bearer " + localStorage.token,
				},
			})
			.then((response) => (this.messages = response.data.Messages))
			.catch((err) => console.log(err));
		axios
			.get("http://localhost:3000/user/", {
				headers: {
					Authorization: "Bearer " + localStorage.token,
				},
			})
			.then((response) => (this.user = response.data.user))
			.catch((err) => console.log(err));
	},
	mounted() {
		axios
			.get("http://localhost:3000/comment/comments", {
				headers: {
					Authorization: "Bearer " + localStorage.token,
				},
			})
			.then((response) => (this.items = response.data.Comments))
			.catch((err) => console.log(err));
	},

	methods: {
		logout() {
			localStorage.clear();
			window.location.reload();
		},
		getOne(message) {
			axios
				.get("http://localhost:3000/message/messages/" + message.id, {
					headers: {
						Authorization: "Bearer " + localStorage.token,
					},
				})
				.then(
					(response) => (
						(this.updatedContent = response.data.message.content),
						(this.updatedTitle = response.data.message.title)
					)
				)
				.catch((err) => console.log(err));
		},
		selectFile(e) {
			this.file = e;
		},
		post() {
			let fd = new FormData();
			fd.append("image", this.file);
			fd.append("title", this.title);
			fd.append("content", this.content);
			axios
				.post("http://localhost:3000/message/message", fd, {
					headers: {
						Authorization: "Bearer " + localStorage.token,
					},
				})
				.then((res) => console.log(res))
				.catch((err) => console.log(err));
			window.location.reload();
		},

		remove(message) {
			axios
				.delete("http://localhost:3000/message/messages/" + message.id, {
					headers: {
						Authorization: "Bearer " + localStorage.token,
					},
				})
				.then((res) => console.log(res))
				.catch((err) => console.log(err));
			window.location.reload();
		},
		modify(message) {
			axios
				.put(
					"http://localhost:3000/message/messages/" + message.id,
					{
						title: message.title,
						content: message.content,
					},
					{
						headers: {
							Authorization: "Bearer " + localStorage.token,
						},
					}
				)
				.then((res) => console.log(res))
				.catch((err) => console.log(err));
			window.location.reload();
		},
		postComment(message) {
			axios
				.post(
					"http://localhost:3000/comment/comments",
					{
						messageId: message.id,
						comment: this.comment,
					},
					{
						headers: {
							Authorization: "Bearer " + localStorage.token,
						},
					}
				)
				.then((res) => console.log(res))
				.catch((err) => console.log(err));
			window.location.reload();
		},
		removeComment(item) {
			axios
				.delete("http://localhost:3000/comment/comments/" + item.id, {
					headers: {
						Authorization: "Bearer " + localStorage.token,
					},
				})
				.then((res) => console.log(res))
				.catch((err) => console.log(err));
			window.location.reload();
		},
		modifyComment(item) {
			axios
				.put(
					"http://localhost:3000/comment/comments/" + item.id,
					{
						messageId: item.messageId,
						comment: item.comment,
					},
					{
						headers: {
							Authorization: "Bearer " + localStorage.token,
						},
					}
				)
				.then((res) => console.log(res))
				.catch((err) => console.log(err));
			window.location.reload();
		},

		userLike(message) {
			axios
				.post(
					"http://localhost:3000/react/",
					{
						likeType: this.like,
						messageId: message.id,
					},
					{
						headers: {
							Authorization: "Bearer " + localStorage.token,
						},
					}
				)
				.then((response) => console.log(response))
				.catch((err) => console.log(err));
		},
		userDislike(message) {
			axios
				.post(
					"http://localhost:3000/react/",
					{
						likeType: this.disLike,
						messageId: message.id,
					},
					{
						headers: {
							Authorization: "Bearer " + localStorage.token,
						},
					}
				)
				.then((res) => console.log(res))
				.catch((err) => console.log(err));
		},
	},
};
</script>
<style scoped>
.v-main {
	background-image: url("/../img/company.jpg");
	background-size: cover;
	background-attachment: fixed;
}
.react {
	display: flex;
}
.fontss {
	background: linear-gradient(
		90deg,
		rgba(2, 0, 36, 1) 0%,
		rgba(9, 9, 121, 1) 35%,
		rgba(0, 212, 255, 1) 50%,
		transparent
	);
	color: white;
}

.fontHeader {
	background: linear-gradient(
		90deg,
		rgba(255, 255, 255, 1) 20%,
		rgba(0, 212, 255, 1) 50%,
		transparent
	);
}
.v-application .text-decoration-none {
	margin: 30px;
}
.comment {
	color: black;
}
.edit-comment {
	color: black;
}
.publication {
	color: white;
	font-weight: bold;
	font-size: 15px;
	margin-top: 30px;
}
.users {
	display: flex;
	justify-content: center;
	font-size: 3.25rem !important;
}

.theme--light.v-label {
	color: black;
	font-size: 20px;
}

.titlePseudo {
	font-size: 3.25rem !important;
	line-height: 2rem;
	letter-spacing: 0.0125em !important;
	font-family: "Roboto", sans-serif !important;
}

.v-application .my-2 {
	margin-top: 0px !important;
	margin-bottom: 0px !important;
	margin-left: 20px !important;
}

.v-application .pa-2 {
	padding: 2px !important;
}
.v-sheet.v-card {
	border-radius: 40px;
}

.comment {
	color: black;
	margin-top: 0px !important;
	margin-bottom: 0px !important;
	margin-left: 20px !important;
}

.v-application p {
	margin-bottom: 16px;
	font-size: 20px;
}

.v-card__title {
	align-items: center;
	display: flex;
	flex-wrap: wrap;
	font-size: 2.25rem;
	font-weight: 500;
	letter-spacing: 0.0125em;
	line-height: 2rem;
	word-break: break-all;
}

textarea {
	font-size: larger;
}
</style>
