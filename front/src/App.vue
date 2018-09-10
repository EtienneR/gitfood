<template>
	<div>

        <vue-headful :title="getTitle" />
		<navigation :isConnected="isConnected" />
		<SubMenu v-if="this.$route.name !== 'home' && breadcrumb" :title="breadcrumb" />
		<b-notification type="is-warning" v-if="message">
			Oups... il semblerait qu'il y ait un problème avec l'API et / ou la BDD
		</b-notification>
		<router-view 
			:isConnected="isConnected"
			:userId="userId"
			:firstname="firstname">
		</router-view>
		<copyright v-if="getTitle"/>

	</div>
</template>

<script>
import Navigation from '@/components/layout/Navigation'
import SubMenu from '@/components/layout/SubMenu'
import Copyright from '@/components/layout/Copyright'
import { EventBus } from '@/event-bus.js'

export default {
	components: {
		Navigation,
		SubMenu,
		Copyright
	},
	data() {
		return {
			loading: false,
			isConnected: false,
			userId: 1,
			firstname: 'Pierre',
			message: false,
			title: '',
			breadcrumb: ''
		}
	},
	computed: {
		getTitle() {
			if (this.breadcrumb.length > 0) {
				return this.title + ' - Gitfood'
			} else {
				return this.title
			}
		}
	},
	methods: {
		snackbar(value) {
			this.$snackbar.open({
				duration: 5000,
				position: 'is-top',
				message: value,
				action: 'OK'
			})
		}
	},
	created() {
		const self = this
		EventBus.$on('logout', value => {
			self.isConnected = value
		})

		EventBus.$on('toast', value => {
			self.snackbar(value)
		})

		EventBus.$on('message', value => {
			self.message = value
		})

		EventBus.$on('title', value => {
			self.title = value
		})

		EventBus.$on('breadcrumb', value => {
			self.breadcrumb = value
		})
	}
}
</script>