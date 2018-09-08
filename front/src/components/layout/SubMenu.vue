<template>
    <div class="container">

        <div class="section">
            <div class="columns">
                <div class="column is-three-quarter">
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li>
                                <router-link to="/" class="has-text-black">Accueil</router-link>
                            </li>
                            <li v-if="this.$route.name === 'addRecipe' || this.$route.name === 'editRecipe' || this.$route.name === 'forkRecipe'">
                                <router-link class="has-text-black" :to="{ name: 'myRecipes' }">Mes recettes</router-link>
                            </li>
                            <li class="is-active">
                                <a href="#" aria-current="page">{{ title }}</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <FormSearch class="column is-one-quarter"  />
            </div>
        </div>

    </div>
</template>

<script>
import FormSearch from '@/components/FormSearch'

export default {
	props: {
		title: String,
	},
    components: {
        FormSearch
    }
}
</script>

<style scoped>
@media screen and (min-width: 1025px) {
    .section {
        padding: 10px 0;
    }
}
@media screen and (max-width: 1024px) {
    .section {
        padding-top: 10px;
        padding-bottom: 10px;
    }
}
.breadcrumb {
    margin-top: 5px
}
</style>