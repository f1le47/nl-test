import { $instance } from "..";

export const locationApi = {
  getCitiesByTerm: async ({ term, country = "ru" }) => {
    return (await $instance.get(`/city?term=${term}&country=${country}`)).data;
  },
  getCityById: async ({ id }) => {
    return (await $instance.get(`/city?id=${id}`)).data;
  },
};
