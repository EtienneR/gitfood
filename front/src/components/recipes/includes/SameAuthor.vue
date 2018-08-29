<template>

    <article class="message">
        <div class="message-header">
            <p>Du même auteur</p>
        </div>
        <ul class="message-body">
            <li v-for="(recipe, index) in recipes" :key="index">
                <router-link :to="{ name: 'recipe', params: { id: recipe.id }}">
                    {{ recipe.name }}
                </router-link>
            </li>
        </ul>
    </article>

</template>

<script>
export default {
	props: {
		recipes: Array,
	}
}
</script>