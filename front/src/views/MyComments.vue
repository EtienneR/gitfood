<template>
    <div>

        <Loading :loading="loading" />

        <div v-if="!loading">
            <Header :title="`Mes commentaires (${this.comments.length})`" />

            <section class="section">
                <div class="container">
                    <article v-for="(comment, index) in comments" :key="index" class="content">
                        <p>{{ comment.content }} posté dans <strong>{{ comment.name }}</strong></p>
                    </article>
                </div>
            </section>
        </div>

    </div>
</template>

<script>
import api from '@/services/Api'
import Loading from '@/components/Loading.vue'
import Header from '@/components/layout/Header.vue'

export default {
    components: {
        Loading,
		Header
    },
    metaInfo() {
        return {
            title: this.comments && `Mes commentaires (${this.comments.length})`
        }
    },
	props: {
		isConnected: Boolean,
        userId: Number,
        firstname: String
	},
    data() {
        return {
            loading: false,
            comments: []
        }
    },
    async created () {
        this.getCommentsByAuthor()
    },
    methods: {
        async getCommentsByAuthor() {
            this.loading = true
            await api.getCommentsByAuthor(this.userId)
                .then(comments => {
                    this.comments = comments.data
                    this.loading = false
                }).catch(() => {
                    this.loading = false
                })
        }
    }
}
</script>