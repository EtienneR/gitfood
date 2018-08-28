<template>
	<div>

		<Loading :loading="loading" />

		<div v-if="!loading">
			<Header :title="currentPage" :subtitle="staticName" />

			<section class="section">
				<div class="container">

					<div class="columns">
						<div class="column is-two-thirds">
							<form action="javascript:void(0);" method="POST">
								<!-- Début Partie 1 -->
								<legend class="title is-6">Partie 1</legend>
								<b-field label="Titre" label-for="name">
									<b-input v-model.trim="recette.name" id="name"></b-input>
								</b-field>
								<b-field label="Introduction" label-for="introduction">
									<b-input v-model.trim="recette.introduction" id="introduction" type="textarea"></b-input>
								</b-field>
								<!-- Fin Partie 1 -->
								<hr />
								<!-- Début Partie 2 -->
								<legend class="title is-6">Partie 2 : Ingrédients</legend>
								<p>Votre recette comporte plusieurs étapes ?</p>
								<div class="field">
									<b-switch v-model="steps">
										<span v-if="steps">Oui</span>
										<span v-else>Non</span>
									</b-switch>
								</div>

								<div v-if="steps" v-for="(ingredient, index) in recette.ingredients" :key="`${index}-ingredients`">
									<div class="field">
										<a @click="deleteStep(index)">Delete</a>
									</div>
									<b-field :label="`Titre de l'étape ${index + parseInt(1)}`">
										<b-input v-model.trim="recette.ingredients[index].title"></b-input>
									</b-field>
									<Ingredients
										v-if="steps"
										:stepIndex="index"
										:recipe="recette"
										:columns="columnsIngredients"
										@addIngredient="addIngredient"
										@deleteIngredient="deleteIngredient" />
								</div>
								<button v-if="steps" class="button is-info" @click="addStep">Ajouter une étape</button>
								<Ingredients
									v-if="!steps"
									:recipe="recette"
									:columns="columnsIngredients"
									@addIngredient="addIngredient"
									@deleteIngredient="deleteIngredient" />
								<!-- Fin Partie 2 -->
								<hr />
								<!-- Début Partie 3 -->
								<legend class="title is-6">Partie 3 : Instructions</legend>
								<div v-if="steps" v-for="(instruction, index) in recette.instructions" :key="`${index}-instructions`">
									<div class="field">
										<a @click="deleteStep(index)">Delete</a>
									</div>
									<b-field :label="`Titre de l'étape ${index + parseInt(1)}`">
										<b-input v-model.trim="recette.instructions[index].title"></b-input>
									</b-field>
								<Instructions
									v-if="steps"
									:stepIndex="index"
									:recipe="recette"
									:columns="columnsInstructions"
									@addInstruction="addInstruction"
									@deleteInstruction="deleteInstruction" />
								</div>
								<Instructions
									v-if="!steps"
									:recipe="recette"
									:columns="columnsInstructions"
									@addInstruction="addInstruction"
									@deleteInstruction="deleteInstruction" />
								<!-- Fin Partie 3 -->
								<hr />
								<!-- Début Partie 4 -->
								<legend class="title is-6">Partie 4 : Conclusion et validation</legend>
								<b-field label="Conclusion" label-for="conclusion">
									<b-input v-model="recette.conclusion" id="conclusion" type="textarea"></b-input>
								</b-field>
								<div class="field">
									<b-switch v-model="recette.published">
										<span v-if="recette.published">Publier</span>
										<span v-else>Brouillon</span>
									</b-switch>
								</div>
								<input type="submit" class="button is-primary" @click="save" value="Enregistrer">
							</form>
						</div>

						<div class="column">
							<Preview :recipe="recette" />
						</div>
					</div>
				</div>
			</section>
		</div>

	</div>
</template>

<script>
import api from '@/services/Api'
import { EventBus } from '@/event-bus.js'
import Loading from '@/components/Loading'
import Header from '@/components/layout/Header'
import Ingredients from '@/components/recipes/includes/form/table/Ingredients'
import Instructions from '@/components/recipes/includes/form/table/Instructions'
import Preview from '@/components/recipes/includes/form/Preview'

