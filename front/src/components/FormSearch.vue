<template>
    <div>

        <form action="javascript:void(0);"
            @keyup.enter="search"
            id="formSearch">
            <b-input type="search"
                icon="magnify"
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

<style scoped>
@media screen and (max-width: 768px) {
    #formSearch {
        padding-top: 2%;
        padding-bottom: 2%;
        margin-bottom: 4%;
    }
}
</style>