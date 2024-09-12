<template>
  <div class="modal-form">
    <div class="modal-form__container">
      <button
        class="modal-form__close"
        @click="$emit('close')"
        aria-label="Закрыть"
      >
        <svg width="40" height="40" fill="#292D32">
          <use xlink:href="~/assets/icons/sprite.svg#close-modal"></use>
        </svg>
      </button>
      <div class="card-detail">
        <div class="card-detail__left">
          <div class="card-detail__img">
            <img :src="film.image" :alt="film.title" />
          </div>
        </div>
        <div class="card-detail__right">
          <div class="card-detail__info">
            <div class="card-detail__title">{{ film.title }}</div>
            <div class="card-detail__descr">{{ film.synopsis }}</div>
            <div class="card-detail__prices">
              <div class="card-detail__new">{{ film.ranking }}</div>
              <!-- <div class="card-detail__old" v-if="card.oldPrice">
                ${{ card.oldPrice }}
              </div>
              <div class="card-detail__sale" v-if="card.sale">-{{ card.sale }}%</div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { IFilm } from "~/models/models";
const emit = defineEmits(["close"]);

const props = defineProps({
  film: {
    type: Object as PropType<IFilm> | null,
    required: true,
  },
});

</script>

<style scoped lang="scss">
.modal-form {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;

  &__container {
    position: absolute;
    background-color: #ffffff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    overflow: hidden;
    padding: 50px;
    max-width: 660px;
    width: 100%;
  }

  &__close {
    position: absolute;
    right: 20px;
    top: 20px;
  }

  &__title {
    font-size: 26px;
    font-weight: 700;
    line-height: 33px;
    margin-bottom: 16px;
  }

  &__text {
    font-size: 18px;
    font-weight: 500;
    line-height: 23px;
    margin-bottom: 32px;
  }

  &__submit {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .modal-form__text {
      text-align: center;
    }
  }

  .btn {
    margin-top: 30px;
    width: 100%;
  }

  @include mobile {
    &__container {
      max-width: none;
      border-radius: 0;
      width: 100%;
      height: 100%;
      padding: 20px;
      overflow: auto;
    }

    &__title {
      margin-right: 45px;
    }
  }
}
</style>
