<template>
    <div class="content">
        <h2 class="title is-4">Instructions</h2>
        <ol :class="{'instructions' : instructions[0].step}">
            <li v-for="(instruction, index) in instructions" :key="index">
                <span v-if="instruction.title">
                    <span class="title is-5">{{ instruction.title }}</span>
                    <ol>
                        <li v-for="(a, index) in instruction.step" :key="index">{{ a.name }}</li>
                    </ol>
                </span>
                <span v-else>
                    {{ instruction.name }}
                </span>
            </li>
        </ol>
    </div>
</template>

<script>
export default {
	props: {
        instructions: Array,
	}
}
</script>

<style scoped>
.instructions {
    list-style-type: upper-latin;
}

.instructions li ol {
    margin-left: 5px;
}

.instructions li ol {
    margin-bottom: 20px;
}
</style>