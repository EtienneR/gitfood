<template>
	<div>

		<Loading :loading="loading" />

		<div v-if="!loading">
			<Header title="GitFood" subtitle="Partagez vos recettes" />

			<section class="section has-background-dark">

				<div class="container">
					<div class="columns is-centered" style="margin-top: -40px">
						<FormSearch />
					</div>

					<b-notification v-if="!isConnected">
						Bienvenue sur GitFood, le site de partage de recettes. En vous inscrivant, vous pouvez poster vos recettes et les partager à tout le monde. Si une recette, vous pouvez la dupliquer :) - Inscription -
						<router-link :to="{ name: 'about'}">
							Plus d'informations
						</router-link>
					</b-notification>

					<RecipesList :recipes="recipes"/>
				</div>
			</section>
		</div>

	</div>
</template>

<script>
import api from '@/services/Api'
import { EventBus } from '@/event-bus.js'
import Loading from '@/components/Loading.vue'
import Header from '@/components/layout/Header.vue'
import FormSearch from '@/components/FormSearch'
import RecipesList from '@/components/recipes/includes/RecipesList.vue'

export default {
    components: {
        Loading,
		Header,
		FormSearch,
		RecipesList
    },
	metaInfo: {
		title: 'GitFood - Partagez vos recettes',
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
			})
			.catch(err => {
				if (err.response == null || err.response.status === 500) {
					EventBus.$emit('message', true)
				}
			})
			this.loading = false
		}
	}
}
</script>