<template>
    <div>
        <Header/>
        <h1>{{ user.name }}</h1>
        <p v-for="(game, index) in user.games" :key="index">{{ index + 1 }}: {{ game.name }}</p>
    </div>
</template>

<script>
    import Header from "@/components/Header";
    import { mapState, mapActions } from 'vuex';

    export default {
        name: "User",
        components: {
            Header,
        },
        data() {
            return {
                edit: false
            }
        },
        created() {
            this.get_user()
        },
        computed: {
            ...mapState(['user']),
        },
        methods: {
            ...mapActions(['get_user']),
        }
    }
</script>

<style scoped>

</style>