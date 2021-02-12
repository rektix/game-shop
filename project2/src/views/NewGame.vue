<template>
    <div class="home">
        <Header/>
        <b-container>
            <b-row>
                <b-col cm="6" >
                    <EditGame/>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import EditGame from "@/components/EditGame";
    import Header from "@/components/Header";

    export default {
        name: "NewMessage",
        components: {
            Header,
            EditGame
        }
    }
</script>

<style scoped>

</style>