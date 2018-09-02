<template>
	<div>

		<Loading :loading="loading" />

		<div v-if="!loading">
			<Header title="Mes recettes" />

			<section class="section">
				<Informations :recipes="recipes"
					:getPublishedRecipes="getPublishedRecipes.length"
					:getUnpublishedRecipes="getUnpublishedRecipes.length"
					:getForksNumbers="getForksNumbers"
					:getLikesNumbers="getLikesNumbers" />

				<div class="container is-centered">
					<router-link class="button is-primary" :to="{ name: 'addRecipe'}">
						Ajouter une recette
					</router-link>
				</div>

				<Dashboard v-if="getUnpublishedRecipes.length === 0 || getPublishedRecipes.length === 0"
					:recipes="recipes"
					@remove="remove" />
				
				<b-tabs v-else
					position="is-centered"
					class="block"
					:animated="false" >
					<b-tab-item label="Tous">
						<Dashboard :recipes="recipes" @remove="remove" />
					</b-tab-item>
					<b-tab-item label="Publiée" v-if="getPublishedRecipes.length > 0">
						<Dashboard :recipes="getPublishedRecipes" @remove="remove" />
					</b-tab-item>
					<b-tab-item label="Brouillon" v-if="getUnpublishedRecipes.length > 0">
						<Dashboard :recipes="getUnpublishedRecipes" @remove="remove" />
					</b-tab-item>
				</b-tabs>

			</section>
		</div>

	</div>
</template>

<script>
import api from '@/services/Api'
import { EventBus } from '@/event-bus.js'
import Loading from '@/components/Loading.vue'
import Header from '@/components/layout/Header.vue'
import Informations from '@/components/recipes/includes/Informations.vue'
import Dashboard from '@/components/recipes/includes/Dashboard.vue'

export default {
    components: {
        Loading,
		Header,
		Informations,
		Dashboard
    },
	metaInfo() {
		return {
			title: this.recipes && `Mes recettes (${this.recipes.length})`
		}
	},
	props: {
		userId: Number
	},
	data() {
		return {
			loading: false,
			recipes: [],
			forks: Number,
			like: Number
		}
	},
	async created() {
		this.myRecipes()
		EventBus.$emit('title', 'Mes recettes')
	},
	computed: {
		getPublishedRecipes() {
			return this.recipes.filter(recipe => recipe.published)
		},
		getUnpublishedRecipes() {
			return this.recipes.filter(recipe => !recipe.published)
		},
		getForksNumbers() {
			return this.forks
		},
		getLikesNumbers() {
			return this.likes
		}
	},
	methods: {
		async myRecipes() {
			this.loading = true
			// Récupération des recettes de l'utilisateur
			await api.getRecipesByAuthor(this.userId)
			.then(res => {
				this.recipes = res.data.recipes
				this.forks = res.data.nbForks
				this.likes = res.data.nbLikes
			})
			.catch(err => {
				if (err.response.status === 500) {
					EventBus.$emit('message', true)
				}
			})
			this.loading = false
		},
		// Suppression d'une recette
		async remove(id) {
			await api.removeRecipe(id)
			.then(() => {
				// Suppression du tableau
				const index = this.recipes.findIndex(r => r.id == id)
				this.recipes.splice(index, 1)
				EventBus.$emit('toast', `Recette ${id} supprimée`)
			})
		}
	}
}
</script>