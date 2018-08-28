<template>
    <div class="container">

        <div class="section">
            <div class="columns">
                <div class="column is-three-quarter">
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li>
                                <router-link to="/">Accueil</router-link>
                            </li>
                            <li v-if="this.$route.name === 'addRecipe' || this.$route.name === 'editRecipe' || this.$route.name === 'forkRecipe'">
                                <router-link :to="{ name: 'myRecipes' }">Mes recettes</router-link>
                            </li>
                            <li class="is-active">
                                <a href="#" aria-current="page">{{ title }}</a>
                            </li>
                        </ul>
                    </nav>
                </div>

                <Search />

            </div>
        </div>

    </div>
</template>

<script>
import Search from '@/components/Search'

export default {
	props: {
		title: String,
	},
    components: {
        Search
    }
}
</script>

<style>
.section {
    padding: 10px 0
}
.breadcrumb {
    margin-top: 5px
}
</style>