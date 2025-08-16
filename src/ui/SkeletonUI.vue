<script setup>
const { className } = defineProps(["className"]);
</script>

<template>
  <div :class="['skeleton', className]"></div>
</template>

<style scoped>
.skeleton {
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 37%, #e0e0e0 63%);
  background-size: 400% 100%;
  border-radius: 5px;
  animation: skeleton-loading 1.4s ease infinite;
}

@keyframes skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>
