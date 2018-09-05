<template>
    <div>

        <Loading :loading="loading" />

        <div v-if="!loading">
            <Header :title="`Mes commentaires (${this.comments.length})`" />

            <section class="section">
                <div class="container">
                    <article v-for="(comment, index) in comments" :key="index" class="box">
                        <div class="content">
                            <div class="columns">
                                <div class="column is-11">
                                    <p class="subtitle">
                                        Posté dans <strong>{{ comment.name }}</strong> le {{ comment.created_at | moment }}
                                    </p>
                                </div>
                                <div class="column">
                                    <p class="has-text-right">
                                        <button class="button is-danger" @click="remove(comment.id)">Supprimer</button>
                                    </p>
                                </div>
                            </div>
                            <p>{{ comment.content }}</p>
                        </div>
                    </article>
                </div>
            </section>
        </div>

    </div>
</template>

<script>
import moment from 'moment'
require('moment/locale/fr')

import { EventBus } from '@/event-bus.js'
import api from '@/services/Api'
import Loading from '@/components/Loading.vue'
import Header from '@/components/layout/Header.vue'

export default {
    components: {
        Loading,
		Header
    },
	props: {
		isConnected: Boolean,
        userId: Number,
        firstname: String
	},
    data() {
        return {
            loading: false,
            title: 'Mes commentaires',
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
                if (comments.data.length > 0) {
                    this.comments = comments.data
                    EventBus.$emit('title', `Mes commentaires (${comments.data.length})`)
                } else {
                    EventBus.$emit('title', this.title)
                }
    
                EventBus.$emit('breadcrumb', this.title)
            })
            this.loading = false
        },
        remove(id) {
            this.$dialog.confirm({
                title: 'Supprimer ce commentaire ?',
                message: 'Etes-vous sur de vouloir <b>supprimer</b> ce commentaire? Cette action sera définitive.',
                confirmText: 'Supprimer ce commentaire',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () => {
                    api.removeComment(id)
                    .then(() => {
                        // Suppression du tableau
                        const index = this.comments.findIndex(r => r.id == id)
                        this.comments.splice(index, 1)
                        EventBus.$emit('toast', `Commentaire ${id} supprimé`)
                    })
                }
            })
        }
    },
    filters: {
        moment: function (date) {
            return moment(date).format('D MMMM YYYY à HH:mm')
        }
    }
}
</script>