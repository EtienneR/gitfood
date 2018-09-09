<template>
    <div>

        <h2 v-if="comments.length > 0" class="title">Les commentaires ({{ comments.length }})</h2>
        <h2 v-else class="title title is-4">Aucun commentaire</h2>

        <div class="box" v-for="(comment, index) in comments" :key="index">
            <article class="media">
                <div class="media-content">
                    <div class="content">
                        <p>De  
                            <router-link :to="{ name: 'user', params: { id: comment.user_id }}">
                                {{ comment.firstname }}
                            </router-link>
                            - le {{ comment.created_at | moment }}
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

        <button class="button is-primary"
            @click="addComment()"
            :disabled="!isConnected ||comment.length === 0">
            <b-icon icon="comment-plus-outline"></b-icon>
            <span v-if="isConnected">
                <span>Envoyer</span>
            </span>
            <span v-else>Vous devez être connecté</span>
        </button>

    </div>
</template>

<script>
import moment from 'moment'

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
    },
    filters: {
        moment: date => moment(date).format('D MMMM YYYY à HH:mm')
    }
}
</script>