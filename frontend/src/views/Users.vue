<template>
	<v-main>
		<v-container>
			<nav>
				<v-toolbar class="hidden-sm-and-down mx-2 fontHeader">
					<v-toolbar-title>
						<RouterLink
							style="text-decoration: none; color: inherit;"
							class="title font-weight-bold"
							to="Groupomania"
							>Accueil</RouterLink
						>
					</v-toolbar-title>
					<v-toolbar-title class="title font-weight-bold mx-auto"></v-toolbar-title>
					<v-toolbar-title>
						<RouterLink
							style="text-decoration: none; color: inherit;"
							class="title font-weight-bold"
							to="administration"
							>Dernière Publication</RouterLink
						>
					</v-toolbar-title>
				</v-toolbar>
				<v-toolbar class="hidden-md-and-up fontHeader">
					<v-icon @click="drawer = !drawer">mdi-menu</v-icon>
				</v-toolbar>
				<v-navigation-drawer v-model="drawer" ap>
					<v-toolbar-items class="d-flex flex-column">
						<v-toolbar-title>
							<RouterLink
								style="text-decoration: none; color: inherit;"
								class="title font-weight-bold "
								to="administration"
								>Dernière Publication</RouterLink
							>
						</v-toolbar-title>
						<v-toolbar-title>
							<RouterLink
								style="text-decoration: none; color: inherit;"
								class="title font-weight-bold"
								to="Groupomania"
								>Accueil</RouterLink
							>
						</v-toolbar-title>
					</v-toolbar-items>
				</v-navigation-drawer>
			</nav>
			<v-card v-for="user in users" :key="user.id" class="mx-auto pa-4 my-4" max-width="900">
				<v-img
					class="elevation-6 profilUser"
					alt="avatar"
					src="/../img/User_icon_2.svg.png"
				></v-img>
				<span class="title font-weight-bold">Pseudo : {{ user.pseudo }}</span>
				<p class="title font-weight-bold">Email : {{ user.email }}</p>
				<p class="title font-weight-bold">Date de création :{{ user.createdAt }}</p>
				<v-btn color="error" @click="deleteUser(user)"> Supprimer </v-btn>
			</v-card>
			{{ error }}
		</v-container>
	</v-main>
</template>
<script>
import axios from "axios";
export default {
	data() {
		return {
			drawer: false,
			user: "",
			users: [],
			error: "",
		};
	},
	created() {
		axios
			.get("http://localhost:3000/admin/users/", {
				headers: { Authorization: "Bearer " + localStorage.token },
			})
			.then((response) => (this.users = response.data.users))
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
			window.location.reload();
		},
	},
};
</script>
<style>
.v-main__wrap {
	background-image: url("/../img/company.jpg");
	background-size: cover;
	background-attachment: fixed;
}

.fontHeader {
	background: linear-gradient(
		90deg,
		rgba(255, 255, 255, 1) 20%,
		rgba(0, 212, 255, 1) 50%,
		transparent
	);
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
</style>
