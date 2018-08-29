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
								<b-field label="Titre" label-for="name">
										<b-input v-model.trim="recette.name" id="name"></b-input>
									</b-field>
										<p>Votre recette comporte plusieurs étapes ?</p>
										<div class="field">
											<b-switch v-model="steps">
												<span v-if="steps">Oui</span>
												<span v-else>Non</span>
											</b-switch>
										</div>
								<b-tabs
									position="is-centered"
									class="block"
									:animated="false" >
									<b-tab-item label="Introduction">
										<!-- Début Partie 1 -->
										<b-field label="Introduction" label-for="introduction">
											<b-input v-model.trim="recette.introduction" id="introduction" type="textarea"></b-input>
										</b-field>
									</b-tab-item>
									<!-- Fin Partie 1 -->

									<!-- Début Partie 2 -->
									<b-tab-item label="Ingrédients">
										<div
											v-if="steps"
											v-for="(ingredient, index) in recette.ingredients"
											:key="`${index}-ingredients`">
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
												@dupplicateIngredient="dupplicateIngredient"
												@deleteIngredient="deleteIngredient" />
										</div>
										<button v-if="steps" class="button is-info" @click="addStep">Ajouter une étape</button>
										<Ingredients
											v-if="!steps"
											:recipe="recette"
											:columns="columnsIngredients"
											@addIngredient="addIngredient"
											@dupplicateIngredient="dupplicateIngredient"
											@deleteIngredient="deleteIngredient" />
									</b-tab-item>
									<!-- Fin Partie 2 -->

									<!-- Début Partie 3 -->
									<b-tab-item label="Instructions">
										<div 
											v-if="steps"
											v-for="(instruction, index) in recette.instructions"
											:key="`${index}-instructions`">
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
									</b-tab-item>
									<!-- Fin Partie 3 -->

									<!-- Début Partie 4 -->
									<b-tab-item label="Conclusion">
										<b-field label="Conclusion" label-for="conclusion">
											<b-input v-model="recette.conclusion" id="conclusion" type="textarea"></b-input>
										</b-field>
									</b-tab-item>
								</b-tabs>
								<div class="field">
									<b-switch v-model="recette.published">
										<span v-if="recette.published">Publier</span>
										<span v-else>Brouillon</span>
									</b-switch>
								</div>

								<div class="field is-grouped">
									<p class="control">
										<input type="submit"
											class="button is-primary is-outlined"
											@click="save(false)"
											value="Enregistrer">
									</p>
									<p class="control">
										<input type="submit"
											class="button is-primary"
											@click="save(true)"
											value="Enregistrer et quitter">
									</p>
								</div>

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
			return this.$route.params.id ? 'Modifier la recette' : 'Ajouter une recette'
		}
	},
	async created() {
		if (this.$route.params.id) {
			this.getRecipe()
		}
		EventBus.$emit('title', this.currentPage)
	},
	methods: {
		async getRecipe() {
			this.loading = true
			await api.getRecipe(this.$route.params.id)
			.then(res => {
				this.recette = res.data
				this.staticName = res.data.name
				if (!res.data.instructions[0].name) {
					this.steps = true
				}
				this.loading = false
			})
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

			if (!this.steps && index === 0) {
				this.addStep()
			}

			if (this.steps && (ingredients.length === 0 && instructions.length === 0)) {
				this.addStep()
			}
		},
		addIngredient(index, step) {
			const item = [{ quantity: '', mesure: '', name: '' }]
			if (!this.steps) {
				this.recette.ingredients.splice(index+1, 0, item)
			} else {
				this.recette.ingredients[step].step.splice(index+1, 0, item)
			}
		},
		dupplicateIngredient(index, item) {
			if (!this.steps) {
				this.recette.ingredients.splice(index, 0, item)
			}
		},
		deleteIngredient(ingredients, stepIndex) {
			if (!this.steps) {
				this.recette.ingredients = this.arrayDiff(this.recette.ingredients, ingredients)
				if (this.recette.ingredients.length === 0) {
					this.addIngredient(0)
				}
			} else {
				this.recette.ingredients[stepIndex].step = this.arrayDiff(this.recette.ingredients[stepIndex].step, ingredients)
				if (this.recette.ingredients[stepIndex].step.length === 0) {
					this.addIngredient(0, stepIndex)
				}
			}
		},
		addInstruction(index) {
			if (!this.steps) {
				this.recette.instructions.push({ name: '' })
			} else {
				this.recette.instructions[index].step.push({ name: '' })
			}
		},
		deleteInstruction(instructions, stepIndex) {
			if (!this.steps) {
				this.recette.instructions = this.arrayDiff(this.recette.instructions, instructions)
			} else {
				this.recette.instructions[stepIndex].step = this.arrayDiff(this.recette.instructions[stepIndex].step, instructions)
			}
		},
		arrayDiff(a, b) {
			let diffIndexes = []
			return a.filter(i => {
				if (b.indexOf(i) < 0) {
					diffIndexes.push(a.indexOf(i))
					return true
				}
			})
		},
		async save(exit) {
			if (this.$route.name === 'editRecipe') {
				return await api.updateRecipe(this.$route.params.id, this.recette)
				.then(() => {
					EventBus.$emit('toast', `Recette ${this.recette.name} modifiée`)
					if (exit) {
						this.$root.$router.push({
							name: 'myRecipes'
						})
					}
				})
			} else {
				if (this.$route.name === 'forkRecipe') {
					this.recette.id_parent = this.recette.user_id
				}
				this.recette.user_id = this.userId
				return await api.addRecipe(this.recette, { user_id: this.userId })
				.then(() => {
					EventBus.$emit('toast', `Recette ${this.recette.name} ajoutée`)
					if (exit) {
						this.$root.$router.push({
							name: 'myRecipes'
						})
					}
				})
			}
		}
	}
}
</script>