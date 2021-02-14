<template>
	<div>
		<h1 v-if="type == 'register'">Sign Up</h1>
        <h1 v-else>Log In</h1>
		<input type="text" placeholder="Username" v-model="username" />
		<input type="password" placeholder="Password" v-model="password" />
		<b-button variant="primary" @click="registerUser">Sign Up </b-button>
		<p v-if="msg">{{ msg }}</p>
	</div>
</template>
<script>
import { mapActions } from "vuex";

export default {
	props: ["type"],
	data() {
		return {
			username: "",
			password: "",
			msg: "",
		};
	},
	methods: {
		...mapActions(["register", "login"]),
		validate() {
			return true;
		},
		registerUser() {
			if (!this.validate()) return;
			else {
				const msg = JSON.stringify({
					username: this.username,
					password: this.password,
				});

				if (this.type == "register") {
                    this.register(msg)
                    .then(() => {
                        this.$router.push('/');
                    })
                }
				else {
                    this.login(msg)
                    .then(() => {
                        this.$router.push('/');
                    })
                }
			}
		},
	},
};
</script>