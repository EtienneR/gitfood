<template>
    <div>

        <Header :title="message.title" :subtitle="message.content" />

    </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'

export default {
    components: {
		Header
    },
	props: {
		message: Object,
	}
}
</script>