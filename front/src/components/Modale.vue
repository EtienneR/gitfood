<template>
    <div :class="{ 'is-active': show }" v-show="show" class="modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            <slot name="action"></slot>
          </p>
          <button class="delete" aria-label="close" @click="$emit('close')"></button>
        </header>
        <section class="modal-card-body">
            <slot name="message"></slot>
        </section>
      </div>
    </div>
</template>

<script>
export default {
  name: 'modale',
  props: {
    show: Boolean
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>