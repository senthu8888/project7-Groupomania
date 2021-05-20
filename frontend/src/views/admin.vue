<template>
	<v-main>
		<v-container>
			<h1>Groupomania Publications</h1>
			<v-toolbar class="hidden-sm-and-down mx-2 fontHeader">
				<v-toolbar-title>
					<RouterLink
						style="text-decoration: none; color:white;"
						class="title font-weight-bold"
						to="Groupomania"
						>Accueil</RouterLink
					>
				</v-toolbar-title>
				<v-toolbar-title class="title font-weight-bold mx-auto" style="color:white;"
					>Publications</v-toolbar-title
				>
			</v-toolbar>
			<v-card
				v-for="message in messages"
				:key="message.id"
				class="mx-auto pa-4 my-4 fontss"
				max-width="600"
			>
				<v-card-title>
					<v-icon large left> </v-icon>
					<span class="title font-weight-bold"> {{ message.User.pseudo }}</span>
				</v-card-title>
				<h2>
					{{ message.title }}
				</h2>
				<v-img :src="message.imageUrl"></v-img>
				<p>
					{{ message.content }}
				</p>
				<small>{{ message.createdAt }} </small>
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
			user: [],
			messages: [],
			error: "",
		};
	},
	created() {
		axios
			.get("http://localhost:3000/user/", {
				headers: {
					Authorization: "Bearer " + localStorage.token,
				},
			})
			.then((response) => (this.user = response.data.user))
			.catch((err) => console.log(err));
		axios
			.get("http://localhost:3000/admin/messages/", {
				headers: {
					Authorization: "Bearer " + localStorage.token,
				},
			})
			.then((response) => (this.messages = response.data.messages))
			.catch((err) => console.log(err));
	},
};
</script>
<style>
.fontHeader {
	background: linear-gradient(90deg, rgb(139, 0, 0) 0%, rgb(139, 0, 0) 90%);
	color: white;
}
.v-main {
	background-image: url("/../img/company.jpg");
	background-size: cover;
	background-attachment: fixed;
}

.fontss {
	background-color: #1f263b;
	color: white;
}
</style>
