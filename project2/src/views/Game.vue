<template>
    <div>
        <Header/>
        <b-container>
            <b-row>
                <b-col cm="6" >
                    <div v-if="edit">
                        <EditGame :name="game.name" :genre="game.genre" :score="game.score" :description="game.description" :price="game.price"/>
                    </div>
                    <div v-else>
                        <ShowGame v-if="games.length" :game="game"/>
                    </div>
                    <button @click="buy">Buy Game</button>
                </b-col>
            </b-row>
            <b-row>
                <b-col cm="2" style="margin-top: 10px">
                    <b-button variant="primary" size="lg" @click="toggleEdit" v-html="edit ? 'Cancel' : 'Edit'"/>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import EditGame from "@/components/EditGame";
    import Header from "@/components/Header";
    import ShowGame from "@/components/ShowGame";
    import { mapState, mapActions } from 'vuex';

    export default {
        name: "Game",
        components: {
            Header,
            EditGame,
            ShowGame
        },
        data() {
            return {
                edit: false
            }
        },
        computed: {
            ...mapState(['games']),

            game: function () {
                for (let i = 0; i < this.games.length; i++)
                    if (this.games[i].id === parseInt(this.$route.params.id))
                        return this.games[i];
                return undefined;
            }
        },
        methods: {
            ...mapActions(['load_games']),

            toggleEdit: function () {
                this.edit = !this.edit
            },
            buy: function () {
                console.log('bought game')
            } 
        }
    }
</script>

<style scoped>

</style>