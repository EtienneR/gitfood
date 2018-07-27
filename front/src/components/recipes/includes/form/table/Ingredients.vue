<template>
    <div>
    
        <b-table :data="getIngredients" hoverable>
            <template slot-scope="props">
                <b-table-column label="Quantité" field="quantity">
                    <b-field>
						<b-input v-model.number="props.row.quantity " type="number" min="0"></b-input>
					</b-field>
                </b-table-column>
                <b-table-column label="Mesure" field="mesure">
                    <b-field>
						<b-input v-model.trim="props.row.mesure"></b-input>
					</b-field>
                </b-table-column>
                <b-table-column label="Nom" field="name">
                    <b-field>
						<b-input v-model.trim="props.row.name"></b-input>
					</b-field>
                </b-table-column>
                <b-table-column label="Ajouter">
                    <a class="button is-info"
                        @click="addIngredient(stepIndex)"
                        title="Ajouter un ingrédient">Ajouter</a>
                </b-table-column>
                <b-table-column label="Supprimer">
                    <a class="button is-danger"
                        @click="deleteIngredient(props.index, stepIndex)"
                        :title="`Supprimer cette ingredient (${props.row.name})`">Supprimer</a>
                </b-table-column>
            </template>
        </b-table>

    </div>
</template>

<script>
export default {
	props: {
        columns: Array,
        recipe: Object,
        stepIndex: Number
	},
    computed: {
        getIngredients() {
            if (this.stepIndex || this.stepIndex === 0) {
                return this.recipe.ingredients[this.stepIndex].step
            } else {
                return this.recipe.ingredients
            }
        }
    }, 
    methods: {
		addIngredient(index) {
			this.$emit('addIngredient', index)
		},
		deleteIngredient(index, stepIndex) {
			this.$emit('deleteIngredient', { index, stepIndex })
		}
    }
}
</script>