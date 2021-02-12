<template>
  <div id="app">
    <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/edit">New Game</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: "App",
        methods: {
            ...mapActions(['load_games'])
        },
        mounted: function() {
            this.load_games();
        }
    }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  background: #6982FF;
}

#nav {
  padding: 30px;
  background-color: #4863EB;
}

#nav a {
  font-weight: bold;
  color: #EBC349;
}

#nav a.router-link-exact-active {
  color: #ffffff;
}
</style>
