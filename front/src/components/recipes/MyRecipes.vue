<template>
	<section class="section">
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
					<p class="title">{{ getPublishedRecipes }}</p>
				</div>
			</div>
			<div class="level-item has-text-centered">
				<div>
					<p class="heading">Recettes en attente</p>
					<p class="title">{{ getUnpublishedRecipes }}</p>
				</div>
			</div>
			<div class="level-item has-text-centered">
				<div>
					<p class="heading">Like</p>
					<p class="title">0</p>
				</div>
			</div>
			<div class="level-item has-text-centered">
				<div>
					<p class="heading">Fork</p>
					<p class="title">{{getForksNumbers}}</p>
				</div>
			</div>
		</nav>

		<router-link class="button is-primary" :to="{ name: 'addRecipe'}">Ajouter une recette</router-link>

		<b-table :data="recipes" hoverable>
			<template slot-scope="props">
				<b-table-column label="Titre" field="name">
					{{ props.row.name }}
				</b-table-column>
				<b-table-column label="Publiée" field="published">
					<span v-if="props.row.published">Publiée</span>
					<span v-else>Brouillon</span>
				</b-table-column>
				<b-table-column label="Date de création" field="created_at">
					{{ props.row.created_at }}
				</b-table-column>
				<b-table-column label="Date de modification" field="updated_at">
					{{ props.row.updated_at }}
				</b-table-column>
				<b-table-column label="Modifier">
					<router-link class="button is-info"
						:to="{ name: 'editRecipe', params: { id: props.row.id }}"
						:title="`Modifier la recette ${props.row.name}`">Modifier
					</router-link>
				</b-table-column>
				<b-table-column label="Supprimer">
					<a class="button is-danger"
						@click="remove(props.row.id, props.index)"
						:title="`Supprimer la recette ${props.row.name}`">Supprimer</a>
				</b-table-column>
			</template>
		</b-table>

	</section>
</template>

<script>
import api from '@/services/Api'
import { EventBus } from '@/event-bus.js'

export default {
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
			recipes: [],
			forks: [],
			columns: [
				{
					field: 'name',
					label: 'Titre',
				},
				{
					field: 'published',
					label: 'Publiée',
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
			await api.getRecipesByAuthor(this.userId)
			.then(res =>  {
				this.recipes = res.data
			})
			await api.getForks(this.userId)
			.then(res => {
				this.forks = res.data
			})
			.catch(() => {
				console.info('No forks for this user')
			})
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
