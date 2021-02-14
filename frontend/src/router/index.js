import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Game from "@/views/Game";
import NewGame from "@/views/NewGame";
import User from "@/views/User";
import Register from "@/views/Register"

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
    },
    {
        path: '/user',
        name: 'user',
        component: User
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        props: {
            type: 'register'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Register,
        props: {
            type: 'login'
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router