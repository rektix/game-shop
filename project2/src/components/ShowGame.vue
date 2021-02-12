<template>

    <b-container fluid>
        <b-row>
            <b-col sm="2">
                <label for="user">Name:</label>
            </b-col>
            <b-col sm="10">
                <p id="user" style="text-align: left">{{ game.name }}</p>
            </b-col>
        </b-row>

        <b-row class="mt-2">
            <b-col sm="2">
                <label for="msg">Genre:</label>
            </b-col>
            <b-col sm="10">
                <p id="msg" style="text-align: left">{{ game.genre }}</p>
            </b-col>
        </b-row>

        <b-row class="mt-2">
            <b-col sm="2">
                <label for="msg">Score:</label>
            </b-col>
            <b-col sm="10">
                <p id="msg" style="text-align: left">{{ game.score }}</p>
            </b-col>
        </b-row>

        <b-row class="mt-2">
            <b-col sm="2">
                <label for="msg">Description:</label>
            </b-col>
            <b-col sm="10">
                <p id="msg" style="text-align: left">{{ game.description }}</p>
            </b-col>
        </b-row>

        <b-row class="mt-2">
            <b-col sm="2">
                <label for="msg">Price:</label>
            </b-col>
            <b-col sm="10">
                <p id="msg" style="text-align: left">${{ game.price }}</p>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        name: "ShowGame",
        props: {
            game: Object
        }
    }
</script>