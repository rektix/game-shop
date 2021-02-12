import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Game from "@/views/Game";
import NewGame from "@/views/NewGame";

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/edit',
        name: 'newGame',
        component: NewGame
    },
    {
        path: '/game/:id',
        name: 'game',
        component: Game
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router