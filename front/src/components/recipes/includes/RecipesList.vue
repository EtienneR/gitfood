<template>
    <div>

        <div class="columns is-multiline">
            <div
                v-if="recipes.length > 0"
                class="column is-3"
                v-for="(recipe, index) in recipes" 
                :key="index" >
                <article class="box">
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <router-link :to="{ name: 'recipe', params: { id: recipe.id }}">
                                <img :src="`http://localhost:3000/img/${recipe.image}`" alt="image">
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
                        <router-link :to="{ name: 'user', params: { id: recipe.user_id }}">
                            {{ recipe.firstname }}
                        </router-link>
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
    data() {
        return {
            images: {
                sample: require('../../../assets/128x128.png')
            }
        }
    }
}
</script>