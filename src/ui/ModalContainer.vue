<script setup>
const { isOpen } = defineProps(["isOpen"]);
const emit = defineEmits(["close"]);
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click.self="emit('close')">
      <div class="modal"><slot></slot></div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--overlay);
}

.modal {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
