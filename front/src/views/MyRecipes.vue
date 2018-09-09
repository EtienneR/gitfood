<template>
	<div>

		<Loading :loading="loading" />

		<div v-if="!loading">
			<Header title="Mes recettes" />

			<section class="section">

				<div class="container has-text-centered is-hidden-mobile content">
					<nav class="level">
						<div class="level-item has-text-centered">
							<div>
								<p class="heading">Recettes</p>
								<p class="title">{{ recipes.length }}</p>
							</div>
						</div>
						<div class="level-item has-text-centered">
							<div>
								<p class="heading">Recettes publiées</p>
								<p class="title">{{ getPublishedRecipes.length }}</p>
							</div>
						</div>
						<div class="level-item has-text-centered">
							<div>
								<p class="heading">Recettes en attente</p>
								<p class="title">{{ getUnpublishedRecipes.length }}</p>
							</div>
						</div>
						<div class="level-item has-text-centered">
							<div>
								<p class="heading">Recettes en likées</p>
								<p class="title">{{ getLikesNumber }}</p>
							</div>
						</div>
						<div class="level-item has-text-centered">
							<div>
								<p class="heading">Recettes en forkées</p>
								<p class="title">{{ getForksNumber }}</p>
							</div>
						</div>
					</nav>
				</div>

				<div class="container is-centered">
					<router-link class="button is-primary" :to="{ name: 'addRecipe'}">
						<b-icon icon="pencil"></b-icon>
						<span>Ajouter une recette</span>
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
import Dashboard from '@/components/recipes/includes/Dashboard.vue'

export default {
    components: {
        Loading,
		Header,
		Dashboard
    },
	props: {
		userId: Number
	},
	data() {
		return {
			loading: false,
			title: 'Mes recettes',
			recipes: [],
			forks: 0,
			like: 0,
		}
	},
	async created() {
		this.myRecipes()
		EventBus.$emit('title', this.title)
		EventBus.$emit('breadcrumb', this.title)
		
	},
	computed: {
		getPublishedRecipes() {
			return this.recipes.filter(recipe => recipe.published)
		},
		getUnpublishedRecipes() {
			return this.recipes.filter(recipe => !recipe.published)
		},
		getForksNumber() {
			return this.forks
		},
		getLikesNumber() {
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
				this.loading = false
			})
			.catch(err => {
				if (err.response.status === 500) {
					const title = 'Erreur 500'
					EventBus.$emit('message', true)
                    EventBus.$emit('title', title)
                    EventBus.$emit('breadcrumb', title)
					this.loading = false
				}
			})
		},
		// Suppression d'une recette
		async remove(id) {
			await api.removeRecipe(id)
			.then(() => {
				// Suppression du tableau
				this.recipes = this.recipes.filter(recipe => recipe.id != id)
				EventBus.$emit('toast', `Recette ${id} supprimée`)
			})
		}
	}
}
</script>