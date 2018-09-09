<template>
    <div class="content">
        <h2 class="title is-4">Ingrédients</h2>
        <ul :class="{'ingredients' : ingredients[0].step}">
            <li v-for="(ingredient, index) in ingredients" :key="index">
                <span v-if="ingredient.title">
                    <span class="title is-5">{{ ingredient.title }}</span>
                    <ul>
                        <li v-for="(i, index) in ingredient.step" :key="index">
                            <span v-if="i.quantity !== 0">{{ i.quantity }}</span> {{ i.mesure }} <span v-if="i.mesure">de</span> {{ i.name }}
                        </li>
                    </ul>
                </span>
                <span v-else>
                    <span v-if="ingredient.quantity !== 0">{{ ingredient.quantity }}</span> {{ ingredient.mesure }} <span v-if="ingredient.mesure">de</span> {{ ingredient.name }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
	props: {
        ingredients: Array,
	}
}
</script>

<style scoped>
.ingredients {
    list-style-type: decimal;
}

.ingredients ul li {
    list-style-type: disc;
}

.ingredients ul li {
    margin-left: -25px;
}

.ingredients li ul{
    margin-bottom: 20px;
}
</style>