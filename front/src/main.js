import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'
import Recipe from './components/Recipe.vue'
import User from './components/User.vue'
import MyRecipes from './components/recipes/MyRecipes.vue'
import AddRecipe from './components/recipes/AddRecipe.vue'
import About from './components/About.vue'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

Vue.use(Buefy)
Vue.use(VueRouter)

const routes = [
	{ path: '/', name: 'home', component: Home },
	{ path: '/:id', name: 'recipe', component: Recipe },
	{ path: '/user/:id', name: 'user', component: User },
	{ path: '/menu', name: 'myRecipes', component: MyRecipes },
	{ path: '/menu/ajouter', name:'addRecipe', component: AddRecipe },
	{ path: '/menu/modifier/:id', name:'editRecipe', component: AddRecipe },
	{ path: '/menu/fork/:id', name:'forkRecipe', component: AddRecipe },
	{ path: '/about', name: 'about', component: About }
]

const router = new VueRouter({
	mode: 'history',
	routes
})

Vue.config.productionTip = false

new Vue({
	render: h => h(App),
	router
}).$mount('#app')
