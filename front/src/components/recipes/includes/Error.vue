<template>
    <div>

        <Header :title="message.title" :subtitle="message.content" />

    </div>
</template>

<script>
import { EventBus } from '@/event-bus.js'
import Header from '@/components/layout/Header.vue'

export default {
    components: {
		Header
    },
	props: {
		message: Object,
	},
	data() {
		return {
			title: 'Erreur 404 sur cette recette'
		}
	},
	metaInfo() {
		return {
			title: this.title
		}
	},
    created () {
        EventBus.$emit('title', this.title)
    }
}
</script>