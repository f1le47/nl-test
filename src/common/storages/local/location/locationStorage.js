import { CITY_ID_KEY } from "./consts";

export const locationStorage = {
  get cityId() {
    return localStorage.getItem(CITY_ID_KEY);
  },
  set cityId(id) {
    localStorage.setItem(CITY_ID_KEY, id);
  },
};
