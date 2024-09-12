<template>
  <div class="pagination" v-if="pages.length > 1">
    <button
      v-for="page in pages"
      :class="
        currentPage == page
          ? 'pagination__item pagination__item--active'
          : 'pagination__item'
      "
      @click="() => changePage(page)"
    >
      {{ page }}
    </button>
  </div>
</template>
<script setup lang="ts">
const props = defineProps(["currentPage", "itemsPerPage", "itemsLength"]);
const emit = defineEmits(["changePage"]);

const pageCount = computed(() =>
  Math.ceil(props.itemsLength / props.itemsPerPage)
);

const pages = computed(() => {
  return Array.from({ length: pageCount.value }, (_, i) => i + 1);
});

function changePage(pageNumber: number) {
  emit("changePage", pageNumber);
}
</script>
<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  gap: 2px;
  &__item {
    padding: 10px 17px;
    color: #999999;
    font-size: 14px;
    font-weight: 500;
    border-radius: 8px;
    font-family: $FFSatoshi;

    &--active {
      background-color: #f0f0f0;
      color: #000000;
    }
  }
}
</style>
