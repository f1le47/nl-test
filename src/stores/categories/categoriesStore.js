import { categoriesApi } from "@/api/categories/categoriesApi";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCategoriesStore = defineStore("categories", () => {
  const categories = ref([]);
  const isCategoriesLoading = ref(false);
  const products = ref([]);
  const isProductsLoading = ref(false);

  const getCategoriesByCityId = async (cityId) => {
    if (!cityId) return;
    try {
      isCategoriesLoading.value = true;

      const data = (await categoriesApi.getCategoriesByCityId({ cityId })).tags;
      categories.value = data;
    } catch (err) {
      console.error("Ошибка", err);
    } finally {
      isCategoriesLoading.value = false;
    }
  };
  const getProductsBySlug = async ({ cityId, slug, subcategory }) => {
    if (!cityId || !slug) return;
    try {
      isProductsLoading.value = true;

      const data = (await categoriesApi.getCategoryBySlug({ cityId, slug, subcategory })).products;
      products.value = data;
    } catch (err) {
      console.error("Ошибка", err);
    } finally {
      isProductsLoading.value = false;
    }
  };

  return {
    categories,
    products,
    getCategoriesByCityId,
    getProductsBySlug,
    isCategoriesLoading,
    isProductsLoading,
  };
});
