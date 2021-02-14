<template>
    <b-container fluid>
        <b-form>
            <b-row class="mt-2">
                    <b-col sm="3">
                        <label>Name:</label>
                    </b-col>
                    <b-col sm="9">
                        <b-form-input type="text" v-model="newName" placeholder="Name"></b-form-input>
                    </b-col>
            </b-row>
            <b-row class="mt-2">
                    <b-col sm="3">
                        <label>Genre:</label>
                    </b-col>
                    <b-col sm="9">
                        <b-form-input type="text" v-model="newGenre" placeholder="Genre"></b-form-input>
                    </b-col>
            </b-row>
            <b-row class="mt-2">
                    <b-col sm="3">
                        <label>Score:</label>
                    </b-col>
                    <b-col sm="9">
                        <b-form-input type="number" v-model.number="newScore" placeholder="Score"></b-form-input>
                    </b-col>
            </b-row>
            <b-row class="mt-2">
                    <b-col sm="3">
                        <label>Description:</label>
                    </b-col>
                    <b-col sm="9">
                        <b-form-textarea type="text" v-model="newDescription" placeholder="Description"></b-form-textarea>
                    </b-col>
            </b-row>
            <b-row class="mt-2">
                    <b-col sm="3">
                        <label>Price:</label>
                    </b-col>
                    <b-col sm="9">
                        <b-form-input type="number" v-model.number="newPrice" placeholder="Price"></b-form-input>
                    </b-col>
            </b-row>
            <b-row class="mt-2">
                <div>
                    <b-button variant="primary" size="lg" @click="addNew">Save</b-button>
                </div>
            </b-row>
        </b-form>
    </b-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
	name: "EditGame",
	props: {
		name: {
			type: String,
			default: "",
		},
		genre: {
			type: String,
			default: "",
		},
		score: {
			type: Number,
			default: 0,
		},
		description: {
			type: String,
			default: "",
		},
		price: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			newName: "",
			newGenre: "",
			newScore: 0,
			newDescription: "",
			newPrice: 0,
		};
	},
	mounted: function () {
		this.newName = this.name;
		this.newGenre = this.genre;
		this.newScore = this.score;
		this.newDescription = this.description;
		this.newPrice = this.price;
	},
	methods: {
		...mapActions(["new_game", "change_game"]),

        validate: function () {
            if (!this.newName){
                alert("Name is missing.")
                return false;
            }
            else if (this.newName.length < 1 || this.newName.length > 60) {
                alert("Name must have less than 60 characters.")
                return false;
            }
            else if (!this.newGenre){
                alert("Genre is missing.")
                return false;
            }
            else if (this.newGenre.length < 1 || this.newGenre.length > 60) {
                alert("Genre must have less than 60 characters.")
                return false;
            }
            else if (!this.newScore){
                alert("Score is missing.")
                return false;
            }
            else if (this.newScore < 1 || this.newScore.length > 10) {
                alert("Score must be between 1 and 10.")
                return false;
            }
            else if (!this.newDescription){
                alert("Description is missing.")
                return false;
            }
            else if (!this.newPrice){
                alert("Price is missing.")
                return false;
            }
            return true;
            
        },

		addNew: function () {
            if (!this.validate())
                return;
            else {
                const msg = JSON.stringify({
                    name: this.newName,
                    genre: this.newGenre,
                    score: this.newScore,
                    description: this.newDescription,
                    price: this.newPrice,
                });
    
                if (!this.$route.params.id) this.new_game(msg);
                else this.change_game({ id: this.$route.params.id, msg: msg });

            }

		},
	},
};
</script>

<style scoped>
</style>