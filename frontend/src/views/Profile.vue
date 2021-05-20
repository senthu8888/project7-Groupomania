<template>
	<v-main>
		<v-container>
			<h1>Groupomania Profil</h1>
			<v-toolbar class="hidden-sm-and-down mx-2 fontHeader">
				<v-toolbar-title>
					<RouterLink
						style="text-decoration: none; color:white;"
						class="title font-weight-bold"
						to="Groupomania"
						>Accueil</RouterLink
					>
				</v-toolbar-title>
			</v-toolbar>
			<v-card-text class="mx-auto pa-4 mt-4" max-width="600px">
				<v-img
					class="elevation-6 profilUser"
					alt="avatar"
					src="/../img/User_icon_2.svg.png"
				></v-img>
				<span class="title font-weight-bold">Pseudo : {{ user.pseudo }}</span>

				<h2 class="title font-weight-bold">Email : {{ user.email }}</h2>
				<h2 class="title font-weight-bold">Date de création :{{ user.createdAt }}</h2>
				<v-btn color="error" class="bb" @click="deleteUser(user)"> Supprimer</v-btn>
				<v-btn @click="edit = user.id" class="bb"> Modifier </v-btn>

				<form class="edit-user" v-if="edit">
					<label class="title font-weight-bold" for="user"> Pseudo : </label><br />
					<textarea id="user" v-model="user.pseudo"> </textarea><br />
					<label class="title font-weight-bold" for="user-email"> Email : </label><br />
					<textarea id="user-email" v-model="user.email"> </textarea>
					<v-btn
						type="button"
						class="btn btn-success bb"
						data-dismiss="modal"
						@click="updateUser(user)"
						>Enregistrer
					</v-btn>
					<v-btn
						type="button"
						class="btn btn-default bb"
						data-dismiss="modal"
						@click="edit = !edit"
						>Annuler</v-btn
					>
				</form>
			</v-card-text>
		</v-container>
	</v-main>
</template>
<script>
import axios from "axios";
export default {
	data() {
		return {
			user: "",
			edit: false,
		};
	},
	created() {
		axios
			.get("http://localhost:3000/user/", {
				headers: { Authorization: "Bearer " + localStorage.token },
			})
			.then((response) => (this.user = response.data.user))
			.catch((err) => console.log(err));
	},
	methods: {
		deleteUser(user) {
			axios
				.delete("http://localhost:3000/user/" + user.id, {
					headers: { Authorization: "Bearer " + localStorage.token },
				})
				.then((response) => console.log(response))
				.catch((err) => console.log(err));
			localStorage.clear();
			window.location.reload();
		},
		updateUser(user) {
			axios
				.put(
					"http://localhost:3000/user/" + user.id,
					{
						email: user.email,
						pseudo: user.pseudo,
					},
					{
						headers: {
							Authorization: "Bearer " + localStorage.token,
						},
					}
				)
				.then((response) => console.log(response))
				.catch((err) => console.log(err));
			window.location.reload();
		},
	},
};
</script>
<style>
.v-card {
	background-image: url("../assets/icon-above-font.png");
	background-position: center;
	background-size: contain;
}

.v-main {
	background-image: url("/../img/company.jpg");
	background-size: cover;
	background-attachment: fixed;
}

.fontHeader {
	background: linear-gradient(90deg, rgb(139, 0, 0) 0%, rgb(139, 0, 0) 90%);
	color: white;
}

.profilUser {
	position: relative;
	overflow: hidden;
	flex: 1 0 auto;
	max-width: 20%;
	display: flex;
	float: left;
	border-radius: 70px;
	margin-right: 20px;
}

.edit-user {
	background-color: white;
}

.bb {
	border-radius: 30px;
	margin-right: 30px;
	margin-left: 30px;
}
</style>
