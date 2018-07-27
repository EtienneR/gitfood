<template>
    <div>
        <p v-if="loading">
            <b-loading
                :is-full-page="true"
                :active.sync="loading"
                :can-cancel="false" />
        </p>
    </div>
</template>

<script>
export default {
    props: {
        loading: Boolean
    }
}
</script>