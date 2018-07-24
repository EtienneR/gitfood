<template>
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

        <footer v-if="footer" class="card-footer">
            <a class="card-footer-item">Liker</a>
            <a class="card-footer-item" @click="fork()">Forker</a>
        </footer>

    </article>
</template>

<script>
export default {
	props: {
		recipe: Object,
        footer: Boolean,
        isConnected: Boolean
	},
    methods: {
        fork() {
            if (!this.isConnected) {
                this.$dialog.alert('Vous devez être connecté pour forker pour cette recette.')
            } else {
                this.$emit('fork', this.recipe.id)
            }
        }
    }
}
</script>