<script setup>
const { category } = defineProps(["category"]);
</script>

<template>
  <div class="card">
    <span class="card__name" :style="{ color: category.text_color }">{{ category.name }}</span>
    <img class="card__img" :src="category.image" alt="card image" />
  </div>
</template>

<style scoped>
.card {
  padding: 20px;
  position: relative;
  min-width: 271px;
  width: 100%;
  height: 152px;
  box-sizing: border-box;
  border-radius: 5px;
  cursor: pointer;
}

.card__name {
  font-size: 24px;
  line-height: 28px;
}

.card__img {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  inset: 0;
  z-index: -1;
  object-fit: cover;
}
</style>
