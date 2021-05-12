<template>
	<v-main className="connection-form">
		<v-container className="form-container">
			<img src="../assets/icon-left-font-monochrome-black.svg" alt="groupo-white" />
			<v-tabs>
				<v-tab to="/user/login">Connecter</v-tab>
				<v-tab to="/user/signup">S'inscrire</v-tab>
			</v-tabs>
			<v-form ref="form" lazy-validation>
				<v-col>
					<v-col>
						<v-label class="ma-1">Adresse Mail</v-label>
						<v-text-field
							v-model="email"
							class="ma-1"
							:rules="emailRules"
							required
						></v-text-field>
					</v-col>
					<v-col>
						<v-label class="ma-1">Mot de passe</v-label>
						<v-text-field
							v-model="password"
							class="ma-1"
							required
							:rules="passwordRules"
							type="password"
						></v-text-field>
					</v-col>
					<v-col justify="right">
						<v-btn class="mt-1" outlined color="red" @click="submit()"
							>Se Connecter</v-btn
						>
					</v-col>
				</v-col>
			</v-form>
		</v-container>
	</v-main>
</template>

<script>
import Axios from "axios";
export default {
	data() {
		return {
			pseudo: "",
			pseudoRules: [(v) => v.length >= 3 || "Minimum 3 caracters "],
			email: "",
			emailRules: [
				(v) => !!v || "Merci de renseigner votre adresse email !",
				(v) => /.+@.+\..+/.test(v) || "Merci de renseigner une adresse email valide",
			],
			password: "",
			passwordRules: [(v) => !!v || "Merci de renseigner votre mot de passe !"],
		};
	},
	methods: {
		submit() {
			if (this.$refs.form.validate()) {
				Axios.post("http://localhost:3000/user/login", {
					email: this.email,
					password: this.password,
				})
					.then((res) => {
						let token = res.data.token;
						localStorage.setItem("token", token);
						this.$router.push("/user/groupomania");
					})
					.catch((err) => console.log(err));
			} else {
				alert("Veuillez renseigner tout les champs ! ");
			}
		},
	},
};
</script>
<style scoped>
.v-main {
	background-image: url("/../img/world.svg");
	background-position: right;
}
</style>
