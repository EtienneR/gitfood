<template>
    <div>

		<section class="hero is-light">
			<div class="hero-body">
				<div class="container has-text-centered">
					<h1 class="title title is-2">
						Mes commentaires ({{ this.comments.length }})
					</h1>
				</div>
			</div>
		</section>

        <section class="section">
            <div class="container">
                <article v-for="(comment, index) in comments" :key="index" class="content">
                    <p>{{ comment.content }} posté dans <strong>{{ comment.name }}</strong></p>
                </article>
            </div>
        </section>

    </div>
</template>

<script>
import api from '@/services/Api'

export default {
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