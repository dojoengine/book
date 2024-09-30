import { defineConfig } from "vocs";
import svgr from "vite-plugin-svgr";
export default defineConfig({
  vite: {
    plugins: [svgr()],
  },
  banner: {
    dismissable: false,
    backgroundColor: "red",
    content: "Join us in [Discord](https://discord.gg/dojoengine)!",
    height: "28px",
    textColor: "white",
  },
  title: "Dojo Documentation",
  iconUrl: "/dojo-favicon.svg",
  logoUrl: "/dojo-icon.svg",
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
    pattern: "https://github.com/dojoengine/book/blob/main/docs/pages/:path",
    text: "Edit on GitHub",
  },
  ogImageUrl:
    "https://vocs.dev/api/og?logo=%logo&title=%title&description=%description",
  description:
    "Dojo | A Toolchain for Building Provable Games and Applications",
  topNav: [
    { text: "Blog", link: "https://www.dojoengine.org/posts" },
    {
      text: "v1.0.0-alpha.13",
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
      // content: {
      //   horizontalPadding: "40px",
      // },
    },
  },
  sidebar: [
    {
      text: "Overview",
      link: "/",
    },
    {
      text: "What is Dojo?",
      link: "/what-is-dojo",
    },
    {
      text: "Features",
      link: "/features",
    },
    {
      text: "Getting Started",
      link: "/getting-started",
    },

    {
      text: "FAQ",
      link: "/faq",
    },
    {
      text: "15 Minute Quickstarts",
      items: [
        {
          text: "Overview",
          link: "/quickstarts",
          collapsed: true,
          items: [
            { text: "React", link: "/quickstarts/react" },
            { text: "Threejs", link: "/quickstarts/threejs" },
            { text: "Phaser", link: "/quickstarts/phaser" },
            { text: "Godot", link: "/quickstarts/godot" },
            { text: "Unity", link: "/quickstarts/unity" },
            { text: "Bevy", link: "/quickstarts/bevy" },
          ],
        },
      ],
    },
    {
      text: "Tutorials",
      items: [
        { text: "Dojo 101 Tutorial", link: "/tutorial/dojo-starter" },
        {
          text: "Dungeon Crawler",
          link: "/tutorial/deploy-using-slot/main",
        },
        {
          text: "Deploy using Slot",
          link: "/tutorial/deploy-using-slot/main",
        },
        {
          text: "Using Graphql",
          link: "/tutorial/deploy-using-slot/main",
        },
        {
          text: "Using gRPC",
          link: "/tutorial/deploy-using-slot/main",
        },
        {
          text: "Deploying an NFT",
          link: "/tutorial/deploy-using-slot/main",
        },
        {
          text: "Katana-Starkli-Scarb",
          link: "/tutorial/katana-starkli-scarb/main",
        },
      ],
    },
    {
      text: "Cairo Framework",
      items: [
        { text: "Overview", link: "/framework" },
        {
          text: "World",
          collapsed: true,
          items: [
            { text: "Overview", link: "/framework/world" },
            { text: "Events", link: "/framework/world/events" },
            { text: "Metadata", link: "/framework/world/metadata" },
          ],
        },

        {
          text: "Contracts",
          collapsed: true,
          items: [
            { text: "Overview", link: "/framework/contracts/" },
            { text: "Systems", link: "/framework/contracts/systems" },
            { text: "Events", link: "/framework/contracts/events" },
            { text: "Macros", link: "/framework/contracts/macros" },
          ],
        },
        {
          text: "Models",
          collapsed: true,
          items: [
            { text: "Overview", link: "/framework/models" },
            { text: "Introspection", link: "/framework/models/introspect" },
            { text: "Entities", link: "/framework/models/entities" },
            { text: "Enum", link: "/framework/models/enum" },
          ],
        },
        {
          text: "Authorization",
          link: "/framework/authorization",
          collapsed: true,
          // TODO: Add more items
          items: [
            { text: "overlays", link: "/framework/authorization/overlays" },
          ],
        },
        {
          text: "Config",
          link: "/framework/config",
          collapsed: true,
          // TODO: Add more items
          items: [{ text: "dojo.toml", link: "/framework/config" }],
        },
        {
          text: "Testing",
          link: "/framework/testing",
          collapsed: true,
          items: [
            {
              text: "Testing cheat codes",
              link: "/framework/testing-cheat-codes",
            },
          ],
        },
      ],
    },
    {
      text: "Toolchain",
      items: [
        {
          text: "Katana",
          collapsed: true,
          items: [
            {
              text: "Overview",
              link: "/toolchain/katana",
            },
            {
              text: "CLI Reference",
              link: "/toolchain/katana/cli-reference",
            },
            {
              text: "JSON-RPC",
              link: "/toolchain/katana/rpc",
              collapsed: true,
              items: [
                {
                  text: "starknet",
                  link: "/toolchain/katana/rpc/starknet",
                },
                {
                  text: "katana",
                  link: "/toolchain/katana/rpc/katana",
                },
                {
                  text: "torii",
                  link: "/toolchain/katana/rpc/torii",
                },
                {
                  text: "dev",
                  link: "/toolchain/katana/rpc/dev",
                },
              ],
            },
            {
              text: "Mining modes",
              link: "/toolchain/katana/mining",
            },
            { text: "Forking", link: "/toolchain/katana/forking" },
            { text: "Genesis", link: "/toolchain/katana/genesis" },
            {
              text: "Execution engine",
              link: "/toolchain/katana/execution",
            },
            { text: "Storage", link: "/toolchain/katana/storage" },
            {
              text: "Transaction types",
              link: "/toolchain/katana/transactions",
            },
            {
              text: "Messaging",
              link: "/toolchain/katana/messaging",
            },
            { text: "Interact", link: "/toolchain/katana/interact" },
          ],
        },
        {
          text: "Torii",
          collapsed: true,
          items: [
            {
              text: "Overview",
              link: "/toolchain/torii",
            },
            { text: "Reference", link: "/toolchain/torii/reference" },
            { text: "Graphql", link: "/toolchain/torii/graphql" },
            { text: "gRPC", link: "/toolchain/torii/grpc" },
          ],
        },
        {
          text: "Sozo",
          collapsed: true,
          items: [
            {
              text: "Overview",
              link: "/toolchain/sozo",
            },
            {
              text: "Reference",
              collapsed: true,
              items: [
                {
                  text: "init",
                  link: "/toolchain/sozo/project-commands/init",
                },
                {
                  text: "profile",
                  link: "/toolchain/sozo/common-options/profile",
                },
                {
                  text: "offline",
                  link: "/toolchain/sozo/common-options/offline",
                },
                {
                  text: "build",
                  link: "/toolchain/sozo/project-commands/build",
                },
                {
                  text: "clean",
                  link: "/toolchain/sozo/project-commands/clean",
                },
                {
                  text: "test",
                  link: "/toolchain/sozo/project-commands/test",
                },
                {
                  text: "migrate",
                  link: "/toolchain/sozo/project-commands/migrate",
                },
                {
                  text: "execute",
                  link: "/toolchain/sozo/world-commands/execute",
                },
                {
                  text: "call",
                  link: "/toolchain/sozo/world-commands/call",
                },
                {
                  text: "register",
                  link: "/toolchain/sozo/world-commands/register",
                },
                {
                  text: "model",
                  link: "/toolchain/sozo/world-commands/model",
                },
                {
                  text: "events",
                  link: "/toolchain/sozo/world-commands/events",
                },
                {
                  text: "auth",
                  link: "/toolchain/sozo/world-commands/auth",
                },
                {
                  text: "account",
                  link: "/toolchain/sozo/world-commands/account",
                },
                {
                  text: "configruations",
                  link: "/toolchain/sozo/common-options/configurations",
                },
              ],
            },
          ],
        },
        { text: "Origami", link: "/toolchain/origami" },
        {
          text: "Slot",
          collapsed: true,
          items: [
            { text: "Overview", link: "/toolchain/slot" },
            {
              text: "Reference",
              link: "/toolchain/slot/reference",
              collapsed: true,
              items: [
                {
                  text: "Deployments",
                  collapsed: true,
                  items: [
                    {
                      text: "create",
                      link: "/toolchain/slot/deployment-commands/create",
                    },
                    {
                      text: "delete",
                      link: "/toolchain/slot/deployment-commands/delete",
                    },
                    {
                      text: "update",
                      link: "/toolchain/slot/deployment-commands/update",
                    },
                    {
                      text: "describe",
                      link: "/toolchain/slot/deployment-commands/describe",
                    },
                    {
                      text: "list",
                      link: "/toolchain/slot/deployment-commands/list",
                    },
                    {
                      text: "logs",
                      link: "/toolchain/slot/deployment-commands/logs",
                    },
                  ],
                },
              ],
            },
          ],
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
});
