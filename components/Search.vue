<template>
  <div class="search">
    <label class="search__container">
      <input
        @input="onSearch"
        type="text"
        placeholder="Search for products..."
      />
      <svg class="search__icon" width="24" height="24">
        <use xlink:href="~/assets/icons/sprite.svg#search"></use>
      </svg>
      <span class="search__placeholder">Search for products...</span>
    </label>
  </div>
</template>
<script setup lang="ts">
import type { IFilm } from "~/models/models";

const props = defineProps(["filmsInit"]);

const emit = defineEmits(["onSearch"]);

const onSearch = (e: Event) => {
  const text = (e.target as HTMLInputElement).value;
  let items = [];
  if (text) {   
    items = props.filmsInit.filter(
      (item: IFilm) => item.title.toLowerCase().indexOf(text.toLowerCase()) != -1
    );
  } else {
    items = props.filmsInit;
  }
  emit("onSearch", items);
  emit("onSearch", text);
};
</script>
<style scoped lang="scss">
.search {
  position: relative;
  border-radius: 64px;
  padding: 12px 16px 12px 48px;
  background-color: #f0f0f0;

  &__placeholder {
    position: absolute;
    left: 52px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;

    color: #999999;
    font-size: 16px;
  }

  input {
    font-family: $FFSatoshi;
    width: 100%;
  }

  &__icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  &__container {
  }

  input::placeholder {
    opacity: 0;
    visibility: hidden;
  }

  input:not(:placeholder-shown) ~ .search__placeholder {
    display: none;
  }
}
</style>
