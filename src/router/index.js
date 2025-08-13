import { createRouter, createWebHistory } from "vue-router";
import { PATHS } from "./consts";
import CategoriesView from "@/views/CategoriesView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: PATHS.Categories,
      name: "Categories",
      component: CategoriesView,
    },
    {
      path: "/",
      redirect: PATHS.Categories,
    },
  ],
});

export default router;
