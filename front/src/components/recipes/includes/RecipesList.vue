<template>
    <div>

        <div class="columns is-multiline">
            <div
                v-if="recipes.length > 0"
                class="column is-3"
                v-for="(recipe, index) in recipes" 
                :key="index">
                <article class="box">
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <router-link :to="{ name: 'recipe', params: { id: recipe.id }}">
                                <img :src="`${imgUrl}/${recipe.image}`" alt="image">
                            </router-link>
                        </figure>
                    </div>
                    <div class="card-content">
                        <h2 class="title is-6" style="margin-bottom: 2px">
                            <router-link :to="{ name: 'recipe', params: { id: recipe.id }}">
                                {{ recipe.name }}
                            </router-link>
                        </h2>
                        par 
                        <router-link v-if="$route.name !== 'user'" :to="{ name: 'user', params: { id: recipe.user_id }}">
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