<template>
	<div>

		<Loading :loading="loading" />

		<div v-if="!loading">
			<Header title="Mes recetttes" />

			<section class="section">
				<Informations
					:recipes="recipes"
					:getPublishedRecipes="getPublishedRecipes"
					:getUnpublishedRecipes="getUnpublishedRecipes"
					:getForksNumbers="getForksNumbers" />
				<Dashboard :recipes="recipes" :columns="columns" />
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
			title: this.getPublishedRecipes && `Mes recettes (${this.getPublishedRecipes})`
		}
	},
	props: {
		isConnected: Boolean,
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
			await api.getRecipesByAuthor(this.userId)
			.then(res => {
				this.recipes = res.data
			})
			.catch(err => {
				if (err.response.status === 500) {
					EventBus.$emit('message', true)
				}
			})
			await api.getForks(this.userId)
			.then(res => {
				this.forks = res.data
			})
			.catch(() => {
				console.info('No forks for this user')
			})
			this.loading = false
		},
		remove(id, index) {
			return api.removeRecipe(id)
			.then(() => {
				this.recipes.splice(index, 1)
				EventBus.$emit('toast', `Recette ${id} supprimée`)
			})
		}
	}
}
</script>