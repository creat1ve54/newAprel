<template>
  <div class="filter">
    <div class="filter__header">
      <div class="filter__title">Filters</div>
      <svg width="24" height="24">
        <use xlink:href="~/assets/icons/sprite.svg#sort"></use>
      </svg>
    </div>
    <Accordion class="filter__item filter__item--padding">
      <template v-slot:header>
        Rating
        <svg width="12" height="7" stroke="#292D32">
          <use xlink:href="~/assets/icons/sprite.svg#arrow-up"></use>
        </svg>
      </template>
      <template v-slot:content>
        <div class="filter__container">
          <Slider
            :value="[0, 1000]"
            :min="0"
            :max="1000"
            @changeRanking="changeRanking($event, 0, 1000)"
          />
        </div>
      </template>
    </Accordion>
    <Accordion class="filter__item">
      <template v-slot:header>
        Genre
        <svg width="12" height="7" stroke="#292D32">
          <use xlink:href="~/assets/icons/sprite.svg#arrow-up"></use>
        </svg>
      </template>
      <template v-slot:content>
        <div class="filter__container">
          <div class="filter__list">
            <div v-for="genre in genres" class="filter__change">
              <label>
                <input
                  type="checkbox"
                  @change="(e) => onChangeGeneres(genre, e)"
                />
                <span>{{ genre.name }}</span>
              </label>
            </div>
          </div>
        </div>
      </template>
    </Accordion>
    <Accordion class="filter__item">
      <template v-slot:header>
        Episode
        <svg width="12" height="7" stroke="#292D32">
          <use xlink:href="~/assets/icons/sprite.svg#arrow-up"></use>
        </svg>
      </template>
      <template v-slot:content>
        <div class="filter__container">
          <div class="filter__list">
            <div v-for="episode in episodes" class="filter__change">
              <label>
                <input
                  type="checkbox"
                  @change="(e) => onChangeEpisodes(episode, e)"
                />
                <span>{{ episode.name }}</span>
              </label>
            </div>
          </div>
        </div>
      </template>
    </Accordion>
  </div>
</template>
<script setup lang="ts">
import type { IGenre, IEpisodes } from "~/models/models";

const emit = defineEmits(["changeEpisodes", "changeGeneres", "changeRanking"]);

const genres = ref<IGenre[]>([
  {
    id: 1,
    name: "Drama",
  },
  {
    id: 2,
    name: "Fantasy",
  },
  {
    id: 3,
    name: "Action",
  },
  {
    id: 4,
    name: "Award Winning",
  },
  {
    id: 5,
    name: "Supernatural",
  },
  {
    id: 6,
    name: "Adventure",
  },
  {
    id: 7,
    name: "Western",
  },
  {
    id: 8,
    name: "Sci-Fi",
  },
]);

const episodes = ref<IEpisodes[]>([
  {
    id: 1,
    name: 1,
  },
  {
    id: 2,
    name: 51,
  },
  {
    id: 3,
    name: 13,
  },
  {
    id: 4,
    name: 10,
  },
  {
    id: 5,
    name: 25,
  },
]);

const checkedGenres = ref<IGenre[]>([]);
const checkedEpisodes = ref<IEpisodes[]>([]);

const onChangeGeneres = (genre: IGenre, e: Event) => {
  let array = checkedGenres.value;

  let checked = (e.target as HTMLInputElement).checked;

  if (checked) {
    array.push(genre);
  } else {
    array = checkedGenres.value.filter((item) => item.id != genre.id);
  }
  checkedGenres.value = array;

  emit("changeGeneres", checkedGenres.value);
};

const onChangeEpisodes = (episode: IEpisodes, e: Event) => {
  let array = checkedEpisodes.value;

  let checked = (e.target as HTMLInputElement).checked;

  if (checked) {
    array.push(episode);
  } else {
    array = checkedEpisodes.value.filter((item) => item.id != episode.id);
  }
  checkedEpisodes.value = array;

  emit("changeEpisodes", checkedEpisodes.value);
};

const changeRanking = (values: Array<number>, p0: number, p1: number) => {
  emit("changeRanking", values);
};
</script>
<style scoped lang="scss">
.filter {
  position: sticky;
  top: 20px;
  padding: 20px 24px;
  border-radius: 20px;
  border: 1px solid #d9d9d9;

  &__title {
    font-size: 20px;
    font-weight: 700;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  &__list {
    border-top: 1px solid #d9d9d9;
    padding-top: 24px;
    margin-bottom: 24px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  &__change {
    input {
      display: none;
    }

    input:checked ~ span {
      background-color: #000000;
      color: #ffffff;
    }

    span {
      cursor: pointer;
      display: inline-block;
      padding: 10px 20px;
      border-radius: 20px;
      background-color: #f0f0f0;
      font-size: 14px;
    }
  }

  &__container {
    padding: 20px 0px 0px 0px;
  }

  &__item {
    margin-bottom: 24px;
    &--padding {
      .filter__container {
        padding: 20px 22px 0px 22px;
      }
    }
  }

  :deep(.accordion__title) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    font-weight: 700;
    svg {
      transition: all 0.3s ease-in-out;
    }
  }

  :deep(.accordion--active) {
    .accordion__title {
      svg {
        transform: rotate(180deg);
        transition: all 0.3s ease-in-out;
      }
    }
  }
}
</style>
