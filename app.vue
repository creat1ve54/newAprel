<template>
  <div>
    <NuxtLoadingIndicator />
    <div class="content">
      <NuxtLayout>
        <NuxtPage />
        <!-- <ModalsContainer /> -->

        <button @click="open">Открыть</button>
        <button @click="close">Закрыть</button>
        <Popup />
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePopup } from './сomposable/Popup';

let { open, close } = usePopup()
</script>

<style scoped lang="scss"></style>
