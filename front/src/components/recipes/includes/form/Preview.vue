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
        <div v-if="recipe.ingredients[0] && recipe.ingredients[0].title">
            <h3 class="title is-4">Ingrédients</h3>
            <ul>
                <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
                <span v-if="ingredient.title">
                    <h4 class="title is-5">{{ ingredient.title }}</h4>
                    <ul>
                        <li v-for="(i, index) in ingredient.step" :key="index">
                            <span v-if="ingredient.quantity !== 0">{{ i.quantity }}</span> {{ i.mesure }} {{ i.name }}
                        </li>
                    </ul>
                </span>
                <span v-else>
                    <span v-if="ingredient.quantity !== 0">{{ ingredient.quantity }}</span> {{ ingredient.mesure }} {{ ingredient.name }}
                </span>
                </li>
            </ul>
        </div>
        <div v-if="recipe.instructions[0].name || recipe.instructions[0].title">
            <h3 class="title is-4">Instructions</h3>
            <ol>
                <li v-for="(instruction, index) in recipe.instructions" :key="index">
                <span v-if="instruction.title">
                    <h4 class="title is-5">{{ instruction.title }}</h4>
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