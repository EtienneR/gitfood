<template>
    <div>

        <div class="columns is-multiline">
            <div v-if="recipes.length > 0"
                class="column is-3"
                v-for="(recipe, index) in recipes" 
                :key="index">
                <article class="box">
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <router-link :to="{ name: 'recipe', params: { id: recipe.id }}" title="Consulter cette recette">
                                <img :src="`${imgUrl}/${recipe.image}`" alt="image">
                            </router-link>
                        </figure>
                    </div>
                    <div class="card-content">
                        <h2 class="title is-6" style="margin-bottom: 2px">
                            <router-link class="has-text-black"
                                :to="{ name: 'recipe', params: { id: recipe.id }}"
                                title="Consulter cette recette">
                                {{ recipe.name }}
                            </router-link>
                        </h2>
                        par 
                        <router-link v-if="$route.name !== 'user'"
                            class="has-text-black"
                            :to="{ name: 'user', params: { id: recipe.user_id }}"
                            title="Consulter toutes ces recettes">
                            {{ recipe.firstname }}
                        </router-link>
                        <span v-else>
                            {{ recipe.firstname }}
                        </span>
                    </div>
                </article>
            </div>
        </div>

    </div>
</template>

<script>
export default {
	props: {
		recipes: Array,
	},
    computed: {
        imgUrl() {
            return `http://${window.location.hostname}:3000/img`
        }
    }
}
</script>