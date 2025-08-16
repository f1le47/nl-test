import { createRouter, createWebHistory } from "vue-router";
import { PATHS } from "./consts";
import CategoriesView from "@/views/CategoriesView.vue";
import CategoryView from "@/views/CategoryView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: PATHS.Categories.path,
      name: "Categories",
      component: CategoriesView,
    },
    {
      path: PATHS.Category.path + PATHS.Category.slug,
      name: "Category",
      component: CategoryView,
    },
    {
      path: "/",
      redirect: PATHS.Categories,
    },
  ],
});

export default router;
