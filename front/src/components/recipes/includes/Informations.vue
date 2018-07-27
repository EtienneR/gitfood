<template>
    <div class="hero-body">

        <div class="container has-text-centered">
            <nav class="level">
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading">Recettes</p>
                        <p class="title">{{ recipes.length }}</p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading">Recettes publiées</p>
                        <p class="title">{{ getPublishedRecipes }}</p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading">Recettes en attente</p>
                        <p class="title">{{ getUnpublishedRecipes }}</p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading">Like</p>
                        <p class="title">0</p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading">Fork</p>
                        <p class="title">{{ getForksNumbers }}</p>
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
        getForksNumbers: Number
	}
}
</script>