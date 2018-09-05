<template>
    <section class="section has-background-white" v-if="recipe" style="margin-top: -20px">

        <div class="hero-body">

            <div class="tile is-ancestor">
                <div class="tile is-vertical is-7">
                    <div class="tile">
                        <div class="tile is-parent">
                            <article class="tile is-child">
                                <p>
                                    Rédigé par
                                    <router-link :to="{ name: 'user', params: { id: recipe.user_id }}">
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
                                            <button class="button is-primary is-outlined"
                                                @mouseover="mouseDislike"
                                                @mouseout="mouseLike"
                                                @click="like"
                                                :disabled="!isLiking">
                                                <b-icon :icon="likeIcon"></b-icon>
                                                <span>Liker ({{ this.recipe.nbLikes }})</span>
                                            </button>
                                        </p>
                                        <p class="control">
                                            <button class="button is-primary" @click="fork()">Forker</button>
                                        </p>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
                <div class="tile is-parent">
                    <article class="tile is-child">
                        <p class="has-text-right">
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
                                <div class="content">
                                    <p class="title">Ingrédients</p>
                                    <ul>
                                        <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
                                            <span v-if="ingredient.title">
                                                <h3>{{ ingredient.title }}</h3>
                                                <ul>
                                                    <li v-for="(i, index) in ingredient.step" :key="index">
                                                        <span v-if="i.quantity !== 0">{{ i.quantity }}</span> {{ i.mesure }} <span v-if="i.mesure">de</span> {{ i.name }}
                                                    </li>
                                                </ul>
                                            </span>
                                            <span v-else>
                                                <span v-if="ingredient.quantity !== 0">{{ ingredient.quantity }}</span> {{ ingredient.mesure }} <span v-if="ingredient.mesure">de</span> {{ ingredient.name }}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
                <div class="tile is-parent">
                    <article class="tile is-child">
                        <div class="content">
                            <p class="title">Instructions</p>
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
                    </article>
                </div>
            </div>

            <div v-if="recipe.conclusion">
                <p class="title">Le petit mot de la fin</p>
                <p>{{ recipe.conclusion }}</p>
            </div>
        </div>

    </section>
</template>

<script>
import moment from 'moment'
require('moment/locale/fr')

export default {
	props: {
		recipe: Object,
        footer: Boolean,
        isConnected: Boolean,
        isLiking: Boolean,
        numberLikes: Number
	},
    data() {
        return {
            likeIcon: 'thumb-up'
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
                this.likeIcon = 'thumb-down'
            }
        },
        mouseLike() {
            if (this.isLiking) {
                this.likeIcon = 'thumb-up'
            }
        }
    },
    filters: {
        moment: function (date) {
            return moment(date).format('D MMMM YYYY à HH:mm')
        },
        iso8601: function (date) {
            return moment(date).format()
        }
    }
}
</script>