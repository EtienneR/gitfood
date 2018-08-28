<template>
    <div>

        <Header title="A propos" subtitle="La page FAQ" />
        
        <section class="section">
            <div class="container">
                <article class="content">
                    <h2 class="title is-2">Gitfood, c'est quoi ?</h2>
                    <p>Gitfood est une plateforme de recettes de cusines.</p>
                    <h2 class="title is-2">Développeurs</h2>
                    <p>Gitfood est développé avec les technologies suivantes : JavaScript et SQL.</p>
                    <p>En effet, l'architecture repose sur une stack full JavaScript avec Node.js, Express.js et Vue.js. Ainsi qu'une base de données Postgres.</p>
                </article>
            </div>
        </section>

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
			title: 'A propos',
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