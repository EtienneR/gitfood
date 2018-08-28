<template>
    <div>

        <Loading :loading="loading" />

        <Header :title="title"
            :subtitle="q" />

        <section class="section">
			<div class="container">
               <div class="section">
                    <div class="section">
                        <b-message v-if="recipes.length > 0" type="is-info">
                            {{recipes.length}} <span v-if="recipes.length === 1">{{successSingle}}</span><span v-else>{{successPlural}}</span> par magie !
                        </b-message>
                        <b-message v-if="recipes.length === 0" type="is-warning">
                            Dommage, il n'y a aucune correspondance avec le terme "{{q}}".
                        </b-message>
                    </div>
                </div>

                <RecipesList :recipes="recipes" />
            </div>
        </section>

    </div>
</template>

<script>
import api from '@/services/Api'
import { EventBus } from '@/event-bus.js'
import Loading from '@/components/Loading'
import Header from '@/components/layout/Header'
import RecipesList from '@/components/recipes/includes/RecipesList'

export default {
    components: {
        Loading,
		Header,
        RecipesList
    },
    data() {
        return {
            loading: false,
            title: 'Recherche',
            q: '',
            recipes: [],
            successSingle: 'resultat est sorti',
            successPlural: 'résultats sont sortis'
        }
    },
	metaInfo() {
		return {
			title: this.title
		}
	},
    watch: {
        '$route.query.q'() {
            this.recipes = []
            this.getRecipes(this.$route.query.q)
        }
    },
	async created() {
        EventBus.$emit('title', this.title)
		this.getRecipes(this.$route.query.q)
	},
	methods: {
		async getRecipes(q) {
            this.q = q
			this.loading = true
			await api.searchRecipes(q)
            .then(res => {
                if (res.status === 200) {
                    this.recipes = res.data
                } else {
                    this.recipes = []
                }
                this.loading = false
			})
			.catch(() => {
                this.loading = false
			})
		}
	}
}
</script>