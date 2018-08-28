<template>
    <div class="container">

        <div class="content">
            <router-link class="button is-primary" :to="{ name: 'addRecipe'}">Ajouter une recette</router-link>
        </div>

        <b-table :data="recipes" hoverable>
            <template slot-scope="props">
                <b-table-column label="Titre" field="name" sortable>
                    {{ props.row.name }}
                </b-table-column>

                <b-table-column label="Statut" field="published" sortable>
                    <span v-if="props.row.published">Publiée</span>
                    <span v-else>Brouillon</span>
                </b-table-column>

                <b-table-column label="Date de création" field="created_at" sortable>
                    {{ props.row.created_at | moment }}
                </b-table-column>
    
                <b-table-column label="Date de modification" field="updated_at" sortable>
                    {{ props.row.updated_at | moment }}
                </b-table-column>

                <b-table-column label="Modifier">
                    <router-link class="button is-info"
                        :to="{ name: 'editRecipe', params: { id: props.row.id }}"
                        :title="`Modifier la recette ${props.row.name}`">
                        Modifier
                    </router-link>
                </b-table-column>
    
                <b-table-column label="Supprimer">
                    <a class="button is-danger"
                        @click="remove(props.row.id, props.index)"
                        :title="`Supprimer la recette ${props.row.name}`">
                        Supprimer
                    </a>
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
    methods: {
        remove(id, index) {
            this.$dialog.confirm({
                title: 'Supprimer cette recette ?',
                message: 'Etes-vous sur de vouloir <b>supprimer</b> cette recette? Cette action sera définitive.',
                confirmText: 'Supprimer cette recette',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () => {
                    this.$emit('remove', id, index)
                }
            })
        }
    },
	filters: {
		moment (date) {
			return moment(date).format('DD/MM/YYYY à HH:mm')
		}
	}
}
</script>