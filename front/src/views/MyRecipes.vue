<template>
	<div>

		<Loading :loading="loading" />

		<div v-if="!loading">
			<Header title="Mes recettes" />

			<section class="section">
				<Informations
					:recipes="recipes"
					:getPublishedRecipes="getPublishedRecipes"
					:getUnpublishedRecipes="getUnpublishedRecipes"
					:getForksNumbers="getForksNumbers" />
				<Dashboard
					:recipes="recipes"
					:columns="columns"
					@remove="remove" />
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
			forks: [],
			columns: [
				{
					field: 'name',
					label: 'Titre',
				},
				{
					field: 'published',
					label: 'Statut',
				},
				{
					field: 'created_at',
					label: 'Date de création',
				},
				{
					field: 'updated_at',
					label: 'Date de modification',
				}
			]
		}
	},
	async created() {
		this.myRecipes()
		EventBus.$emit('title', 'Mes recettes')
	},
	computed: {
		getPublishedRecipes() {
			return this.recipes.filter(recette => recette.published).length
		},
		getUnpublishedRecipes() {
			return this.recipes.filter(recette => !recette.published).length      
		},
		getForksNumbers() {
			return this.forks.length
		}
	},
	methods: {
		async myRecipes() {
			this.loading = true
			// Récupération des recettes de l'utilisateur
			await api.getRecipesByAuthor(this.userId)
			.then(res => {
				this.recipes = res.data
				// Récupération des recettes forkées
				api.getForks(this.userId)
				.then(res => {
					this.forks = res.data
				})
				.catch(() => {
					console.info('No forks for this user')
				})
			})
			.catch(err => {
				if (err.response.status === 500) {
					EventBus.$emit('message', true)
				}
			})
			this.loading = false
		},
		// Suppression d'une recette
		async remove(id, index) {
			await api.removeRecipe(id)
			.then(() => {
				// Suppression du tableau
				this.recipes.splice(index, 1)
				EventBus.$emit('toast', `Recette ${id} supprimée`)
			})
		}
	}
}
</script>