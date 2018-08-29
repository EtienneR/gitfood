<template>
    <div>

        <h2 v-if="comments.length > 0" class="title">Les commentaires ({{ comments.length }})</h2>
        <h2 v-else class="title">Aucun commentaire</h2>

        <div class="box" v-for="(comment, index) in comments" :key="index">
            <article class="media">
                <div class="media-content">
                    <div class="content">
                        <p>De  
                            <router-link :to="{ name: 'user', params: { id: comment.user_id }}">
                                {{ comment.firstname }}
                            </router-link>
                        </p>
                        <p v-html="comment.content"></p>
                    </div>
                </div>
            </article>
        </div>

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