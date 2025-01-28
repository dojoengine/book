import { defineConfig } from "vocs";
import svgr from "vite-plugin-svgr";
import { routes } from "./routes";
import { version } from "./package.json";

export default defineConfig({
    title: "Dojo Documentation",
    description:
        "Dojo | A Toolchain for Building Provable Games and Applications",
    iconUrl: "/dojo-favicon.svg",
    logoUrl: "/dojo-word.svg",
    ogImageUrl:
        "https://og.cartridge.gg/api/dojo?title=%title&description=%description",

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
            text: `${version}`,
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
});
