<template>
	<div id="app">
		<div id="nav">
            <div v-if="isLoggedIn">
                <router-link to="/">Home</router-link> |
                <router-link to="/edit" v-if="isAdmin">New Game</router-link> |
                <router-link to="/user">User</router-link> | 
                <b-button variant="primary" @click="logout">Log Out</b-button>
            </div>
            <div v-else>
                <router-link to="/register">Register</router-link> | 
                <router-link to="/login">Log in</router-link>
            </div>
		</div>
		<router-view />
	</div>
</template>

<script>
import { mapActions } from "vuex";

export default {
	name: "App",
    computed: {
        isLoggedIn() {
            return this.$store.getters.isLoggedIn
        },
        isAdmin() {
            return this.$store.getters.isAdmin
        }
    },
	methods: {
		...mapActions(["load_games"]),
		logout() {
			this.$store.dispatch("logout");
			this.$router.push("/login");
		},
	}
};
</script>

<style>
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #ffffff;
	background: #6982ff;
}

#nav {
	padding: 30px;
	background-color: #4863eb;
}

#nav a {
	font-weight: bold;
	color: #ebc349;
}

#nav a.router-link-exact-active {
	color: #ffffff;
}
</style>
