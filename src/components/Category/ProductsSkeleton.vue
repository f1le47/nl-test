<script setup>
import { calculateSkeletonCardsPerPageHandler } from "@/common/utils/calculateSkeletonCardsPerPage";
import { onMounted, onUnmounted, ref } from "vue";
import { PRODUCTS_CARD_HEIGHT, PRODUCTS_GAP, PRODUCTS_MIN_CARD_WIDTH } from "./consts";
import SkeletonUI from "@/ui/SkeletonUI.vue";

const containerRef = ref();
const skeletonPerPage = ref(0);

const calculateSkeletonCardsPerPage = calculateSkeletonCardsPerPageHandler({
  containerRef,
  skeletonPerPage,
  minWidth: PRODUCTS_MIN_CARD_WIDTH,
  height: PRODUCTS_CARD_HEIGHT,
  gap: PRODUCTS_GAP,
});

onMounted(() => {
  calculateSkeletonCardsPerPage();
  window.addEventListener("resize", calculateSkeletonCardsPerPage);
});
onUnmounted(() => {
  window.removeEventListener("resize", calculateSkeletonCardsPerPage);
});
</script>

<template>
  <div class="products-skeletons" ref="containerRef">
    <SkeletonUI v-for="n in skeletonPerPage" :key="n" class="products-skeletons__skeleton" />
  </div>
</template>

<style scoped>
.products-skeletons {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(276px, 1fr));
  gap: 24px;
}

.products-skeletons__skeleton {
  min-width: 276px;
  width: 100%;
  height: 505px;
}
</style>
