<template>
	<div>
		<b-table
			hover
			v-if="games.length"
			sticky-header="800px"
			:items="games"
			:fields="fields"
			head-variant="dark"
			@row-clicked="editGame"
		>
			<template v-slot:cell(action)="row">
				<b-button variant="danger" v-if="isAdmin" @click="delete_game(row.item.id)"
					>Delete</b-button
				>
			</template>
		</b-table>
		<h1 v-else>No games</h1>
	</div>
</template>

<script>
import router from "@/router";
import { mapState, mapActions } from "vuex";

export default {
	name: "GameList",
	computed: {
		...mapState(["games"]),
        isAdmin() {
            return this.$store.getters.isAdmin
        }
	},
	data() {
		return {
			fields: [
				{ key: "name" },
				{ key: "genre" },
				{ key: "score" },
				{ key: "action" },
			],
		};
	},
    mounted: function () {
		this.load_games();
	},
	methods: {
		...mapActions(["delete_game", 'load_games']),

		editGame: function (item) {
			router.push({ path: `/game/${item.id}` });
		},
	},
};
</script>

<style>
tr:hover td {
	background: lightgreen;
}
</style>