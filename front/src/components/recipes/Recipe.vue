<template>
    <section v-if="!loading" class="section">

        <Card :recipe="recipe"
            :footer="true"
            :isConnected="isConnected"
            @fork="fork" />
        <br />

        <div class="columns">
            <div class="column is-one-quarter">
                <SameAuthor v-if="recipes.length > 0" :recipes="recipes" />
            </div>

            <div class="column is-three-quarters">
                <div class="message" v-if="recipe">
                    <Comments :comments="comments"
                        :isConnected="isConnected"
                        @add="addComment" />
                </div>
            </div>
        </div>

        <Error v-if="message" :message="message"></Error>

    </section>
</template>

<script>
import sanitizeHtml from 'sanitize-html'
import api from '@/services/Api'
import Card from '@/components/recipes/includes/Card'
import SameAuthor from '@/components/recipes/includes/SameAuthor'
import Comments from '@/components/recipes/includes/Comments'
import Error from '@/components/recipes/includes/Error'

export default {
    components: {
        Card,
        SameAuthor,
        Comments,
        Error
    },
    metaInfo() {
        return {
            title: this.recipe ?  `${this.recipe.name} de ${this.recipe.firstname}` : 'Erreur 404'
        }
    },
	props: {
		isConnected: Boolean,
        userId: Number,
        firstname: String
	},
    data() {
        return {
            loading: false,
            recipe: null,
            recipes: [],
            comments: [],
            message: {}
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
                }).catch(() => {
                    this.message.title = 'Erreur 404'
                    this.message.content = 'Cette recette n\'existe pas ou n\'existe plus.'
                    this.loading = false
                })
                if (this.recipe) {
                    await api.getOthersRecipes(this.recipe.user_id, this.$route.params.id)
                        .then(res => {
                            this.recipes = res.data
                        })
                    await api.getCommentsByRecipe(this.$route.params.id)
                        .then(res => {
                            this.comments = res.data
                        }).catch(() => {
                            this.loading = false
                        })
                }
            this.loading = false
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
                    recette_id: self.$route.params.id
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
        }
    }
}
</script>