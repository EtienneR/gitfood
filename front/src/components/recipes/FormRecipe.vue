<template>
  <section class="section">

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
          <!-- Début Partie 2 -->
          <hr />
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
            <table class="table is-fullwidth">
              <thead>
                <tr>
                  <th>Quantité</th>
                  <th>Mesure</th>
                  <th>Nom</th>
                  <th>Ajouter</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(step, s) in ingredient.step" :key="s">
                  <td>
                    <b-field>
                      <b-input v-model.number="step.quantity" type="number" min="0"></b-input>
                    </b-field>
                  </td>
                  <td>
                    <b-field>
                      <b-input v-model.trim="step.mesure"></b-input>
                    </b-field>
                  </td>
                  <td>
                    <b-field>
                      <b-input v-model.trim="step.name"></b-input>
                    </b-field>
                  </td>
                  <td>
                    <button class="button is-info" @click="addIngredient(index)">Ajouter</button>
                  </td>
                  <td>
                    <button class="button is-danger" @click="deleteIngredient(s, index)">Supprimer</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button v-if="steps" class="button is-info" @click="addStep">Ajouter une étape</button>
          <table v-if="!steps" class="table is-fullwidth">
            <thead>
              <tr>
                <th>Quantité</th>
                <th>Mesure</th>
                <th>Nom</th>
                <th>Ajouter</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(ingredient, index) in recette.ingredients" :key="index">
                <td>
                  <b-field>
                    <b-input v-model.number="ingredient.quantity" type="number" min="0"></b-input>
                  </b-field>
                </td>
                <td>
                  <b-field>
                    <b-input v-model.trim="ingredient.mesure"></b-input>
                  </b-field>
                </td>
                <td>
                  <b-field>
                    <b-input v-model.trim="ingredient.name"></b-input>
                  </b-field>
                </td>
                <td>
                  <button class="button is-info" @click="addIngredient">Ajouter</button>
                </td>
                <td>
                  <button class="button is-danger" @click="deleteIngredient(index)">Supprimer</button>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- Fin Partie 2 -->
          <!-- Début Partie 3 -->
          <hr />
          <legend class="title is-6">Partie 3 : Instructions</legend>
          <div v-if="steps" v-for="(instruction, index) in recette.instructions" :key="`${index}-instructions`">
            <div class="field">
              <a @click="deleteStep(index)">Delete</a>
            </div>
            <b-field :label="`Titre de l'étape ${index + parseInt(1)}`">
              <b-input v-model.trim="recette.instructions[index].title"></b-input>
            </b-field>
            <table class="table is-fullwidth">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Ajouter</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(step, s) in instruction.step" :key="s">
                  <td>
                    <input class="input"
                      type="text"
                      v-model="step.name">
                  </td>
                  <td>
                    <button class="button is-info" @click="addInstruction(index)">Ajouter</button>
                  </td>
                  <td>
                    <button class="button is-danger" @click="deleteInstruction(s, index)">Supprimer</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <table v-if="!steps" class="table is-fullwidth">
            <thead>
              <tr>
                <th>Etape</th>
                <th>Ajouter</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(instruction, index) in recette.instructions" :key="index">
                <td>
                  <b-field>
                    <b-input v-model="instruction.name" type="textarea"></b-input>
                  </b-field>
                </td>
                <td>
                  <button class="button is-info" @click="addInstruction">Ajouter</button>
                </td>
                <td>
                  <button class="button is-danger" @click="deleteInstruction(index)">Supprimer</button>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- Fin Partie 3 -->
          <!-- Début Partie 4 -->
          <hr />
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
        <legend>Prévisualisation de votre recette</legend>
        <h2 class="title is-2">{{ recette.name }}</h2>
        <p>{{ recette.introduction }}</p>
        <div v-if="recette.ingredients[0] && recette.ingredients[0].name">
          <h3 class="title is-3">Ingrédients</h3>
          <ul>
            <li v-for="(ingredient, index) in recette.ingredients" :key="index">
              <span v-if="ingredient.title">
                <h4>{{ ingredient.title }}</h4>
                <ul>
                  <li v-for="(i, index) in ingredient.step" :key="index">
                    {{ i.quantity }} {{ i.mesure }} {{ i.name }}
                  </li>
                </ul>
              </span>
              <span v-else>
                {{ ingredient.quantity }} {{ ingredient.mesure }} {{ ingredient.name }}
              </span>
            </li>
          </ul>
        </div>
        <div v-if="recette.instructions[0].name || recette.instructions[0].title">
          <h3 class="title is-3">Instructions</h3>
          <ol>
            <li v-for="(instruction, index) in recette.instructions" :key="index">
              <span v-if="instruction.title">
                <h4 class="title is-4">{{ instruction.title }}</h4>
                <ol>
                  <li v-for="(a, index) in instruction.step" :key="index">{{ a.name }}</li>
                </ol>
              </span>
              <span v-else>
              {{ instruction.name }}
              </span>
            </li>
          </ol>
        </div>
        <br />
        <p>{{ recette.conclusion }}</p>
      </div>
    </div>

  </section>
</template>

<script>
import api from '@/services/Api'
import { EventBus } from '@/event-bus.js'

export default {
  name: 'FormRecipe',
  metaInfo() {
    return {
      title: this.$route.params.id ? 'Modifier une recette' : 'Ajouter une recette'
    }
  },
	props: {
		isConnected: Boolean,
    userId: Number
	},
  data() {
    return {
      recette: {
        name: '',
        introduction: '',
        ingredients: [{ quantity: '', mesure: '', name: '' }],
        instructions: [{ name: '' }],
        published: false,
        conclusion: ''
      },
      steps: false
    }
  },
  created() {
    if (this.$route.params.id) {
      return api.getRecipe(this.$route.params.id)
      .then((res) => {
        this.recette = res.data
        if (!res.data.instructions[0].name) {
          this.steps = true
        }
      })
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
  methods: {
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
    deleteIngredient(index, index2) {
      if (!this.steps) {
        this.recette.ingredients.splice(index, 1)
        if (index === 0) {
          this.addIngredient()
        }
      } else {
        this.recette.ingredients[index2].step.splice(index, 1)
        if (index === 0) {
          this.addIngredient(index)
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
    deleteInstruction(index, index2) {
      if (!this.steps) {
        this.recette.instructions.splice(index, 1)
        if (index === 0) {
          this.addInstruction()
        }
      } else {
        this.recette.instructions[index2].step.splice(index, 1)
        if (index === 0) {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
