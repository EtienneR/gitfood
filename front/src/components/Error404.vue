<template>
    <div>

        <Header title="Erreur 404" subtitle="Cette page n'existe pas ou n'existe plus." />

    </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'

export default {
    components: {
		Header
    },
    metaInfo: {
        title: 'Erreur 404'
    }
}
</script>