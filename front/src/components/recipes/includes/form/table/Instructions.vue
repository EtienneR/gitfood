<template>
    <div>

        <a v-if="checkedRows.length > 0" 
            class="button is-danger is-outlined"
            @click="deleteInstruction(stepIndex)"
            title="Supprimer cette ou ces instruction(s)">Supprimer
        </a>

        <b-table
            :data="getInstructions"
            checkable
            :checked-rows.sync="checkedRows"
            hoverable
            striped>
            <template slot-scope="props">
                <b-table-column label="Etape" field="name" width="700">
                    <b-field>
						<b-input v-model.trim="props.row.name" type="textarea"></b-input>
					</b-field>
                </b-table-column>
                <b-table-column label="Actions">
                    <a class="button is-fullwidth is-info is-outlined"
                        @click="addInstruction(stepIndex)"
                        title="Ajouter une instruction">Ajouter</a><br />
                </b-table-column>
            </template>
        </b-table>

    </div>
</template>

<script>
export default {
	props: {
        instructions: Array,
        stepIndex: Number
	},
	data() {
		return {
            checkedRows: []
        }
    },
    computed: {
        getInstructions() {
            return this.instructions
        }
    }, 
    methods: {
		addInstruction(index) {
			this.$emit('addInstruction', index)
		},
        deleteInstruction(stepIndex) {
            this.$emit('deleteInstruction', this.checkedRows, stepIndex)
            this.checkedRows = []
        }
    }
}
</script>