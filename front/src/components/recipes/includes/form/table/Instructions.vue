<template>
    <div>

        <b-table :data="getInstructions" hoverable>
            <template slot-scope="props">
                <b-table-column label="Etape" field="name">
                    <b-field>
						<b-input v-model.trim="props.row.name" type="textarea"></b-input>
					</b-field>
                </b-table-column>
                <b-table-column label="Ajouter">
                    <a class="button is-info"
                        @click="addInstruction(stepIndex)"
                        title="Ajouter une instruction">Ajouter</a>
                </b-table-column>
                <b-table-column label="Supprimer">
                    <a class="button is-danger"
                        @click="deleteInstruction(props.index, stepIndex)"
                        :title="`Supprimer cette instruction`">Supprimer</a>
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
        getInstructions() {
            if (this.stepIndex || this.stepIndex === 0) {
                return this.recipe.instructions[this.stepIndex].step
            } else {
                return this.recipe.instructions
            }
        }
    }, 
    methods: {
		addInstruction(index) {
			this.$emit('addInstruction', index)
		},
		deleteInstruction(index, stepIndex) {
			this.$emit('deleteInstruction', { index, stepIndex })
		}
    }
}
</script>