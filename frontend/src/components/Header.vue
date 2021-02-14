<template>
    <div>
        <h1>Game Shop</h1>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: "Header",
        computed: {
            ...mapState(['games'])
        }
    }
</script>

<style scoped>
h1 {
    font-size: 50px;
    padding: 30px;
    background: #21369E;
    color: #9E7C11;
}
</style>