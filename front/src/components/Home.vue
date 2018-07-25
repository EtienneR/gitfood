<template>
	<div v-if="!loading">

		<section class="hero is-light">
			<div class="hero-body">
				<div class="container has-text-centered">
					<h1 class="title title is-2">
						GitFood
					</h1>
					<p class="subtitle">
						Partagez vos recettes
					</p>
				</div>
			</div>
		</section>

		<section class="section">
			<div class="container">
				<article class="level" v-for="(recipe, index) in recipes" :key="index" v-if="recipes.length > 0">
					<div class="level-left">
						<div class="level-item">
							<h2 class="title is-3">
								<router-link :to="{ name: 'recipe', params: { id: recipe.id }}">
									{{ recipe.name }}
								</router-link>
							</h2>
						</div>
						<div class="level-item">
							<p>par 
								<router-link :to="{ name: 'user', params: { id: recipe.user_id }}">
									<strong>{{ recipe.firstname }}</strong>
								</router-link>
							</p>
						</div>
					</div>
				</article>

				<article v-if="recipes.length === 0 && message">
					<p>{{ message }}</p>
				</article>
			</div>
		</section>

	</div>
    <section v-else>
        <b-loading :is-full-page="true" :active.sync="loading" :can-cancel="true"></b-loading>
    </section>
</template>

<script>
import api from '@/services/Api'
import { EventBus } from '@/event-bus.js'

export default {
	metaInfo: {
		title: 'GitFood',
		titleTemplate: null
	},
	props: {
		isConnected: Boolean,
		userId: Number
	},
	data() {
		return {
			loading: false,
			recipes: [],
			message: '',
			total: ''
		}
	},
	async created() {
		this.getAllRecipes()
	},
	methods: {
		async getAllRecipes() {
			this.loading = true
			await api.getAllRecipes()
				.then(res => {
					this.recipes = res.data
					this.total = res.data.length
				})
				.catch(err => {
					if (err.response.status === 500) {
						EventBus.$emit('message', true)
					}
				})
			this.loading = false
		},
		getRecipesByAuthor() {
			this.recipes = this.recipes.filter(r => {
				if (r.user_id === this.userId) {
					return r
				}
			})

			if (this.recipes.length === 0) {
				this.message = 'Aucune recette, il n\'est jamais trop tard pour publier les votre...'
			}
		}
	}
}
</script>