import defaultTheme from "tailwindcss/defaultTheme";
import themes from "daisyui/src/theming/themes";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: "%s - Pentecostal",

      htmlAttrs: {
        "data-theme": "forest",
        lang: "es",
      },
    },
  },

  googleFonts: {
    families: {
      Syne: [300, 400, 500, 700],
      "Work+Sans": [300, 400, 500, 700],
    },
  },

  devtools: { enabled: true },

  modules: [
    "@nuxtjs/seo",
    "@nuxtjs/google-fonts",
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@nuxtjs/device",
  ],

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

      future: {
        hoverOnlyWhenSupported: true,
      },
    },
  },

  nitro: {
    vercel: {
      functions: {
        memory: 256,
      },
    },
  },
});
