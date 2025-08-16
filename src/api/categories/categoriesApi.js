import { $instance } from "..";

export const categoriesApi = {
  getCategoriesByCityId: async ({ cityId }) => {
    return (await $instance.get(`/menutags?city_id=${cityId}`)).data;
  },
  getCategoryBySlug: async ({ cityId, slug, subcategory }) => {
    return (await $instance.get(`/menutags/${subcategory ? subcategory : slug}?city_id=${cityId}`))
      .data;
  },
};
