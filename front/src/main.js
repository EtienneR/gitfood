import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'
import Recipe from './components/recipes/Recipe.vue'
import User from './components/users/User.vue'
import MyRecipes from './components/recipes/MyRecipes.vue'
import FormRecipe from './components/recipes/FormRecipe.vue'
import MyComments from './components/comments/MyComments.vue'
import About from './components/About.vue'
import Error404 from './components/Error404.vue'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import Meta from 'vue-meta'

Vue.use(Buefy)
Vue.use(VueRouter)
Vue.use(Meta)

const routes = [
	{ path: '/', name: 'home', component: Home },
	{ path: '/menu', name: 'myRecipes', component: MyRecipes },
	{ path: '/menu/ajouter', name:'addRecipe', component: FormRecipe },
	{ path: '/menu/modifier/:id', name:'editRecipe', component: FormRecipe },
	{ path: '/menu/fork/:id', name:'forkRecipe', component: FormRecipe },
	{ path: '/menu/comments', name: 'myComments', component: MyComments },
	{ path: '/user/:id', name: 'user', component: User },
	{ path: '/about', name: 'about', component: About },
	{ path: '/error404', component: Error404 },
	{ path: '/:id', name: 'recipe', component: Recipe, props: checkId },
	{ path: '*', name: 'error404', component: Error404, redirect: '/error404' }
]

function checkId(route) {
	const reg = new RegExp('^[0-9]+$')
	if (!reg.exec(route.params.id)) {
		router.push({
			name: 'error404'
		})
	}
}

const router = new VueRouter({
	mode: 'history',
	routes
})

Vue.config.productionTip = false

new Vue({
	render: h => h(App),
	router
}).$mount('#app')
