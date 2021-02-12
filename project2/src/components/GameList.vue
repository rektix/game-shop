<template>
    <div>
        <b-table
                hover v-if="games.length"
                sticky-header="800px"
                :items="games"
                :fields="fields"
                head-variant="dark"
                @row-clicked="editGame">
            <template v-slot:cell(action)="row">
                <b-button variant="danger" @click="delete_game(row.item.id)">Delete</b-button>
            </template>
        </b-table>
        <h1 v-else>No games</h1>
    </div>
</template>

<script>
    import router from "@/router";
    import { mapState, mapActions } from 'vuex';

    export default {
        name: "GameList",
        computed: {
            ...mapState(['games'])
        },
        data() {
            return {
                fields: [
                    { key: 'name' },
                    { key: 'genre' },
                    { key: 'score' },
                    { key: 'action' }
                ]
            }
        },
        methods: {
            ...mapActions(['delete_game']),

            editGame: function (item) {
                router.push({path: `/game/${item.id}`})
            }
        }
    }
</script>

<style>
    tr:hover td{
        background: lightgreen;
    }
    b-table {

    }
</style>