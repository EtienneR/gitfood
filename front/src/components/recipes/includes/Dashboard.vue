<template>
    <div class="container">

        <b-table
            :data="recipes" 
            hoverable
            striped>
            <template slot-scope="props">
                <b-table-column label="Titre" field="name" sortable>
                    {{ props.row.name }}
                </b-table-column>

                <b-table-column label="Statut" field="published" sortable>
                    <b-tag type="is-success" v-if="props.row.published">Publiée</b-tag>
                    <b-tag v-else>Brouillon</b-tag>
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
                    <button class="button is-danger"
                        @click="remove(props.row.id, props.index)"
                        :title="`Supprimer la recette ${props.row.name}`">
                        <b-icon icon="delete-variant"></b-icon>
                        <span>Supprimer</span>
                    </button>
                </b-table-column>
            </template>

            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon
                                icon="emoticon-sad"
                                size="is-large">
                            </b-icon>
                        </p>
                        <p>Pas de recettes</p>
                    </div>
                </section>
            </template>

        </b-table>

    </div>
</template>

<script>
import moment from 'moment'
require('moment/locale/fr')

export default {
	props: {
		recipes: Array
	},
    methods: {
        remove(id) {
            this.$dialog.confirm({
                title: 'Supprimer cette recette ?',
                message: 'Etes-vous sur de vouloir <b>supprimer</b> cette recette? Cette action sera définitive.',
                confirmText: 'Supprimer cette recette',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () => {
                    this.$emit('remove', id)
                }
            })
        }
    },
	filters: {
		moment: date => moment(date).format('D MMMM YYYY à HH:mm')
	}
}
</script>