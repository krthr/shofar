import defaultTheme from "tailwindcss/defaultTheme";
import themes from "daisyui/src/theming/themes";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        "data-theme": "forest",
        lang: "es",
      },

      link: [
        { rel: "dns-prefetch", href: "//fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Syne:wght@300;400;500;700&family=Work+Sans:wght@300;400;500;700&display=swap",
        },
      ],
    },
  },

  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss", "nuxt-icon"],

  features: {
    inlineStyles: true,
  },

  nitro: {
    compressPublicAssets: { gzip: true, brotli: true },
    minify: true,
  },

  routeRules: {
    "/albums": {
      redirect: { to: "/" },
    },

    "/artists": {
      redirect: { to: "/" },
    },
  },

  tailwindcss: {
    config: {
      plugins: [require("daisyui")],

      daisyui: {
        themes: [
          {
            forest: {
              ...themes["forest"],
              ".bg-base-50": {
                "background-color": "#211f1f",
              },
              ".bg-base-25": {
                "background-color": "#2c2929",
              },
            },
          },
        ],
      },

      theme: {
        extend: {
          fontFamily: {
            title: ['"Syne"', ...defaultTheme.fontFamily.sans],
            body: ['"Work Sans"', ...defaultTheme.fontFamily.sans],
          },
        },
      },
    },
  },
});