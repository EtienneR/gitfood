<template>
    <section class="section">

        <h1 class="title is-1 has-text-centered">Mes commentaires ({{ this.comments.length }})</h1>
        <article v-for="(comment, index) in comments" :key="index">
            <p>{{ comment.content }} posté dans <strong>{{ comment.name }}</strong></p>
        </article>

    </section>
</template>

<script>
import api from '@/services/Api'

export default {
	props: {
		isConnected: Boolean,
        userId: Number,
        firstname: String
	},
    data() {
        return {
            comments: []
        }
    },
    async created () {
        this.getCommentsByAuthor()
    },
    methods: {
        async getCommentsByAuthor() {
            await api.getCommentsByAuthor(this.userId)
                .then(comments => {
                    this.comments = comments.data
                })
        }
    }
}
</script>