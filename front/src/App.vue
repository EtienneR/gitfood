<template>
	<div>

		<navigation :isConnected="isConnected" />
		<router-view
			:isConnected="isConnected"
			:userId="userId"
			:firstname="firstname">
		</router-view>
		<copyright :loading="loading" />

	</div>
</template>

<script>
import Navigation from './components/layout/Navigation.vue'
import Copyright from './components/layout/Copyright.vue'
import { EventBus } from '@/event-bus.js'

export default {
    metaInfo: {
		titleTemplate: '%s - Gitfood'
    },
	components: {
		Navigation,
		Copyright
	},
	data() {
		return {
			isConnected: true,
			userId: 2,
			firstname: 'Toto',
			loading: false
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
		let self = this
		EventBus.$on('toast', function (value) {
			self.toast = value
			self.snackbar(value)
		})
		EventBus.$on('logout', function (value) {
			self.isConnected = value
		})
	}
}
</script>