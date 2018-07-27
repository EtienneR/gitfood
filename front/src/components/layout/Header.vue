<template>
    <section class="hero is-light" style="background: url(http://www.uidownload.com/files/689/983/630/hand-drawn-cartoon-food-seamless-background-vector.jpg)">

        <div class="hero-body">
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