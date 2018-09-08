<template>
    <div>

        <Loading :loading="loading" />

        <div v-if="!loading">
            <Error v-if="Object.keys(message).length > 0" :message="message" />
            <div v-else class="has-background-dark">
                <Header :title="recipe.name" />

                <div class="container">
                    <Card :recipe="recipe"
                        :footer="true"
                        :isConnected="isConnected"
                        @fork="fork"
                        :isLiking="isLiking"
                        @like="like"
                        :numberLikes="recipe.nbLikes" />
                </div>

                <div class="section has-background-dark">
                    <div class="container has-background-light hero-body">
                        <div class="columns">
                            <div class="column is-one-quarter">
                                <SameAuthor :recipes="recipes" />
                            </div>

                            <div class="column is-three-quarters">
                                <div v-if="recipe">
                                    <Comments :comments="comments"
                                        :isConnected="isConnected"
                                        @add="addComment" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import sanitizeHtml from 'sanitize-html'

import api from '@/services/Api'
import { EventBus } from '@/event-bus.js'
import Card from '@/components/recipes/includes/Card'
import SameAuthor from '@/components/recipes/includes/SameAuthor'
import Comments from '@/components/recipes/includes/Comments'
import Loading from '@/components/Loading.vue'
import Header from '@/components/layout/Header.vue'
import Error from '@/components/recipes/includes/Error'

export default {
    components: {
        Card,
        SameAuthor,
        Comments,
        Loading,
        Header,
        Error
    },
	props: {
		isConnected: Boolean,
        userId: Number,
        firstname: String
	},
    data() {
        return {
            loading: false,
            recipe: {},
            recipes: [],
            comments: [],
            message: {}
        }
    },
    computed: {
        isLiking () {
            if (this.isConnected && this.userId != this.recipe.user_id) {
                return true
            } else {
                return false
            }
        }
    },
    async created () {
        this.getRecipe()
    },
    watch: {
        '$route': 'getRecipe'
    },
    methods: {
        async getRecipe() {
            this.comments = []
            this.loading = true
            await api.getRecipe(this.$route.params.id)
            .then(res => {
                this.recipe = res.data
                EventBus.$emit('title', `${res.data.name} de ${res.data.firstname}`)
                EventBus.$emit('breadcrumb', `${res.data.name}`)
                if (res.data.nbComments > 0) {
                    api.getCommentsByRecipe(this.$route.params.id)
                    .then(res => {
                        this.comments = res.data
                    })
                }

                if (res.data.nbSameAuthor > 0) {
                    api.getOthersRecipes(this.recipe.user_id, this.$route.params.id)
                    .then(res => {
                        this.recipes = res.data
                    })
                }

                this.loading = false
            }).catch(err => {
                if (err.response.status === 404) {
                    this.message.title = 'Erreur 404'
                    this.message.content = 'Cette recette n\'existe pas ou n\'existe plus.'
                    EventBus.$emit('title', this.message.title)
                    EventBus.$emit('breadcrumb', this.message.title)
                }

                if (err.response.status === 400) {
                    this.message.title = 'Erreur 400'
                    this.message.content = 'Cette recette ou cette page n\'existe pas.'
                    EventBus.$emit('title', this.message.title)
                    EventBus.$emit('breadcrumb', this.message.title)
                }

                if (err.response.status === 500) {
                    const title = 'Erreur 500'
                    EventBus.$emit('message', true)
                    EventBus.$emit('title', title)
                    EventBus.$emit('breadcrumb', title)
                }

                this.loading = false
            })
        },
        fork(id_recipe) {
            this.$root.$router.push({
                name: 'forkRecipe',
                id: id_recipe
            })
        },
        addComment(comment) {
            const content = sanitizeHtml(comment).replace(new RegExp('\r?\n','g'), '<br />')
            const self = this
            return api.addComment({
                content: content,
                user_id: self.userId,
                recipe_id: self.$route.params.id
            })
            .then(comment => {
                // Ajout du nouveau commentaire dans le tableau existant
                this.comments.push({
                    content: content,
                    firstname: self.firstname,
                    id: comment.data.id,
                    user_id: self.userId
                })
            })
        },
        like() {
            api.addLike({ user_id: this.userId, recipe_id: this.recipe.id })
            .then(() => {
                this.recipe.nbLikes = this.recipe.nbLikes + 1
            })
            .catch(err => {
                const id = JSON.parse(err.request.response).id
                api.removeLike(id)
                .then(() => {
                    this.recipe.nbLikes = this.recipe.nbLikes - 1
                })
            })
        }
    }
}
</script>