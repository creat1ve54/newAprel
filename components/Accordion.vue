<template>
  <div class="accordion" :class="{ 'accordion--active': active }">
    <label class="accordion__title">
      <input
        type="checkbox"
        class="accordion__checkbox"
        :checked="active"
        @change="
          (e: Event) => {
            active = (e.target as HTMLInputElement).checked;
          }
        "
      />
      <span v-if="title">
        {{ title }}
      </span>
      <slot v-if="!title" name="header" />
    </label>
    <div class="accordion__container">
      <div class="accordion__container-animation">
        <div class="accordion__container-animation-wrapper">
          <slot name="content" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps(["title", "opened"]);
let active = ref(false);

if (props.opened) {
  active.value = true;
}
</script>
<style scoped lang="scss">
.accordion {
  &__title {
    cursor: pointer;

    &:has(.accordion__checkbox:checked) ~ .accordion__container {
      grid-template-rows: 1fr;
    }

    &:has(.accordion__checkbox:checked)
      ~ .accordion__container
      .accordion__container-animation-wrapper {
      transform: translateY(0);
      visibility: visible;
      transition: all 0.3s ease-in-out;
    }
  }

  &__checkbox {
    display: none;
  }

  &__container {
    display: grid;
    grid-template-rows: 0fr;
    overflow: hidden;
    transition: all 0.3s ease-in-out;

    &-animation {
      min-height: 0;

      &-wrapper {
        transform: translateY(-100%);
        visibility: hidden;
        transition: all 0.3s ease-in-out;
      }
    }
  }

  &--active {
    .accordion {
      &__container {
        transition: all 0.3s ease-in-out;
      }
    }
  }
}
</style>
