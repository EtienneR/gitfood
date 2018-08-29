<template>
    <div>

        <a v-if="checkedRows.length > 0" 
            class="button is-danger is-outlined"
            @click="deleteIngredient(stepIndex)"
            title="Supprimer ce ou ces ingredient(s)">
            Supprimer
        </a>

        <b-table :data="getIngredients"
            hoverable
            checkable
            :checked-rows.sync="checkedRows"
            striped>
            <template slot-scope="props">
                <b-table-column label="Quantité" field="quantity" width="30">
                    <b-field>
						<b-input v-model.number="props.row.quantity" type="number" min="0"></b-input>
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
                    <a class="button is-info is-outlined"
                        @click="addIngredient(props.index, stepIndex)"
                        title="Ajouter un ingrédient à la suite">Ajouter</a>
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
	data() {
		return {
            checkedRows: []
        }
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
		addIngredient(index, stepIndex) {
			this.$emit('addIngredient', index, stepIndex)
		},
        dupplicateIngredient(index, ingredient) {
            this.$emit('dupplicateIngredient', index, ingredient)
        },
		// deleteIngredient(index, stepIndex) {
		// 	this.$emit('deleteIngredient', { index, stepIndex })
		// }
        deleteIngredient(stepIndex) {
            this.$emit('deleteIngredient', this.checkedRows, stepIndex)
            this.checkedRows = []
        }
    }
}
</script>