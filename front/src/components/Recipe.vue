<template>
    <section v-if="!loading" class="section">

        <article v-if="recette" class="card">
            <header class="card-header has-text-centered">
                <h1 class="title is-1 card-header-title">{{ recette.name }}</h1>
            </header>
            <div class="card-content">
                <div class="content">
                    <p>
                        Rédigé par
                        <router-link :to="{ name: 'user', params: { id: recette.user_id }}">
                            {{ recette.firstname }}
                        </router-link>
                    </p>
                    <p><em>{{ recette.introduction }}</em></p>
                    <div class="columns">
                        <div class="column is-one-quarter">
                            <h2 class="title is-3">Ingrédients</h2>
                            <ul>
                                <li v-for="(ingredient, index) in recette.ingredients" :key="index">
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
                                <li v-for="(instruction, index) in recette.instructions" :key="index">
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
                    <p>{{ recette.conclusion }}</p>
                </div>
            </div>
            <footer class="card-footer">
                <a href="#" class="card-footer-item" @click="like" v-if="recette.user_id !== userId">Liker</a>
                <a href="#" class="card-footer-item" @click="fork()">Forker</a>
                <a href="#" class="card-footer-item" @click="comment">Commenter</a>
            </footer>  
        </article>
        <br />
        <article v-if="recipes.length > 0">
            <h2 class="title is-5">Les autres recettes de cet utilisateur</h2>
            <ul>
                <li v-for="(recipe, index) in recipes" :key="index">
					<router-link :to="{ name: 'recipe', params: { id: recipe.id }}">
						{{ recipe.name }}
					</router-link>
                </li>
            </ul>
        </article>
    
        <article v-if="message">
            <h1 class="title is-1 has-text-centered">{{ message.title }}</h1>
            <p class="title is-4 has-text-centered">{{ message.content }}</p>
        </article>

    </section>
</template>

<script>
import api from '@/services/Api'

export default {
	props: {
		isConnected: Boolean,
        userId: Number
	},
    data() {
        return {
            loading: false,
            recette: null,
            recipes: [],
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
            this.loading = true
            await api.getRecipe(this.$route.params.id).then(res => {
                this.recette = res.data
            }).catch(() => {
                this.message.title = 'Erreur 404'
                this.message.content = 'Cette recette n\'existe pas ou n\'existe plus.'
                this.loading = false
            })
            await api.getOthersRecipes(this.recette.user_id, this.$route.params.id).then(res => {
                this.recipes = res.data
            })
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
        comment() {
            if (!this.isConnected) {
                this.notConnected()
            }
        },
        notConnected() {
            alert('not connected')
        }
    }
}
</script>