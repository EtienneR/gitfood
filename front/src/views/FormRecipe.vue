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
									<b-input v-model.trim="recipe.name" id="name"></b-input>
								</b-field>

								<div v-if="!this.$route.name === 'editRecipe'">
									<p>Votre recette comporte plusieurs étapes ?</p>
									<div class="field">
										<b-switch v-model="steps" @input="changeMe">
											<span v-if="steps">Oui</span>
											<span v-else>Non</span>
										</b-switch>
									</div>
								</div>

								<b-tabs position="is-centered"
									class="block"
									:animated="false">
									<!-- Début Partie 1 -->
									<b-tab-item label="Introduction">
										<b-field label="Introduction" label-for="introduction">
											<b-input v-model.trim="recipe.introduction"
												id="introduction"
												type="textarea">
											</b-input>
										</b-field>
									</b-tab-item>
									<!-- Fin Partie 1 -->

									<!-- Début Partie 2 -->
									<b-tab-item label="Image">
									<img :src="`${imgUrl}/${recipe.image}`" alt="Aperçu non disponible" />
									</b-tab-item>
									<!-- Fin Partie 2 -->

									<!-- Début Partie 3 -->
									<b-tab-item label="Ingrédients">
										<div v-if="steps"
											v-for="(ingredient, index) in recipe.ingredients"
											:key="`${index}-ingredients`">
											<div class="field">
												<a @click="deleteStep(index)">Delete</a>
											</div>
											<b-field :label="`Titre de l'étape ${index + parseInt(1)}`">
												<b-input v-model.trim="recipe.ingredients[index].title"></b-input>
											</b-field>
											<Ingredients v-if="steps"
												:stepIndex="index"
												:ingredients="recipe.ingredients[index].step"
												@addIngredient="addIngredient"
												@deleteIngredient="deleteIngredient" />
										</div>
										<button v-if="steps"
											class="button is-info"
											@click="addStep">
											Ajouter une étape
										</button>
										<Ingredients v-if="!steps"
											:ingredients="recipe.ingredients"
											@addIngredient="addIngredient"
											@deleteIngredient="deleteIngredient" />
									</b-tab-item>
									<!-- Fin Partie 3 -->

									<!-- Début Partie 4 -->
									<b-tab-item label="Instructions">
										<div v-if="steps"
											v-for="(instruction, index) in recipe.instructions"
											:key="`${index}-instructions`">
											<div class="field">
												<a @click="deleteStep(index)">Delete</a>
											</div>
											<b-field :label="`Titre de l'étape ${index + parseInt(1)}`">
												<b-input v-model.trim="recipe.instructions[index].title"></b-input>
											</b-field>
											<Instructions v-if="steps"
												:stepIndex="index"
												:instructions="recipe.instructions[index].step"
												@addInstruction="addInstruction"
												@deleteInstruction="deleteInstruction" />
										</div>
										<Instructions v-if="!steps"
											:instructions="recipe.instructions"
											@addInstruction="addInstruction"
											@deleteInstruction="deleteInstruction" />
									</b-tab-item>
									<!-- Fin Partie 4 -->

									<!-- Début Partie 5 -->
									<b-tab-item label="Conclusion">
										<b-field label="Conclusion" label-for="conclusion">
											<b-input v-model="recipe.conclusion"
												id="conclusion"
												type="textarea">
											</b-input>
										</b-field>
									</b-tab-item>
									<!-- Fin Partie 5 -->
								</b-tabs>

								<div class="field">
									<b-switch v-model="recipe.published">
										<span v-if="recipe.published">Publier</span>
										<span v-else>Brouillon</span>
									</b-switch>
								</div>

								<div class="field is-grouped">
									<p class="control">
										<input
											type="submit"
											class="button is-primary is-outlined"
											@click="save(false)"
											value="Enregistrer">
									</p>
									<p class="control">
										<input
											type="submit"
											class="button is-primary"
											@click="save(true)"
											value="Enregistrer et quitter">
									</p>
								</div>
							</form>
						</div>

						<div class="column">
							<Preview :recipe="recipe" />
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
	props: {
		isConnected: Boolean,
		userId: Number
	},
	data() {
		return {
			loading: false,
			staticName: '',
			recipe: {
				name: '',
				image: 'food.jpg',
				introduction: '',
				ingredients: [{ quantity: '', mesure: '', name: '' }],
				instructions: [{ name: '' }],
				conclusion: '',
				published: false
			},
			steps: false,
			saveAndUpdate: false,
			idSaveAndUpdate: 0
		}
	},
	computed: {
		currentPage() {
			return this.$route.params.id ? 'Modifier la recette' : 'Ajouter une recette'
		},
        imgUrl() {
            return `http://${window.location.hostname}:3000/img`
        }
	},
	async created() {
		if (this.$route.params.id) {
			this.getRecipe()
		}

		EventBus.$emit('title', this.currentPage)
		EventBus.$emit('breadcrumb', this.currentPage)
	},
	methods: {
		changeMe() {
			if (this.steps) {
				this.recipe.ingredients = []
				this.recipe.instructions = []
				this.addStep()
			}
		},
		async getRecipe() {
			this.loading = true
			await api.getRecipe(this.$route.params.id)
			.then(res => {
				this.recipe = res.data
				this.staticName = res.data.name
				if (!res.data.instructions[0].name) {
					this.steps = true
				}
				this.loading = false
			})
		},
		addStep() {
			this.recipe.ingredients.push({ title: '', step: [{ quantity: '', mesure: '', name: '' }] })
			this.recipe.instructions.push({ title: '', step: [{ name: '' }] })
		},
		deleteStep(index) {
			const ingredients = this.recipe.ingredients
			const ingredient = ingredients.indexOf(ingredients[index])
			ingredients.splice(ingredient, 1)

			const instructions = this.recipe.instructions
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
			const item = { quantity: '', mesure: '', name: '' }
			if (!this.steps) {
				this.recipe.ingredients.splice(index+1, 0, item)
			} else {
				this.recipe.ingredients[step].step.splice(index+1, 0, item)
			}
		},
		deleteIngredient(ingredients, stepIndex) {
			if (!this.steps) {
				this.recipe.ingredients = this.arrayDiff(this.recipe.ingredients, ingredients)
				if (this.recipe.ingredients.length === 0) {
					this.addIngredient(0)
				}
			} else {
				this.recipe.ingredients[stepIndex].step = this.arrayDiff(this.recipe.ingredients[stepIndex].step, ingredients)
				if (this.recipe.ingredients[stepIndex].step.length === 0) {
					this.addIngredient(0, stepIndex)
				}
			}
		},
		addInstruction(index) {
			if (!this.steps) {
				this.recipe.instructions.push({ name: '' })
			} else {
				this.recipe.instructions[index].step.push({ name: '' })
			}
		},
		deleteInstruction(instructions, stepIndex) {
			if (!this.steps) {
				this.recipe.instructions = this.arrayDiff(this.recipe.instructions, instructions)
			} else {
				this.recipe.instructions[stepIndex].step = this.arrayDiff(this.recipe.instructions[stepIndex].step, instructions)
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
			if (this.$route.name === 'editRecipe' || this.saveAndUpdate) {
				await api.updateRecipe(this.recipe.id, this.recipe)
				.then(() => {
					if (exit) {
						this.$root.$router.push({
							name: 'myRecipes'
						})
					}
					EventBus.$emit('toast', `Recette ${this.recipe.name} modifiée`)
				})
			} else {
				if (this.$route.name === 'forkRecipe') {
					this.recipe.id_parent = this.recipe.user_id
				}
				this.recipe.user_id = this.userId
				await api.addRecipe(this.recipe, { user_id: this.userId })
				.then(res => {
					if (exit) {
						this.$root.$router.push({
							name: 'myRecipes'
						})
					} else {
						this.saveAndUpdate = true
						this.recipe.id = res.data.id
					}
					EventBus.$emit('toast', `Recette ${this.recipe.name} ajoutée`)
				})
			}
		}
	}
}
</script>