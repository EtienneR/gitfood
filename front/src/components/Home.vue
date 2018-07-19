<template>
	<section class="section">

		<h1 class="title is-1 has-text-centered">Recettes</h1>

		<div class="has-text-centered" v-if="isConnected">
			<a class="button is-primary" @click="getAllRecipes()">Toutes les recettes</a> 
			<a class="button is-default" v-if="userId" @click="getMyRecipes()">Mes recettes</a>
		</div>

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

	</section>
</template>

<script>
import api from '@/services/Api'

export default {
	props: {
		isConnected: Boolean,
		userId: Number
	},
	data() {
		return {
			recipes: [],
			message: ''
		}
	},
	methods: {
		getAllRecipes() {
			return api.getAllRecipes().then(res => {
				this.recipes = res.data
			})
		},
		getMyRecipes() {
			this.recipes = this.recipes.filter(r => {
				if (r.user_id === this.userId) {
					return r
				}
			})

			if (this.recipes.length === 0) {
				this.message = 'Aucune recette, il n\'est jamais trop tard pour publier les votre...'
			}
		}
	},
	mounted() {
		this.getAllRecipes()
	}
}
</script>