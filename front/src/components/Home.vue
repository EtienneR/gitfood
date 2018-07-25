<template>
	<section v-if="!loading" class="section">

		<h1 class="title is-1 has-text-centered">Recettes</h1>

		<div class="has-text-centered" v-if="isConnected">
			<a class="button is-primary" @click="getAllRecipes()">Toutes les recettes ({{ total }})</a> 
			<a class="button is-default" v-if="userId" @click="getRecipesByAuthor()">Mes recettes ({{getMine }})</a>
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
    <section v-else>
        <b-loading :is-full-page="true" :active.sync="loading" :can-cancel="true"></b-loading>
    </section>
</template>

<script>
import api from '@/services/Api'

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
	computed: {
		getMine() {
			return this.recipes.filter(r => {
				if (r.user_id === this.userId) {
					return r
				}
			}).length
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