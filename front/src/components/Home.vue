<template>
	<div>

		<Loading :loading="loading" />

		<div v-if="!loading">
			<Header title="GitFood" subtitle="Partagez vos recettes" />
			<RecipesList :recipes="recipes" />
		</div>

	</div>
</template>

<script>
import api from '@/services/Api'
import { EventBus } from '@/event-bus.js'
import Loading from '@/components/Loading.vue'
import Header from '@/components/layout/Header.vue'
import RecipesList from '@/components/recipes/includes/RecipesList.vue'

export default {
    components: {
        Loading,
		Header,
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