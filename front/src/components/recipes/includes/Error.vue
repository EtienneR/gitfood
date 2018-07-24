<template>

    <article>
        <h1 class="title is-1 has-text-centered">{{ message.title }}</h1>
        <p class="title is-4 has-text-centered">{{ message.content }}</p>
    </article>

</template>

<script>
export default {
	props: {
		message: Object,
	}
}
</script>