<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import SkeletonUI from "@/ui/SkeletonUI.vue";
import { calculateSkeletonCardsPerPageHandler } from "@/common/utils/calculateSkeletonCardsPerPage";
import { CATEGORIES_CARD_HEIGHT, CATEGORIES_GAP, CATEGORIES_MIN_CARD_WIDTH } from "./consts";

const containerRef = ref();
const skeletonPerPage = ref(0);

const calculateSkeletonCardsPerPage = calculateSkeletonCardsPerPageHandler({
  containerRef,
  skeletonPerPage,
  minWidth: CATEGORIES_MIN_CARD_WIDTH,
  height: CATEGORIES_CARD_HEIGHT,
  gap: CATEGORIES_GAP,
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
  <div class="categories-skeletons" ref="containerRef">
    <SkeletonUI v-for="n in skeletonPerPage" :key="n" class="categories-skeletons__skeleton" />
  </div>
</template>

<style scoped>
.categories-skeletons {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(271px, 1fr));
  gap: 22px;
}

.categories-skeletons__skeleton {
  min-width: 271px;
  width: 100%;
  height: 152px;
}
</style>
