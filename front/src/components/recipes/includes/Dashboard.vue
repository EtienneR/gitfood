<template>
    <div class="container">

        <div class="content">
            <router-link class="button is-primary" :to="{ name: 'addRecipe'}">Ajouter une recette</router-link>
        </div>
        <b-table :data="recipes" hoverable>
            <template slot-scope="props">
                <b-table-column label="Titre" field="name">
                    {{ props.row.name }}
                </b-table-column>
                <b-table-column label="Statut" field="published">
                    <span v-if="props.row.published">Publiée</span>
                    <span v-else>Brouillon</span>
                </b-table-column>
                <b-table-column label="Date de création" field="created_at">
                    {{ props.row.created_at | moment }}
                </b-table-column>
                <b-table-column label="Date de modification" field="updated_at">
                    {{ props.row.updated_at | moment }}
                </b-table-column>
                <b-table-column label="Modifier">
                    <router-link class="button is-info"
                        :to="{ name: 'editRecipe', params: { id: props.row.id }}"
                        :title="`Modifier la recette ${props.row.name}`">Modifier
                    </router-link>
                </b-table-column>
                <b-table-column label="Supprimer">
                    <a class="button is-danger"
                        @click="remove(props.row.id, props.index)"
                        :title="`Supprimer la recette ${props.row.name}`">Supprimer</a>
                </b-table-column>
            </template>
        </b-table>

    </div>
</template>

<script>
import moment from 'moment'

export default {
	props: {
		recipes: Array,
        column: Array
	},
	filters: {
		moment: function (date) {
			return moment(date).format('DD/MM/YYYY à HH:mm')
		}
	}
}
</script>