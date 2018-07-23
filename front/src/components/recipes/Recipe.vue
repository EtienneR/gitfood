<template>
    <section v-if="!loading" class="section">

        <article v-if="recipe" class="card">
            <header class="card-header has-text-centered">
                <h1 class="title is-1 card-header-title">{{ recipe.name }}</h1>
            </header>
            <div class="card-content">
                <div class="content">
                    <p>
                        Rédigé par
                        <router-link :to="{ name: 'user', params: { id: recipe.user_id }}">
                            {{ recipe.firstname }}
                        </router-link>
                    </p>
                    <p><em>{{ recipe.introduction }}</em></p>
                    <div class="columns">
                        <div class="column is-one-quarter">
                            <h2 class="title is-3">Ingrédients</h2>
                            <ul>
                                <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
                                    <span v-if="ingredient.title">
                                        <h3>{{ ingredient.title }}</h3>
                                        <ul>
                                            <li v-for="(i, index) in ingredient.step" :key="index">
                                                {{ i.quantity }} {{ i.mesure }} {{ i.name }}
                                            </li>
                                        </ul>
                                    </span>
                                    <span v-else>
                                        {{ ingredient.quantity }} {{ ingredient.mesure }} <span v-if="ingredient.mesure">de</span> {{ ingredient.name }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div class="column is-three-quarters">
                            <h2 class="title is-3">Instructions</h2>
                            <ol>
                                <li v-for="(instruction, index) in recipe.instructions" :key="index">
                                    <span v-if="instruction.title">
                                        <h3>{{ instruction.title }}</h3>
                                        <ol>
                                            <li v-for="(a, index) in instruction.step" :key="index">{{ a.name }}</li>
                                        </ol>
                                    </span>
                                    <span v-else>
                                        {{ instruction.name }}
                                    </span>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <p>{{ recipe.conclusion }}</p>
                </div>
            </div>
            <footer class="card-footer">
                <a href="#" class="card-footer-item" @click="like" v-if="recipe.user_id !== userId">Liker</a>
                <a href="#" class="card-footer-item" @click="fork()">Forker</a>
                <a href="#" class="card-footer-item">Commenter</a>
            </footer>  
        </article>
        <br />

        <div class="columns">
            <div class="column is-one-quarter">
                <article class="message" v-if="recipes.length > 0">
                    <div class="message-header">
                        <h2 class="title is-5">Du même auteur</h2>
                    </div>
                    <ul class="message-body">
                        <li v-for="(recipe, index) in recipes" :key="index">
                            <router-link :to="{ name: 'recipe', params: { id: recipe.id }}">
                                {{ recipe.name }}
                            </router-link>
                        </li>
                    </ul>
                </article>
            </div>

            <div class="column is-three-quarters">
                <div class="message" v-if="recipe">
                    <div v-if="comments.length > 0">
                        <div class="message-header">
                            <h2 class="title is-5">Les commentaires ({{ comments.length }})</h2>
                        </div>
                        <article class="message-body" v-for="(comment, index) in comments" :key="index">
                            <p>De 
                                <router-link :to="{ name: 'user', params: { id: comment.user_id }}">
                                    {{ comment.firstname }}
                                </router-link>
                            </p>
                            <p>{{ comment.content }}</p>
                        </article>
                    </div>
                    <div v-else>
                        <div class="message-header">
                            <h2 class="title is-5">Aucun commentaire</h2>
                        </div>
                    </div>
                </div>

                <div v-if="recipe">
                    <b-field>
                        <b-input type="textarea"
                            placeholder="Laissez un message (de préférence constructif)"
                            v-model="comment">
                        </b-input>
                    </b-field>
                    <input type="submit"
                        class="button is-primary"
                        :value="isConnected ? 'Envoyer' : 'Vous devez être connecté'"
                        @click="addComment()"
                        :disabled="!isConnected">
                </div>

            </div>
        </div>
    
        <article v-if="message">
            <h1 class="title is-1 has-text-centered">{{ message.title }}</h1>
            <p class="title is-4 has-text-centered">{{ message.content }}</p>
        </article>

    </section>
</template>

<script>
import api from '@/services/Api'

export default {
    metaInfo() {
        return {
    	    title: this.recipe ?  `${this.recipe.name} de ${this.firstname}` : 'Erreur 404'
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
            message: {},
            comment: ''
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
        like() {
            if (!this.isConnected) {
                this.notConnected()
            }
        },
        fork() {
            if (!this.isConnected) {
                this.notConnected()
            } else {
                this.$root.$router.push({
                    name: 'forkRecipe',
                    id: this.$route.params.id
                })
            }
        },
        notConnected() {
            alert('not connected')
        },
        addComment() {
            const self = this
            if (self.comment.length > 0) {
                return api.addComment({ content: self.comment, user_id: self.userId, recette_id: self.$route.params.id })
                    .then(comment => {
                        // Ajout du nouveau commentaire dans le tableau existant
                        this.comments.unshift({
                            content: self.comment,
                            firstname: self.firstname,
                            id: comment.data.id,
                            user_id: self.userId
                        })
                        self.comment = ''
                    })
            } else {
                alert('Merci de remplir le champs')
            }
        }
    }
}
</script>