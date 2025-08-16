<script setup>
import CategoriesSkeleton from "@/components/Categories/CategoriesSkeleton.vue";
import router from "@/router";
import { PATHS } from "@/router/consts";
import { useCategoriesStore } from "@/stores/categories/categoriesStore";
import { useLocationStore } from "@/stores/location/locationStore";
import CategoryCard from "@/ui/CategoryCard.vue";
import ContainerUI from "@/ui/ContainerUI.vue";
import PageContainer from "@/ui/PageContainer.vue";
import { computed, watchEffect } from "vue";

const location = useLocationStore();
const categories = useCategoriesStore();

const cityId = computed(() => location.city?.id);
watchEffect(() => {
  if (cityId.value) {
    categories.getCategoriesByCityId(cityId.value);
  }
});

const redirectToCategory = (slug) => {
  router.push(PATHS.Category.path + `/${slug}`);
};
</script>

<template>
  <main>
    <PageContainer>
      <ContainerUI>
        <div class="categories">
          <h1 class="categories__title">Категории товаров</h1>
          <CategoriesSkeleton v-if="categories.isCategoriesLoading" />
          <div
            v-else
            v-show="categories.categories && categories.categories.length > 0"
            class="categories-cards"
          >
            <CategoryCard
              v-for="category in categories.categories"
              :key="category.id"
              :category="category"
              @click="redirectToCategory(category.slug)"
            />
          </div>
        </div>
      </ContainerUI>
    </PageContainer>
  </main>
</template>

<style scoped>
.categories {
  display: flex;
  flex-direction: column;
  row-gap: 19px;
}

.categories__title {
  font-size: 44px;
  line-height: 44px;
}

.categories-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(271px, 1fr));
  gap: 22px;
}
</style>
