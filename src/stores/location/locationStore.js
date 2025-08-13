import { defineStore } from "pinia";
import { ref } from "vue";
import { locationApi } from "@/api/location/locationApi";
import { DEFAULT_CITY_ID } from "./const";
import { local } from "@/common/storages/local";

export const useLocationStore = defineStore("location", () => {
  const city = ref();
  const cities = ref([]);

  const getCitiesByTerm = async (term) => {
    if (term.length < 2) return;
    try {
      const data = (await locationApi.getCitiesByTerm({ term })).data;
      cities.value = data;
    } catch (err) {
      console.error("Ошибка", err);
    }
  };
  const getCity = async (id) => {
    try {
      let cityId = (id ? id : local.locationStorage.cityId) ?? DEFAULT_CITY_ID;

      const data = (await locationApi.getCityById({ id: cityId })).data;
      city.value = data;
    } catch (err) {
      console.error("Ошибка", err);
    }
  };
  const saveCity = (newCity) => {
    local.locationStorage.cityId = newCity.id;
    city.value = newCity;
  };

  return { city, cities, getCitiesByTerm, saveCity, getCity };
});
