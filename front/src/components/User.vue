<template>
    <div v-if="!loading">

        <section class="section" v-if="recipes.length > 0">
            <h1 class="title is-1 has-text-centered">Les recettes de {{ recipes[0].firstname }}</h1>
            <article class="level" v-for="(recipe, index) in recipes" :key="index" v-if="recipes.length > 0">
                <div class="level-left">
                    <div class="level-item">
                        <h2 class="title is-3">
                            <router-link :to="{ name: 'recipe', params: { id: recipe.id }}">
                                {{ recipe.name }}
                            </router-link>
                        </h2>
                    </div>
                </div>
            </article>
        </section>

        <section class="section" v-if="message">
            <article>
                <h1 class="title is-1 has-text-centered">{{ message.title }}</h1>
                <p class="title is-4 has-text-centered">{{ message.content }}</p>
            </article>
        </section>

    </div>
</template>

<script>
import api from '@/services/Api'

export default {
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
            await api.getRecipesByAuthor(this.$route.params.id).then(res => {
                this.recipes = res.data
            }).catch(() => {
                this.message.title = 'Erreur 404'
                this.message.content = 'Cette utilisateur n\'existe pas ou n\'existe plus.'
            })
            this.loading = false
        }
    }
}
</script>