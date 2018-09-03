<template>
	<div>
		<navigation :isConnected="isConnected" />
		<SubMenu v-if="this.$route.name !== 'home'" :title="title" />
		<b-notification type="is-warning" v-if="message">
			Oups... il semblerait qu'il y ait un problème avec l'API et / ou la BDD
		</b-notification>
		<router-view
			:isConnected="isConnected"
			:userId="userId"
			:firstname="firstname"
			title="">
		</router-view>
		<copyright />
	</div>
</template>

<script>
import Navigation from '@/components/layout/Navigation'
import SubMenu from '@/components/layout/SubMenu'
import Copyright from '@/components/layout/Copyright'
import { EventBus } from '@/event-bus.js'

export default {
    metaInfo: {
		titleTemplate: '%s - Gitfood'
    },
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
			firstname: 'Toto',
			message: false,
			title: '',
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
			//self.toast = value
			self.snackbar(value)
		})

		EventBus.$on('message', value => {
			self.message = value
		})

		EventBus.$on('title', value => {
			self.title = value
		})
	}
}
</script>