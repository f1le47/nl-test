<script setup>
import { useCategoriesStore } from "@/stores/categories/categoriesStore";
import { useLocationStore } from "@/stores/location/locationStore";
import ContainerUI from "@/ui/ContainerUI.vue";
import PageContainer from "@/ui/PageContainer.vue";
import { computed, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";
import BackIcon from "@/assets/icons/back.svg?component";
import router from "@/router";
import { PATHS } from "@/router/consts";
import ProductCard from "@/ui/ProductCard.vue";
import SkeletonUI from "@/ui/SkeletonUI.vue";
import ProductsSkeleton from "@/components/Category/ProductsSkeleton.vue";
import SubcategoriesSkeleton from "@/components/Category/SubcategoriesSkeleton.vue";

const route = useRoute();
const location = useLocationStore();
const categories = useCategoriesStore();

watchEffect(() => {
  categories.getProductsBySlug({
    slug: route.params.slug,
    cityId: location.city?.id,
    subcategory: route.query.subcategory,
  });
});
watchEffect(() => {
  categories.getCategoriesByCityId(location.city?.id);
});

const category = computed(() =>
  categories.categories.find((category) => category.slug === route.params.slug),
);
const shownSubcategories = computed(
  () => category.value?.children && category.value.children.length > 1,
);
const chosenSubcategory = computed(() => route.query.subcategory);

const chooseSubcategory = (subcategorySlug) => {
  const { subcategory, ...restQuery } = route.query;
  const newQuery = subcategorySlug ? { ...restQuery, subcategory: subcategorySlug } : restQuery;
  router.push({
    path: route.path,
    query: newQuery,
  });
};
const handleBack = () => router.push(PATHS.Categories);
</script>

<template>
  <main>
    <PageContainer>
      <ContainerUI>
        <div class="category" :class="{ category_withoutSidebar: !shownSubcategories }">
          <div class="category-title">
            <BackIcon class="category-title__icon" @click="handleBack" />
            <SkeletonUI v-if="categories.isCategoriesLoading" class="category-title__skeleton" />
            <h1 v-else class="category-title__text">{{ category?.name }}</h1>
          </div>
          <SubcategoriesSkeleton v-if="shownSubcategories && categories.isCategoriesLoading" />
          <aside
            v-if="shownSubcategories && !categories.isCategoriesLoading"
            class="category-sidebar"
          >
            <span
              @click="chooseSubcategory('')"
              class="category-sidebar__label"
              :class="{ 'category-sidebar__label_active': !chosenSubcategory }"
              >Все продукты</span
            >
            <span
              v-for="subcategory in category.children"
              :key="subcategory.id"
              @click="chooseSubcategory(subcategory.slug)"
              class="category-sidebar__label"
              :class="{ 'category-sidebar__label_active': chosenSubcategory === subcategory.slug }"
              >{{ subcategory.name }}</span
            >
          </aside>
          <ProductsSkeleton v-if="categories.isProductsLoading" />
          <div
            v-else
            v-show="categories.products && categories.products.length > 0"
            class="category-products"
          >
            <ProductCard
              v-for="product in categories.products"
              :key="product.id"
              :product="product"
            />
          </div>
        </div>
      </ContainerUI>
    </PageContainer>
  </main>
</template>

<style scoped>
.category {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-areas:
    "title title"
    "sidebar products";
  gap: 20px 34px;
}

.category_withoutSidebar {
  grid-template-areas:
    "title"
    "products";
  grid-template-columns: 1fr;
}

.category-title {
  display: flex;
  align-items: center;
  column-gap: 10px;
  grid-area: title;
}

.category-title__icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.category-title__skeleton {
  width: 230px;
  height: 44px;
}

.category-title__text {
  font-size: 44px;
  line-height: 44px;
  color: var(--secondary-text);
}

.category-sidebar {
  width: 240px;
  display: flex;
  flex-direction: column;
  grid-area: sidebar;
}

.category-sidebar__label {
  padding: 9px 12px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: var(--dark);
  background-color: transparent;
  border-bottom: 1px solid var(--light-blue);
  cursor: pointer;
}

.category-sidebar__label:hover,
.category-sidebar__label_active {
  color: var(--blue-100);
  background-color: var(--light-blue);
}

.category-products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(276px, 1fr));
  gap: 24px;
  grid-area: products;
}

@media screen and (max-width: 768px) {
  .category {
    grid-template-areas:
      "title"
      "sidebar"
      "products";
    grid-template-columns: 1fr;
  }

  .category-sidebar {
    width: 100%;
  }
}
</style>
