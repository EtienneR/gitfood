<template>
    <div class="column is-one-quarter">
        <form action="javascript:void(0);" @keyup.enter="search">
            <b-input 
                type="search"
                v-model.trim="q"
                placeholder="Rechercher" />
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            q: '',
        }
    },
    methods: {
        search() {
            this.$root.$router.push({
				name: 'search',
                query: { q: this.q }
            })
        }
    }
}
</script>