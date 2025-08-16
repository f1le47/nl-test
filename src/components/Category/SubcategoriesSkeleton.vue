<script setup>
import SkeletonUI from "@/ui/SkeletonUI.vue";
import { SUBCATEGORIES_SKELETONS_AMOUNT } from "./consts";
</script>

<template>
  <aside class="subcategories-skeletons">
    <SkeletonUI
      v-for="n in SUBCATEGORIES_SKELETONS_AMOUNT"
      :key="n"
      class="subcategories-skeletons__skeleton"
    />
  </aside>
</template>

<style scoped>
.subcategories-skeletons {
  display: flex;
  flex-direction: column;
  row-gap: 6px;
}

.subcategories-skeletons__skeleton {
  width: 240px;
  height: 42px;
}

@media screen and (max-width: 768px) {
  .subcategories-skeletons__skeleton {
    width: 100%;
  }
}
</style>
