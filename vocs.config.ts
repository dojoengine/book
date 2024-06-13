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
      text: "Framework",
      items: [
        { text: "Overview", link: "/framework" },
        {
          text: "World",
          collapsed: true,
          items: [
            { text: "Overview", link: "/framework/world" },
            { text: "Events", link: "/framework/world/events" },
            {
              text: "Authorization",
              link: "/framework/world/authorization",
            },
            { text: "Metadata", link: "/framework/world/metadata" },
          ],
        },
        {
          text: "Contracts",
          collapsed: true,
          items: [
            { text: "Overview", link: "/framework/contracts/" },
            { text: "Systems", link: "/framework/contracts/systems" },
            { text: "Events", link: "/framework/systems/events" },
            { text: "Macros", link: "/framework/systems/macros" },
          ],
        },
        {
          text: "Models",
          collapsed: true,
          items: [
            { text: "Overview", link: "/framework/models" },
            { text: "Enum", link: "/framework/models/enum" },
            { text: "Entities", link: "/framework/models/entities" },
          ],
        },
        { text: "Config", link: "/framework/config" },
        { text: "Testing", link: "/framework/testing" },
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
        { text: "Dojo starter", link: "/tutorial/dojo-starter" },
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
});
