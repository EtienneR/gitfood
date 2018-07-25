<template>
    <section class="hero is-light">

        <div class="hero-body">
            <div class="container has-text-centered">
                <h1 class="title title is-2">
                    {{ message.title }}
                </h1>
                <p class="subtitle">
                    {{ message.content }}
                </p>
            </div>
        </div>

    </section>
</template>

<script>
export default {
	props: {
		message: Object,
	}
}
</script>