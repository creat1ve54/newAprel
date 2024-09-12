// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  modules: ["@pinia/nuxt"],
  css: ["~/assets/styles/index.scss", "vue-final-modal/style.css"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/vars.scss" as *;',
        },
      },
    },
  },
});
