<template>
    <div>

        <Loading :loading="loading" />

        <Header v-if="recipes.length > 0"
            :title="recipes[0].firstname"
            subtitle="Toutes ses recettes" />
        <section class="section">
			<div class="container">
                <RecipesList v-if="recipes.length > 0" :recipes="recipes" />
            </div>
        </section>

        <Error v-if="Object.keys(message).length > 0" :message="message" />

    </div>
</template>

<script>
import api from '@/services/Api'
import { EventBus } from '@/event-bus.js'
import Loading from '@/components/Loading.vue'
import Header from '@/components/layout/Header.vue'
import RecipesList from '@/components/recipes/includes/RecipesList.vue'
import Error from '@/components/recipes/includes/Error'

export default {
    components: {
        Loading,
		Header,
		RecipesList,
        Error
    },
    props: {
        isConnected: Boolean,
        userId: Number
    },
    metaInfo() {
        return {
            title: this.recipes && this.recipes[0] ? `Les recettes de ${this.recipes[0].firstname}` : 'Erreur 404'
        }
    },
    data() {
        return {
            loading: false,
            recipes: [],
            message: {}
        }
    },
    async created () {
        this.getRecipes()
    },
    watch: {
        '$route': 'getRecipes'
    },
    methods: {
        async getRecipes() {
            this.loading = true
            await api.getRecipesByAuthor(this.$route.params.id)
            .then(res => {
                this.recipes = res.data
            }).catch(err => {
                if (err.response.status === 404) {
                    this.message.title = 'Erreur 404'
                    this.message.content = 'Cette utilisateur n\'existe pas ou n\'existe plus.'
                }
                if (err.response.status === 500) {
                    EventBus.$emit('message', true)
                }
            })
            this.loading = false
        }
    }
}
</script>