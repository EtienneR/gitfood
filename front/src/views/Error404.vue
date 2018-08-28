<template>
    <div>

        <Header :title="title" subtitle="Cette page n'existe pas ou n'existe plus." />

    </div>
</template>

<script>
import { EventBus } from '@/event-bus.js'

import Header from '@/components/layout/Header.vue'

export default {
    components: {
		Header
    },
	data() {
		return {
			title: 'Erreur 404'
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