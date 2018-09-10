<template>
	<div>

		<Loading :loading="loading" />

		<div v-if="!loading">
			<Header title="GitFood" subtitle="Partagez vos recettes" />

			<section class="has-background-dark">
				<div class="columns is-centered">
					<FormSearch id="search" />
				</div>

				<div class="container">
					<RecipesList class="section"
						:recipes="recipes"
						:isConnected="isConnected" />
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
			EventBus.$emit('title', `Partagez vos recettes`)
			this.loading = true
			await api.getAllRecipes()
			.then(res => {
				this.recipes = res.data
				this.loading = false
			})
			.catch(err => {
				if (err.response == null || err.response.status === 500) {
					EventBus.$emit('message', true)
				}
				this.loading = false
			})
		}
	}
}
</script>

<style scoped>
#search {
    margin-top: -20px;
}
@media screen and (max-width: 768px) {
    #search {
		padding: 0 2.25rem;
        margin-top: 10px;
    }
}
</style>