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
    <div v-else>
        <b-loading :is-full-page="true" :active.sync="loading" :can-cancel="true"></b-loading>
    </div>
</template>

<script>
import api from '@/services/Api'
import { EventBus } from '@/event-bus.js'

export default {
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