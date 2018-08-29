<template>
    <section class="hero is-light">

        <div class="hero-body is-hidden-mobile">
            <div class="container has-text-centered">
                <h1 class="title title is-2">
                    {{ title }}
                </h1>
                <p class="subtitle">
                    {{ subtitle }}
                </p>
            </div>
        </div>

    </section>
</template>

<script>
export default {
	props: {
		title: String,
        subtitle: String
	}
}
</script>

<style scoped>
.hero {
    background-image: url('../../assets/bg-header.jpg')
}
</style>