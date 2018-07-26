import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
//import Home from './components/Home'
const Home = () => import('@/components/Home')
const Recipe = () => import('@/components/recipes/Recipe')
const User = () => import('@/components/users/User')
const MyRecipes = () => import('@/components/recipes/MyRecipes')
const FormRecipe = () => import('@/components/recipes/FormRecipe')
const MyComments = () => import('@/components/comments/MyComments')
const About = () => import('@/components/About')
const Error404 = () => import('@/components/Error404')
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
