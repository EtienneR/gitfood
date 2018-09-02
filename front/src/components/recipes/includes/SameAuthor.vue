<template>

    <article class="message">
        <div class="message-header">
            <p>Du même auteur</p>
        </div>
        <ul class="message-body" v-if="recipes.length">
            <li v-for="(recipe, index) in recipes" :key="index">
                <router-link :to="{ name: 'recipe', params: { id: recipe.id }}">
                    {{ recipe.name }}
                </router-link>
            </li>
        </ul>
        <p v-else>Aucune autre recette</p>
    </article>

</template>

<script>
export default {
	props: {
		recipes: Array,
	}
}
</script>