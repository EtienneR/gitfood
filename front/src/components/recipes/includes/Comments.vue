<template>
    <div>
        <div v-if="comments.length > 0">
            <div class="message-header">
                <h2 class="title is-5">Les commentaires ({{ comments.length }})</h2>
            </div>
            <article class="message-body" v-for="(comment, index) in comments" :key="index">
                <p>De 
                    <router-link :to="{ name: 'user', params: { id: comment.user_id }}">
                        {{ comment.firstname }}
                    </router-link>
                </p>
                <p v-html="comment.content"></p>
            </article>
        </div>
        <div v-else>
            <div class="message-header">
                <h2 class="title is-5">Aucun commentaire</h2>
            </div>
        </div>

        <div class="column">
            <b-field>
                <b-input type="textarea"
                    placeholder="Laissez un message (de préférence constructif). Le HTML est désactivé." 
                    v-model="comment">
                </b-input>
            </b-field>
            <input type="submit"
                class="button is-primary"
                :value="isConnected ? 'Envoyer' : 'Vous devez être connecté'"
                @click="addComment()"
                :disabled="!isConnected || this.comment.length == 0">
        </div>

    </div>
</template>

<script>
export default {
	props: {
		comments: Array,
        isConnected: Boolean
	},
    data() {
        return {
            comment: ''
        }
    },
    methods: {
        addComment() {
            if (this.comment) {
                this.$emit('add', this.comment)
                this.comment = ''
            } else {
                this.$dialog.alert('Merci de remplir ce champ')
            }
        }
    }
}
</script>