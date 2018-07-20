<template>
	<nav class="navbar is-transparent">

		<div class="navbar-brand">
			<router-link class="navbar-item" to="/">GitFood</router-link>
			<div @click="isActive"
				:class="{ 'is-active': !active }"
				class="navbar-burger burger"
				data-target="navMenu"
				aria-label="menu"
				aria-expanded="false">
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>

		<div id="navMenu" :class="{ 'is-active': !active }" class="navbar-menu">
			<div class="navbar-start" v-if="isConnected">
				<div class="navbar-item has-dropdown is-hoverable">
					<a class="navbar-link">Menu</a>
					<div class="navbar-dropdown is-boxed">
						<router-link class="navbar-item" :to="{ name: 'addRecipe' }">
							Ajouter une recette
						</router-link>
						<router-link class="navbar-item" :to="{ name: 'myRecipes' }">
							Mes recettes
						</router-link>
						<a class="navbar-item">
							Mes recettes favorites
						</a>
						<router-link class="navbar-item" :to="{ name: 'myComments'}">
							Mes commentaires
						</router-link>
					</div>
				</div>
			</div>

			<div class="navbar-end" v-if="isConnected">
				<div class="navbar-item has-dropdown is-hoverable">
					<a class="navbar-link">Mon compte</a>
					<div class="navbar-dropdown is-boxed">
						<a class="navbar-item">
							Modifier mon profil
						</a>
						<a class="navbar-item" @click="changePassword = true">
							Changer mot de passe
						</a>
						<a class="navbar-item" @click="logout()">
							Déconnexion
						</a>
					</div>
				</div>
			</div>

			<div class="navbar-end" v-if="!isConnected">
				<div class="navbar-item">
					<div class="field is-grouped">
						<p class="navbar-item">
							<a @click="isModaleLogin = true, connection = true">Connexion</a>
						</p>
						<p class="navbar-item">
							<a @click="isModaleLogin = true, connection = false">Inscription</a>
						</p>
					</div>
				</div>
			</div>
		</div>

		<b-modal :active.sync="changePassword" width="640" has-modal-card>
			<div class="modal-card" style="width: auto">
				<form>
					<header class="modal-card-head">
						<h1>Changer mon mot de passe</h1>
					</header>
					<section class="modal-card-body">
						<b-field label="Old Password">
							<b-input type="password"></b-input>
						</b-field>
						<b-field label="New Password">
							<b-input type="password"></b-input>
						</b-field>
						<b-field label="Confirm Password">
							<b-input type="password"></b-input>
						</b-field>
					</section>
					<footer class="modal-card-foot">
						<input type="submit" class="button is-primary" value="Modifier">
					</footer>
				</form>
			</div>
		</b-modal>

		<b-modal :active.sync="isModaleLogin" width="640" has-modal-card>
			<div class="modal-card" style="width: auto">
				<form>
					<header class="modal-card-head">
						<b-switch v-model="connection">
							<span v-if="connection">Connexion</span>
							<span v-else>Inscription</span>
						</b-switch>
					</header>
					<section class="modal-card-body">
						<b-field label="Email">
							<b-input type="email"></b-input>
						</b-field>
						<b-field label="Password">
							<b-input type="password"></b-input>
						</b-field>
						<b-field label="Confirm Password" v-if="!connection">
							<b-input type="password"></b-input>
						</b-field>
					</section>
					<footer class="modal-card-foot">
						<input type="submit" class="button is-primary" :value="connection ? 'Se connecter' : 'S\'inscrire'">
						<a v-if="connection">Mot de passe oublié</a>
					</footer>
				</form>
			</div>
		</b-modal>

	</nav>
</template>

<script>
import { EventBus } from '@/event-bus.js'

export default {
	props: {
		isConnected: Boolean
	},
	data() {
		return {
			changePassword: false,
			isModaleLogin: false,
			connection: false,
			active: true
		}
	},
	methods: {
		isActive() {
			if (!this.active) {
				this.active = true
			} else {
				this.active = false
			}
		},
		logout() {
			EventBus.$emit('logout', false)
            this.$root.$router.push({
				name: 'home'
            })
		}
	}
}
</script>