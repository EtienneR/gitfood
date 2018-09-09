<template>
    <section v-if="recipe" class="section" id="section">

        <div class="tile is-ancestor">
            <div class="tile is-vertical is-7">
                <div class="tile">
                    <div class="tile is-parent">
                        <article class="tile is-child">
                            <p>
                                Rédigé par
                                <router-link class="has-text-black" :to="{ name: 'user', params: { id: recipe.user_id }}">
                                    {{ recipe.firstname }}
                                </router-link>
                                le 
                                <time :datetime="recipe.created_at | iso8601">
                                    {{ recipe.created_at | moment }}
                                </time>
                            </p>
                            <div class="has-background-light">
                                <p class="hero-body">
                                    <em>{{ recipe.introduction }}</em>
                                </p>
                            </div>
                            <div class="section">
                                <div class="field is-grouped">
                                    <p class="control">
                                        <button class="button is-info is-outlined"
                                            @mouseover="mouseDislike"
                                            @mouseout="mouseLike"
                                            @click="like"
                                            :disabled="!isLiking">
                                            <b-icon :icon="likeIcon"></b-icon>
                                            <span>Liker ({{ this.recipe.nbLikes }})</span>
                                        </button>
                                    </p>
                                    <p class="control">
                                        <button class="button is-info" @click="fork()">
                                            <b-icon icon="source-fork"></b-icon>
                                            <span>Forker</span>
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
            <div class="tile is-parent">
                <article class="tile is-child">
                    <p class="has-text-centered">
                        <img :src="`${imgUrl}/${recipe.image}`" alt="Photo de suggestion" width="320px">
                    </p>
                </article>
            </div>
        </div>

        <div class="tile is-ancestor">
            <div class="tile is-vertical is-4">
                <div class="tile">
                    <div class="tile is-parent">
                        <article class="tile is-child">
                            <DisplayIngredients :ingredients="recipe.ingredients" />
                        </article>
                    </div>
                </div>
            </div>
            <div class="tile is-parent">
                <article class="tile is-child">
                    <DisplayInstructions :instructions="recipe.instructions" />
                </article>
            </div>
        </div>

        <div v-if="recipe.conclusion">
            <h2 class="title title is-4">Le petit mot de la fin</h2>
            <p>{{ recipe.conclusion }}</p>
        </div>

    </section>
</template>

<script>
import moment from 'moment'
require('moment/locale/fr')

import DisplayIngredients from '@/components/recipes/includes/DisplayIngredients'
import DisplayInstructions from '@/components/recipes/includes/DisplayInstructions'

export default {
    components: {
        DisplayIngredients,
        DisplayInstructions
    },
	props: {
		recipe: Object,
        footer: Boolean,
        isConnected: Boolean,
        isLiking: Boolean,
        numberLikes: Number
	},

    data() {
        return {
            likeIcon: 'heart'
        }
    },
    computed: {
        imgUrl() {
            return `http://${window.location.hostname}:3000/img`
        }
    },
    methods: {
        like() {
            this.$emit('like')
        },
        fork() {
            !this.isConnected ? this.$dialog.alert(this.customMessage('forker')) : this.$emit('fork', this.recipe.id)
        },
        customMessage(action) {
            return `Vous devez être connecté pour ${action} pour cette recette.`
        },
        mouseDislike() {
            if (this.isLiking && this.numberLikes > 0) {
                this.likeIcon = 'heart-outline'
            }
        },
        mouseLike() {
            if (this.isLiking) {
                this.likeIcon = 'heart'
            }
        }
    },
    filters: {
        moment: date => moment(date).format('D MMMM YYYY à HH:mm'),
        iso8601: date => moment(date).format()
    }
}
</script>

<style scoped>
#section {
    margin-top: -66px;
}
@media screen and (max-width: 768px) {
    #section {
        margin-top: -22px;
    }
}
</style>