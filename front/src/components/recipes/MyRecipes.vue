<template>
	<div v-if="!loading">

		<section class="hero is-light">
			<div class="hero-body">
				<div class="container has-text-centered">
					<h1 class="title title is-2">
						Mes recettes
					</h1>
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
				</div>
			</div>
		</section>

		<section class="section">
			<div class="container">
				<div class="content">
					<router-link class="button is-primary" :to="{ name: 'addRecipe'}">Ajouter une recette</router-link>
				</div>
				<b-table :data="recipes" hoverable>
					<template slot-scope="props">
						<b-table-column label="Titre" field="name">
							{{ props.row.name }}
						</b-table-column>
						<b-table-column label="Statut" field="published">
							<span v-if="props.row.published">Publiée</span>
							<span v-else>Brouillon</span>
						</b-table-column>
						<b-table-column label="Date de création" field="created_at">
							{{ props.row.created_at | moment }}
						</b-table-column>
						<b-table-column label="Date de modification" field="updated_at">
							{{ props.row.updated_at | moment }}
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
			</div>
		</section>

	</div>
    <section v-else class="container">
        <b-loading :is-full-page="true" :active.sync="loading" :can-cancel="true"></b-loading>
    </section>
</template>

<script>
import moment from 'moment'

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
	},
	filters: {
		moment: function (date) {
			return moment(date).format('DD/MM/YYYY à HH:mm')
		}
	}
}
</script>