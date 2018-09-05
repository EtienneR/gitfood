<template>
    <div>

        <Loading :loading="loading" />

        <Header :title="title" :subtitle="q" />

        <section class="section">
			<div class="container">
                <div class="section">
                    <b-message v-if="q && q.length > 0 && recipes.length > 0" type="is-info">
                        {{ recipes.length }} <span v-if="recipes.length === 1">{{ successSingle }}</span><span v-else>{{ successPlural }}</span> par magie !
                    </b-message>
                    <b-message v-if="q && q.length > 0 && recipes.length === 0" type="is-warning">
                        Dommage, il n'y a aucune correspondance avec le terme "{{ q }}".
                    </b-message>
                    <b-message v-if="q == null || q.length === 0" type="is-warning">
                        Le champ de recherche n'a pas été renseigné.
                    </b-message>
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
            title: this.$route.query.q ? 'Recherche ' + this.$route.query.q : 'Recherche',
            q: '',
            recipes: [],
            successSingle: 'resultat est sorti',
            successPlural: 'résultats sont sortis'
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
            if (q) {
                this.loading = true
                await api.searchRecipes(q)
                .then(res => {
                    if (res.status === 200) {
                        this.recipes = res.data
                    } else {
                        this.recipes = []
                    }

                    EventBus.$emit('title', `${this.title} (${this.recipes.length})`)
                    EventBus.$emit('breadcrumb', this.title)
                    this.loading = false
                })
                .catch(() => {
                    this.loading = false
                })
            } else {
                EventBus.$emit('title', this.title)
                EventBus.$emit('breadcrumb', this.title)
            }
		}
	}
}
</script>