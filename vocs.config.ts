import { defineConfig } from "vocs";

export default defineConfig({
  banner: "Join us in [Discord](https://discord.gg/dojoengine)!",
  title: "Dojo Documentation",
  iconUrl: "/dojo-favicon.svg",
  logoUrl: "/dojo-logo.svg",
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
    { text: "Blog", link: "https://www.dojoengine.org/en/articles" },
    {
      text: "0.6.0",
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
    google: "Poppins",
  },
  theme: {
    colorScheme: "dark",
    variables: {
      color: {
        textAccent: "#A7C9F8",
        background: "#0D1D3D",
        backgroundDark: "#041028",
      },
      content: {
        horizontalPadding: "40px",
      },
    },
  },
  sidebar: [
    {
      text: "Overview",
      link: "/",
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
      text: "Toolchain",
      items: [
        {
          text: "Architecture",
          link: "/toolchain/framework",
          collapsed: true,
          items: [
            { text: "World", link: "/toolchain/framework/world" },
            { text: "Systems", link: "/toolchain/framework/systems" },
            { text: "Models", link: "/toolchain/framework/models" },
            { text: "Macros", link: "/toolchain/framework/macros" },
            { text: "Config", link: "/toolchain/framework/config" },
            { text: "Events", link: "/toolchain/framework/events" },
            {
              text: "Authorization",
              link: "/toolchain/framework/authorization",
            },
            { text: "Metadata", link: "/toolchain/framework/metadata" },
            { text: "Enum", link: "/toolchain/framework/enum" },
            { text: "Entities", link: "/toolchain/framework/entities" },
            { text: "Testing", link: "/toolchain/framework/testing" },
          ],
        },
        {
          text: "Katana",
          collapsed: true,
          link: "/toolchain/katana",
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
          link: "/toolchain/torii",
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
          link: "/toolchain/sozo",
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
              ],
            },
          ],
        },
        { text: "Origami", link: "/toolchain/origami" },
        {
          text: "Slot",
          collapsed: true,
          link: "/toolchain/slot",
          items: [
            { text: "Reference", link: "/toolchain/slot/reference" },
            {
              text: "Deployments",
              link: "/toolchain/slot/deployments-commands/deployments",
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
          link: "/client/sdk/js/dojojs",
          collapsed: true,
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
      ],
    },
    {
      text: "Guides",
      items: [
        { text: "ECS in 15 minutes", link: "/tutorial/dojo-starter" },
        // {
        //   text: "Onchain Chess",
        //   link: "/tutorial/onchain-chess/README",
        //   collapsed: true,
        //   items: [
        //     { text: "0. Setup", link: "/tutorial/onchain-chess/0-setup" },
        //     { text: "1. Initiate", link: "/tutorial/onchain-chess/1-action" },
        //     { text: "2. Move", link: "/tutorial/onchain-chess/2-move" },
        //     { text: "3. Test Chess", link: "/tutorial/onchain-chess/3-test" },
        //   ],
        // },
        {
          text: "Deploy using Slot",
          link: "/tutorial/deploy-using-slot/main",
        },
        {
          text: "Katana-Starkli-Scarb: Advanced example",
          link: "/tutorial/katana-starkli-scarb/main",
        },
      ],
    },
  ],
  sponsors: [
    {
      name: "Built in collaboration with",
      height: 60,
      items: [
        [
          {
            name: "Cartridge",
            link: "https://cartridge.gg/",
            image: "/Cartridge.svg",
          },
        ],
        [
          {
            name: "Starkware",
            link: "https://starkware.co/",
            image: "/Starkware.svg",
          },
          {
            name: "Starknet",
            link: "https://starknet.io/",
            image: "/Starknet.svg",
          },
        ],
      ],
    },
    {
      name: "Powering Worlds",
      height: 60,
      items: [
        [
          {
            name: "Realms World",
            link: "https://realms.world",
            image: "/RealmsWorld.svg",
          },
          {
            name: "Dope World",
            link: "https://dopewars.xyz/",
            image: "/Dope.svg",
          },
        ],
      ],
    },
  ],
});
