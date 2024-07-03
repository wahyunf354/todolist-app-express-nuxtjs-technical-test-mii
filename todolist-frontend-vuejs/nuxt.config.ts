// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "Todo List",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width-device-width, initial-scale-1" },
        {
          hid: "description",
          name: "description",
          content: "Todolist on your device",
        },
      ],
    },
  },
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: {
      apiBase: "http://localhost:4001",
    },
  },
});
