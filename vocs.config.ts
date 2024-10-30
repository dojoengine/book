import { defineConfig } from "vocs";
import svgr from "vite-plugin-svgr";
import { routes } from "./routes";

export default defineConfig({
    title: "Dojo Documentation",
    description:
        "Dojo | A Toolchain for Building Provable Games and Applications",
    iconUrl: "/dojo-favicon.svg",
    logoUrl: "/dojo-icon.svg",
    ogImageUrl:
        "https://vocs.dev/api/og?logo=%logo&title=%title&description=%description",

    // Theme configuration
    font: {
        google: "Open Sans",
    },
    theme: {
        colorScheme: "dark",
        variables: {
            color: {
                textAccent: "#ee2d3f",
                background: "#0c0c0c",
                backgroundDark: "#121212",
                noteBackground: "#1a1a1a",
            },
        },
    },

    // Navigation
    sidebar: routes,
    topNav: [
        // { text: "Blog", link: "https://www.dojoengine.org/posts" },
        {
            text: "v1.0.0-rc.0",
            items: [
                {
                    text: "Releases",
                    link: "https://github.com/dojoengine/dojo/releases",
                },
                {
                    text: "Changelog",
                    link: "https://github.com/dojoengine/dojo/releases",
                },
                {
                    text: "Contributing",
                    link: "https://github.com/dojoengine/dojo/blob/main/CONTRIBUTING.md",
                },
            ],
        },
    ],

    // Social links and edit options
    socials: [
        {
            icon: "github",
            link: "https://github.com/dojoengine/dojo",
        },
        {
            icon: "x",
            link: "https://x.com/ohayo_dojo",
        },
    ],
    editLink: {
        pattern:
            "https://github.com/dojoengine/book/blob/main/docs/pages/:path",
        text: "Edit on GitHub",
    },

    // Banner configuration
    banner: {
        dismissable: false,
        backgroundColor: "red",
        content: "Join us in [Discord](https://discord.gg/dojoengine)!",
        height: "28px",
        textColor: "white",
    },

    // Vite configuration
    vite: {
        plugins: [svgr()],
        server: {
            proxy: {
                "/api": {
                    target: "https://website-production-bc1a.up.railway.app",
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
    },
<<<<<<< HEAD
=======
    {
      text: "Architectures",
      items: [
        {
          text: "Soverign Rollups",
          link: "/architecture/soverign-rollups",
        },
      ],
    },
    {
      text: "SDKs",
      items: [
        {
          text: "dojo.js",
          link: "/client/sdk/javascript",
        },
        {
          text: "dojo.unity",
          link: "/client/sdk/unity",
          collapsed: true,
          items: [
            {
              text: "Get Started",
              link: "/client/sdk/unity/get-started",
            },
            {
              text: "Dojo unity concepts",
              link: "/client/sdk/unity/important-concepts",
            },
            {
              text: "Common Problems",
              link: "/client/sdk/unity/common-problems",
            },
            { text: "Example", link: "/client/sdk/unity/example" },
          ],
        },
        { text: "dojo.c", link: "/client/sdk/c" },
        { text: "dojo.godot", link: "/client/sdk/godot" },
        { text: "dojo.rust", link: "/client/sdk/rust" },
        { text: "dojo.telegram", link: "/client/sdk/telegram" },
        { text: "dojo.discord", link: "/client/sdk/discord" },
      ],
    },
  ],
>>>>>>> a8d36fb7166a846649d79444d828f30e43859665
});
