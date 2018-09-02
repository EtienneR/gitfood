<template>
    <div class="hero-body is-hidden-mobile">

        <div class="container has-text-centered">
            <nav class="level">
                <div v-for="(message, index) in messages"
                    :key="index"
                    class="level-item has-text-centered">
                    <div>
                        <p class="heading">{{ message.name }}</p>
                        <p class="title">{{ message.value }}</p>
                    </div>
                </div>
            </nav>
        </div>

    </div>
</template>

<script>
export default {
	props: {
		recipes: Array,
        getPublishedRecipes: Number,
        getUnpublishedRecipes: Number,
        getForksNumbers: Number,
        getLikesNumbers: Number
	},
	data() {
		return {
            messages: [
                {
                    name: 'Recettes',
                    value: this.recipes.length
                },
                {
                    name: 'Recettes publiées',
                    value: this.getPublishedRecipes
                },
                {
                    name: 'Recettes en attentes',
                    value: this.getUnpublishedRecipes
                },
                {
                    name: 'Recettes likées',
                    value: this.getForksNumbers
                },
                {
                    name: 'Recettes forkées',
                    value: this.getLikesNumbers
                }
            ]
		}
	}
}
</script>