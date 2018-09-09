<template>
    <div>

        <div class="b-tabs block">
            <nav class="tabs is-centered">
                <ul>
                    <li class="is-disabled" style="opacity: 1">
                        <a><span>Prévisualisation</span></a>
                    </li>
                </ul>
            </nav>
        </div>

        <h2 class="title is-3">{{ recipe.name }}</h2>
        <p>{{ recipe.introduction }}</p>
        <DisplayIngredients :ingredients="recipe.ingredients" />
        <DisplayInstructions :instructions="recipe.instructions" />
        <p>{{ recipe.conclusion }}</p>

    </div>
</template>

<script>
import DisplayIngredients from '@/components/recipes/includes/DisplayIngredients'
import DisplayInstructions from '@/components/recipes/includes/DisplayInstructions'

export default {
    components: {
        DisplayIngredients,
        DisplayInstructions
    },
	props: {
        recipe: Object,
	}
}
</script>