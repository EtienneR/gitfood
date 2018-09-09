<template>
	<section>

		<nav class="navbar is-black" role="navigation" aria-label="main navigation">
			<div class="container">
				<div class="navbar-brand">
					<router-link v-if="this.$route.name !== 'home'"
						class="navbar-item"
						:to="{ name: 'home' }"
						@click.native="isActive">
						{{ title }}
					</router-link>
					<span v-else class="navbar-item">
						{{ title }}
					</span>
					<div @click="isActive"
						:class="{ 'is-active': active }"
						class="navbar-burger burger"
						data-target="navMenu"
						aria-label="menu"
						aria-expanded="false">
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
					</div>
				</div>

				<div id="navMenu" :class="{ 'is-active': active }" class="navbar-menu">
					<div class="navbar-start" v-if="isConnected">
						<div class="navbar-item has-dropdown is-hoverable">
							<a class="navbar-link">Menu</a>
							<div class="navbar-dropdown is-boxed">
								<router-link
									class="navbar-item"
									:to="{ name: 'addRecipe' }"
									@click.native="isActive">Ajouter une recette
								</router-link>
								<router-link
									class="navbar-item"
									:to="{ name: 'myRecipes' }"
									@click.native="isActive">Mes recettes
								</router-link>
								<router-link
									class="navbar-item"
									:to="{ name: 'myComments'}"
									@click.native="isActive">Mes commentaires
								</router-link>
							</div>
						</div>
					</div>

					<div class="navbar-end" v-if="isConnected">
						<div class="navbar-item has-dropdown is-hoverable">
							<a class="navbar-link">Mon compte</a>
							<div class="navbar-dropdown is-boxed">
								<a class="navbar-item">Modifier mon profil</a>
								<a class="navbar-item" @click="changePassword = true">Changer mot de passe</a>
								<a class="navbar-item" @click="logout()">Déconnexion</a>
							</div>
						</div>
					</div>

					<div class="navbar-end has-text-centered" v-if="!isConnected" id="nav-noconnected">
						<div class="navbar-item">
							<div class="field is-grouped">
								<p class="control">
									<a class="button is-info is-outlined" @click="isModaleLogin = true, connection = true">
										<span>Connexion</span>
									</a>
								</p>
								<p class="control">
									<a class="button is-info" @click="isModaleLogin = true, connection = false">
										<span>Inscription</span>
									</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>

		<b-modal :active.sync="isModaleLogin" width="640" has-modal-card>
			<div class="modal-card" style="width: auto">
				<form action="javascript:void(0);">
					<header class="modal-card-head">
						<b-switch v-model="connection">
							<span class="modal-card-title">
								<span v-if="connection">Connexion</span>
								<span v-else>Inscription</span>
							</span>
						</b-switch>
					</header>
					<section class="modal-card-body">
						<b-field label="Email">
							<b-input type="email"></b-input>
						</b-field>
						<b-field label="Password">
							<b-input type="password" password-reveal></b-input>
						</b-field>
						<b-field label="Confirm Password" v-if="!connection">
							<b-input type="password" password-reveal></b-input>
						</b-field>
					</section>
					<footer class="modal-card-foot">
						<input type="submit"
							class="button is-primary"
							:value="connection ? 'Se connecter' : `S'inscrire`"
							@click="login">
						<a v-if="connection">Mot de passe oublié</a>
					</footer>
				</form>
			</div>
		</b-modal>

		<b-modal :active.sync="changePassword" width="640" has-modal-card>
			<div class="modal-card" style="width: auto">
				<form>
					<header class="modal-card-head">
						<h1 class="modal-card-title">Changer mon mot de passe</h1>
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

	</section>
</template>

<script>
import { EventBus } from '@/event-bus.js'

export default {
	props: {
		isConnected: Boolean
	},
	data() {
		return {
			title: 'GitFood',
			changePassword: false,
			isModaleLogin: false,
			connection: false,
			active: false
		}
	},
	methods: {
		isActive() {
			!this.active ? this.active = true : this.active = false
		},
		login() {
			EventBus.$emit('logout', true)
			this.isModaleLogin = false
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

<style>

</style>