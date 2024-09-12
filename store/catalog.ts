import { defineStore } from "pinia";
import { filmsAPI } from "~/api/axios";

export const useFilmsStore = defineStore("films", {
  state: () => ({
    films: [],
  }),
  actions: {
    async getCards() {
      // const films = (await filmsAPI.getFilms()).data.data;
      const films = (await filmsAPI.getFilms()).data;
      console.log(films);
      
      this.films = films;
    },
  },
});