export default {
    components: {
		Loading,
		Header,
		Ingredients,
		Instructions,
		Preview
    },
	metaInfo() {
		return {
			title: this.currentPage
		}
	},
	props: {
		isConnected: Boolean,
		userId: Number
	},
	data() {
		return {
			loading: false,
			staticName: '',
			recette: {
				name: '',
				introduction: '',
				ingredients: [{ quantity: '', mesure: '', name: '' }],
				instructions: [{ name: '' }],
				published: false,
				conclusion: ''
			},
			steps: false,
			columnsIngredients: [
				{
					field: 'quantity',
					label: 'Quantité'
				},
				{
					field: 'mesure',
					label: 'Mesure'
				},
				{
					field: 'name',
					label: 'Nom'
				}
			],
			columnsInstructions: [
				{
					field: 'name',
					label: 'Nom'
				}
			]
		}
	},
	computed: {
		currentPage() {
			if (this.$route.params.id) {
				return 'Modifier la recette'
			} else {
				return 'Ajouter une recette'
			}
		}
	},
	async created() {
		if (this.$route.params.id) {
			this.getRecipe()
		}
	},
	methods: {
		async getRecipe() {
			this.loading = true
			await api.getRecipe(this.$route.params.id)
			.then((res) => {
				this.recette = res.data
				this.staticName = res.data.name
				if (!res.data.instructions[0].name) {
					this.steps = true
				}
				this.loading = false
			})
		},
		emitGlobalClickEvent() {
			this.message = 'Recette ajoutée'
			EventBus.$emit('toast', this.message)
			this.$root.$router.push({
				name: 'myRecipes'
			})
		},
		addIngredient(index) {
			if (!this.steps) {
				this.recette.ingredients.push({ quantity: '', mesure: '', name: '' })
			} else {
				this.recette.ingredients[index].step.push({ quantity: '', mesure: '', name: '' })
			}
		},
		deleteIngredient({ index, stepIndex }) {
			if (!this.steps) {
				this.recette.ingredients.splice(index, 1)
				if (this.recette.ingredients.length === 0) {
					this.addIngredient()
				}
			} else {
				this.recette.ingredients[stepIndex].step.splice(index, 1)
				if (this.recette.ingredients[stepIndex].step.length === 0) {
					this.addIngredient(stepIndex)
				}
			}
		},
		switchIngredients() {
			if (this.steps) {
				this.recette.ingredients = [{ quantity: '', mesure: '', name: '' }]
				this.recette.instructions = [{ name : '' }]
			} else {
				this.recette.ingredients = [{ title: '', step: [{ quantity: '', mesure: '', name: '' }] }]
				this.recette.instructions = [{ title: '', step: [{ name: '' }] }]
			}
		},
		addStep() {
			this.recette.ingredients.push({ title: '', step: [{ quantity: '', mesure: '', name: '' }] })
			this.recette.instructions.push({ title: '', step: [{ name: '' }] })
		},
		deleteStep(index) {
			const ingredients = this.recette.ingredients
			const ingredient = ingredients.indexOf(ingredients[index])
			ingredients.splice(ingredient, 1)

			const instructions = this.recette.instructions
			const instruction = instructions.indexOf(instructions[index])
			instructions.splice(instruction, 1) 

			if (index === 0) {
				this.addStep()
			}
		},
		addInstruction(index) {
			if (!this.steps) {
				this.recette.instructions.push({ name: '' })
			} else {
				this.recette.instructions[index].step.push({ name: '' })
			}
		},
		deleteInstruction({ index, stepIndex }) {
			if (!this.steps) {
				this.recette.instructions.splice(index, 1)
				if (this.recette.instructions.length === 0) {
					this.addInstruction()
				}
			} else {
				this.recette.instructions[stepIndex].step.splice(index, 1)
				if (this.recette.instructions[stepIndex].step.length === 0) {
					this.addInstruction(index)
				}
			}
		},
		save() {
			if (this.$route.name === 'editRecipe') {
				return api.updateRecipe(this.$route.params.id, this.recette)
					.then(() => {
						EventBus.$emit('toast', 'Recette modifiée')
						this.$root.$router.push({
							name: 'myRecipes'
						})
					})
			} else {
				if (this.$route.name === 'forkRecipe') {
				this.recette.id_parent = this.recette.user_id
				}
				this.recette.user_id = this.userId
				return api.addRecipe(this.recette, { user_id: this.userId })
					.then(() => {
						EventBus.$emit('toast', 'Recette ajoutée')
						this.$root.$router.push({
							name: 'myRecipes'
						})
				})
			}
		}
	}
}
</script>