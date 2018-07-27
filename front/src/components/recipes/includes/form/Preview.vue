<template>
    <div>

	    <legend>Prévisualisation de votre recette</legend>
        <h2 class="title is-2">{{ recipe.name }}</h2>
        <p>{{ recipe.introduction }}</p>
        <div v-if="recipe.ingredients[0] && recipe.ingredients[0].name">
            <h3 class="title is-3">Ingrédients</h3>
            <ul>
                <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
                <span v-if="ingredient.title">
                    <h4>{{ ingredient.title }}</h4>
                    <ul>
                        <li v-for="(i, index) in ingredient.step" :key="index">
                            {{ i.quantity }} {{ i.mesure }} {{ i.name }}
                        </li>
                    </ul>
                </span>
                <span v-else>
                    {{ ingredient.quantity }} {{ ingredient.mesure }} {{ ingredient.name }}
                </span>
                </li>
            </ul>
        </div>
        <div v-if="recipe.instructions[0].name || recipe.instructions[0].title">
            <h3 class="title is-3">Instructions</h3>
            <ol>
                <li v-for="(instruction, index) in recipe.instructions" :key="index">
                <span v-if="instruction.title">
                    <h4 class="title is-4">{{ instruction.title }}</h4>
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
        <br />
        <p>{{ recipe.conclusion }}</p>

    </div>
</template>

<script>
export default {
	props: {
        recipe: Object,
	}
}
</script>