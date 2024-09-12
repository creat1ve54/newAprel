<template>
  <section class="films">
    <div class="container">
      <div class="flex">
        <div class="flex__left">
          <Filter
            @changeEpisodes="changeEpisodes"
            @changeGeneres="changeGeneres"
            @changeRanking="changeRanking"
          />
        </div>
        <div class="flex__right">
          <div class="sort">
            <div class="sort__title">Films</div>
            <Search
              @onSearch="onSearch"
              :filmsInit="filmsInstallatios.films"
            />
            <div class="sort__btns">
              <label class="sort__btn">
                <input @click="changeGrid" type="radio" name="view" checked />
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M22 9.02V4.48C22 3.07 21.36 2.5 19.77 2.5H15.73C14.14 2.5 13.5 3.07 13.5 4.48V9.01C13.5 10.43 14.14 10.99 15.73 10.99H19.77C21.36 11 22 10.43 22 9.02Z"
                  />
                  <path
                    d="M22 20.27V16.23C22 14.64 21.36 14 19.77 14H15.73C14.14 14 13.5 14.64 13.5 16.23V20.27C13.5 21.86 14.14 22.5 15.73 22.5H19.77C21.36 22.5 22 21.86 22 20.27Z"
                  />
                  <path
                    d="M10.5 9.02V4.48C10.5 3.07 9.86 2.5 8.27 2.5H4.23C2.64 2.5 2 3.07 2 4.48V9.01C2 10.43 2.64 10.99 4.23 10.99H8.27C9.86 11 10.5 10.43 10.5 9.02Z"
                  />
                  <path
                    opacity="0.4"
                    d="M10.5 20.27V16.23C10.5 14.64 9.86 14 8.27 14H4.23C2.64 14 2 14.64 2 16.23V20.27C2 21.86 2.64 22.5 4.23 22.5H8.27C9.86 22.5 10.5 21.86 10.5 20.27Z"
                  />
                </svg>
              </label>
              <label class="sort__btn">
                <input @click="changeColumn" type="radio" name="view" />
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M19.9 14H4.1C2.6 14 2 14.64 2 16.23V20.27C2 21.86 2.6 22.5 4.1 22.5H19.9C21.4 22.5 22 21.86 22 20.27V16.23C22 14.64 21.4 14 19.9 14Z"
                  />
                  <path
                    d="M19.9 2.5H4.1C2.6 2.5 2 3.14 2 4.73V8.77C2 10.36 2.6 11 4.1 11H19.9C21.4 11 22 10.36 22 8.77V4.73C22 3.14 21.4 2.5 19.9 2.5Z"
                  />
                </svg>
              </label>
            </div>
          </div>
          <div
            :class="
              long
                ? 'films__items films__items--list'
                : 'films__items films__items--card'
            "
          >
            <Item v-for="film in films" :film="film" />
          </div>
          <Pagination
            :currentPage="currentPage"
            :itemsPerPage="itemsPerPage"
            :itemsLength="filmsInit.length"
            @changePage="changePage"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import type { IFilm, IGenre, IEpisodes } from "~/models/models";
import { useFilmsStore } from "~/store/catalog";

let long = ref(false as Boolean);

function changeGrid() {
  long.value = false;
}

function changeColumn() {
  long.value = true;
}
const filmsInstallatios = useFilmsStore();
await filmsInstallatios.getCards();

const currentPage = ref(1);
const itemsPerPage = ref(10);

const filmsInit = ref<IFilm[]>(filmsInstallatios.films);



const options = ref({
  search: "",
  ranking: [0, 100],
  genres:  <IGenre[]>[],
  episodes: <IEpisodes[]>[],
});

const films = computed(() => {

  let pageLength =  Math.ceil(filmsInit.value.length / itemsPerPage.value)

  if(pageLength <= currentPage.value) {
    changePage(pageLength);
  }

  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;

  

  return filmsInit.value.slice(startIndex, endIndex);
});

const changePage = (pageNumber: number) => {
  currentPage.value = pageNumber;
};

const onSearch = (text: string) => {
  options.value.search = text;
  onOptions(filmsInit.value);
};

const onOptions = (item: IFilm[]) => {
  filmsInit.value = filmsInstallatios.films.filter((item: IFilm) => {
    const matchesGenres = options.value.genres.length
      ? options.value.genres.some((genre) => item.genres.some((genreItem) => genre.name === genreItem))
      : true;

    const matchesEpisodes = options.value.episodes.length
      ? options.value.episodes.some((episodes) => episodes.name === item.episodes)
      : true;

    const matchesSearchQuery = item.title
      .toLowerCase()
      .includes(options.value.search.toString().toLowerCase());

    const matchesRanking =
      item.ranking >= options.value.ranking[0] &&
      item.ranking <= options.value.ranking[1];

    return  matchesEpisodes  && matchesGenres && matchesSearchQuery && matchesRanking;
  });
};

const changeGeneres = (genres: IGenre[]) => {
  options.value.genres = genres;
  onOptions(filmsInit.value);
};

const changeEpisodes = (episodes: IEpisodes[]) => {
  options.value.episodes = episodes;
  onOptions(filmsInit.value);
};

const changeRanking = (ranking: Array<number>) => {
  options.value.ranking = ranking;
  onOptions(filmsInit.value);
};

watch(currentPage, () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
</script>
<style lang="scss">
.films {
  margin-top: 40px;
  &__items {
    margin-bottom: 40px;
    &--card {
      display: grid;
      column-gap: 20px;
      row-gap: 36px;
      grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
    }

    &--list {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .card {
        flex-direction: row;
        gap: 20px;

        &__img {
          flex: 0 0 auto;
          height: 200px;
          width: 200px;
        }
      }
    }
  }
}
</style>
