<template>
    <div>

        <div class="columns is-multiline">
            <div class="column is-4" v-for="(recipe, index) in recipes" :key="index" v-if="recipes.length > 0">
                <div class="box">
                    <article class="media">
                        <div class="media-left">
                            <figure class="image is-64x64">
                                <img :src="images.sample" alt="image">
                            </figure>
                        </div>
                        <div class="media-content">
                            <div class="content">
                                <h2 class="title is-5" style="margin-bottom: 2px">
                                    <router-link :to="{ name: 'recipe', params: { id: recipe.id }}">
                                        {{ recipe.name }}
                                    </router-link>
                                </h2>
                                par 
                                    <router-link :to="{ name: 'user', params: { id: recipe.user_id }}">
                                        {{ recipe.firstname }}
                                    </router-link>
                            </div>
                        </div>
                    </article>
                </div>
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