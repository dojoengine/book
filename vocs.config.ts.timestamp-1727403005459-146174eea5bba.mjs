// vocs.config.ts
import { defineConfig } from "file:///Users/os/Documents/code/dojo/book/node_modules/.pnpm/vocs@1.0.0-alpha.47_@types+node@20.12.11_@types+react@18.3.1_react-dom@18.3.1_react@18.3.1__r_ivsctvfxaipsm6cxggieazivwe/node_modules/vocs/_lib/index.js";
var vocs_config_default = defineConfig({
  banner: "Join us in [Discord](https://discord.gg/dojoengine)!",
  title: "Dojo Documentation",
  iconUrl: "/dojo-favicon.svg",
  logoUrl: "/dojo-logo.svg",
  socials: [
    {
      icon: "github",
      link: "https://github.com/dojoengine/dojo"
    },
    {
      icon: "x",
      link: "https://x.com/ohayo_dojo"
    }
  ],
  editLink: {
    pattern: "https://github.com/dojoengine/book/blob/main/docs/pages/:path",
    text: "Edit on GitHub"
  },
  ogImageUrl: "https://vocs.dev/api/og?logo=%logo&title=%title&description=%description",
  description: "Dojo | A Toolchain for Building Provable Games and Applications",
  topNav: [
    { text: "Blog", link: "https://www.dojoengine.org/posts" },
    {
      text: "v1.0.0-alpha.13",
      items: [
        {
          text: "Releases",
          link: "https://github.com/dojoengine/dojo/releases"
        },
        {
          text: "Changelog",
          link: "https://github.com/dojoengine/dojo/releases"
        },
        {
          text: "Contributing",
          link: "https://github.com/dojoengine/dojo/blob/main/CONTRIBUTING.md"
        }
      ]
    }
  ],
  font: {
    google: "Poppins"
  },
  theme: {
    colorScheme: "dark",
    variables: {
      color: {
        textAccent: "#ee2d3f",
        background: "#0a0a0a",
        backgroundDark: "#0a0a0a"
      }
      // content: {
      //   horizontalPadding: "40px",
      // },
    }
  },
  sidebar: [
    {
      text: "Overview",
      link: "/"
    },
    {
      text: "Getting Started",
      link: "/getting-started"
    },
    {
      text: "Provable Apps",
      link: "/provable-apps"
    },
    {
      text: "FAQ",
      link: "/faq"
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
              link: "/framework/world/authorization"
            },
            { text: "Metadata", link: "/framework/world/metadata" }
          ]
        },
        {
          text: "Contracts",
          collapsed: true,
          items: [
            { text: "Overview", link: "/framework/contracts/" },
            { text: "Systems", link: "/framework/contracts/systems" },
            { text: "Events", link: "/framework/contracts/events" },
            { text: "Macros", link: "/framework/contracts/macros" }
          ]
        },
        {
          text: "Models",
          collapsed: true,
          items: [
            { text: "Overview", link: "/framework/models" },
            { text: "Introspection", link: "/framework/models/introspect" },
            { text: "Entities", link: "/framework/models/entities" },
            { text: "Enum", link: "/framework/models/enum" }
          ]
        },
        { text: "Config", link: "/framework/config" },
        { text: "Testing", link: "/framework/testing" },
        { text: "Testing cheat codes", link: "/framework/testing-cheat-codes" }
      ]
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
              link: "/toolchain/katana"
            },
            {
              text: "CLI Reference",
              link: "/toolchain/katana/cli-reference"
            },
            {
              text: "JSON-RPC",
              link: "/toolchain/katana/rpc",
              collapsed: true,
              items: [
                {
                  text: "starknet",
                  link: "/toolchain/katana/rpc/starknet"
                },
                {
                  text: "katana",
                  link: "/toolchain/katana/rpc/katana"
                },
                {
                  text: "torii",
                  link: "/toolchain/katana/rpc/torii"
                },
                {
                  text: "dev",
                  link: "/toolchain/katana/rpc/dev"
                }
              ]
            },
            {
              text: "Mining modes",
              link: "/toolchain/katana/mining"
            },
            { text: "Forking", link: "/toolchain/katana/forking" },
            { text: "Genesis", link: "/toolchain/katana/genesis" },
            {
              text: "Execution engine",
              link: "/toolchain/katana/execution"
            },
            { text: "Storage", link: "/toolchain/katana/storage" },
            {
              text: "Transaction types",
              link: "/toolchain/katana/transactions"
            },
            {
              text: "Messaging",
              link: "/toolchain/katana/messaging"
            },
            { text: "Interact", link: "/toolchain/katana/interact" }
          ]
        },
        {
          text: "Torii",
          collapsed: true,
          items: [
            {
              text: "Overview",
              link: "/toolchain/torii"
            },
            { text: "Reference", link: "/toolchain/torii/reference" },
            { text: "Graphql", link: "/toolchain/torii/graphql" },
            { text: "gRPC", link: "/toolchain/torii/grpc" }
          ]
        },
        {
          text: "Sozo",
          collapsed: true,
          items: [
            {
              text: "Overview",
              link: "/toolchain/sozo"
            },
            {
              text: "Reference",
              collapsed: true,
              items: [
                {
                  text: "init",
                  link: "/toolchain/sozo/project-commands/init"
                },
                {
                  text: "profile",
                  link: "/toolchain/sozo/common-options/profile"
                },
                {
                  text: "offline",
                  link: "/toolchain/sozo/common-options/offline"
                },
                {
                  text: "build",
                  link: "/toolchain/sozo/project-commands/build"
                },
                {
                  text: "clean",
                  link: "/toolchain/sozo/project-commands/clean"
                },
                {
                  text: "test",
                  link: "/toolchain/sozo/project-commands/test"
                },
                {
                  text: "migrate",
                  link: "/toolchain/sozo/project-commands/migrate"
                },
                {
                  text: "execute",
                  link: "/toolchain/sozo/world-commands/execute"
                },
                {
                  text: "call",
                  link: "/toolchain/sozo/world-commands/call"
                },
                {
                  text: "register",
                  link: "/toolchain/sozo/world-commands/register"
                },
                {
                  text: "model",
                  link: "/toolchain/sozo/world-commands/model"
                },
                {
                  text: "events",
                  link: "/toolchain/sozo/world-commands/events"
                },
                {
                  text: "auth",
                  link: "/toolchain/sozo/world-commands/auth"
                },
                {
                  text: "account",
                  link: "/toolchain/sozo/world-commands/account"
                },
                {
                  text: "configruations",
                  link: "/toolchain/sozo/common-options/configurations"
                }
              ]
            }
          ]
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
                      link: "/toolchain/slot/deployment-commands/create"
                    },
                    {
                      text: "delete",
                      link: "/toolchain/slot/deployment-commands/delete"
                    },
                    {
                      text: "update",
                      link: "/toolchain/slot/deployment-commands/update"
                    },
                    {
                      text: "describe",
                      link: "/toolchain/slot/deployment-commands/describe"
                    },
                    {
                      text: "list",
                      link: "/toolchain/slot/deployment-commands/list"
                    },
                    {
                      text: "logs",
                      link: "/toolchain/slot/deployment-commands/logs"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      text: "SDKs",
      items: [
        {
          text: "dojo.js",
          link: "/client/sdk/js/dojojs",
          collapsed: true,
          items: [
            {
              text: "Get Started",
              link: "/client/sdk/js/getting-started"
            },
            {
              text: "Packages",
              link: "/client/sdk/js/packages"
            },
            {
              text: "State Providers",
              collapsed: true,
              items: [
                {
                  text: "Recs",
                  link: "/client/sdk/js/recs"
                }
              ]
            },
            {
              text: "Dojo.js Concepts",
              link: "/client/sdk/js/concepts"
            },
            {
              text: "Common Problems",
              link: "/client/sdk/js/common-problems"
            },
            { text: "Example", link: "/client/sdk/js/example" }
          ]
        },
        {
          text: "dojo.unity",
          link: "/client/sdk/unity",
          collapsed: true,
          items: [
            {
              text: "Get Started",
              link: "/client/sdk/unity/get-started"
            },
            {
              text: "Dojo unity concepts",
              link: "/client/sdk/unity/important-concepts"
            },
            {
              text: "Common Problems",
              link: "/client/sdk/unity/common-problems"
            },
            { text: "Example", link: "/client/sdk/unity/example" }
          ]
        },
        { text: "dojo.c", link: "/client/sdk/c" }
      ]
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
          link: "/tutorial/deploy-using-slot/main"
        },
        {
          text: "Katana-Starkli-Scarb: Advanced example",
          link: "/tutorial/katana-starkli-scarb/main"
        }
      ]
    }
  ]
});
export {
  vocs_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidm9jcy5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvb3MvRG9jdW1lbnRzL2NvZGUvZG9qby9ib29rXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvb3MvRG9jdW1lbnRzL2NvZGUvZG9qby9ib29rL3ZvY3MuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9vcy9Eb2N1bWVudHMvY29kZS9kb2pvL2Jvb2svdm9jcy5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidm9jc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBiYW5uZXI6IFwiSm9pbiB1cyBpbiBbRGlzY29yZF0oaHR0cHM6Ly9kaXNjb3JkLmdnL2Rvam9lbmdpbmUpIVwiLFxuICB0aXRsZTogXCJEb2pvIERvY3VtZW50YXRpb25cIixcbiAgaWNvblVybDogXCIvZG9qby1mYXZpY29uLnN2Z1wiLFxuICBsb2dvVXJsOiBcIi9kb2pvLWxvZ28uc3ZnXCIsXG4gIHNvY2lhbHM6IFtcbiAgICB7XG4gICAgICBpY29uOiBcImdpdGh1YlwiLFxuXG4gICAgICBsaW5rOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9kb2pvZW5naW5lL2Rvam9cIixcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246IFwieFwiLFxuICAgICAgbGluazogXCJodHRwczovL3guY29tL29oYXlvX2Rvam9cIixcbiAgICB9LFxuICBdLFxuICBlZGl0TGluazoge1xuICAgIHBhdHRlcm46IFwiaHR0cHM6Ly9naXRodWIuY29tL2Rvam9lbmdpbmUvYm9vay9ibG9iL21haW4vZG9jcy9wYWdlcy86cGF0aFwiLFxuICAgIHRleHQ6IFwiRWRpdCBvbiBHaXRIdWJcIixcbiAgfSxcbiAgb2dJbWFnZVVybDpcbiAgICBcImh0dHBzOi8vdm9jcy5kZXYvYXBpL29nP2xvZ289JWxvZ28mdGl0bGU9JXRpdGxlJmRlc2NyaXB0aW9uPSVkZXNjcmlwdGlvblwiLFxuICBkZXNjcmlwdGlvbjpcbiAgICBcIkRvam8gfCBBIFRvb2xjaGFpbiBmb3IgQnVpbGRpbmcgUHJvdmFibGUgR2FtZXMgYW5kIEFwcGxpY2F0aW9uc1wiLFxuICB0b3BOYXY6IFtcbiAgICB7IHRleHQ6IFwiQmxvZ1wiLCBsaW5rOiBcImh0dHBzOi8vd3d3LmRvam9lbmdpbmUub3JnL3Bvc3RzXCIgfSxcbiAgICB7XG4gICAgICB0ZXh0OiBcInYxLjAuMC1hbHBoYS4xM1wiLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6IFwiUmVsZWFzZXNcIixcbiAgICAgICAgICBsaW5rOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9kb2pvZW5naW5lL2Rvam8vcmVsZWFzZXNcIixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6IFwiQ2hhbmdlbG9nXCIsXG4gICAgICAgICAgbGluazogXCJodHRwczovL2dpdGh1Yi5jb20vZG9qb2VuZ2luZS9kb2pvL3JlbGVhc2VzXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiBcIkNvbnRyaWJ1dGluZ1wiLFxuICAgICAgICAgIGxpbms6IFwiaHR0cHM6Ly9naXRodWIuY29tL2Rvam9lbmdpbmUvZG9qby9ibG9iL21haW4vQ09OVFJJQlVUSU5HLm1kXCIsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gIF0sXG4gIGZvbnQ6IHtcbiAgICBnb29nbGU6IFwiUG9wcGluc1wiLFxuICB9LFxuICB0aGVtZToge1xuICAgIGNvbG9yU2NoZW1lOiBcImRhcmtcIixcbiAgICB2YXJpYWJsZXM6IHtcbiAgICAgIGNvbG9yOiB7XG4gICAgICAgIHRleHRBY2NlbnQ6IFwiI2VlMmQzZlwiLFxuICAgICAgICBiYWNrZ3JvdW5kOiBcIiMwYTBhMGFcIixcbiAgICAgICAgYmFja2dyb3VuZERhcms6IFwiIzBhMGEwYVwiLFxuICAgICAgfSxcbiAgICAgIC8vIGNvbnRlbnQ6IHtcbiAgICAgIC8vICAgaG9yaXpvbnRhbFBhZGRpbmc6IFwiNDBweFwiLFxuICAgICAgLy8gfSxcbiAgICB9LFxuICB9LFxuICBzaWRlYmFyOiBbXG4gICAge1xuICAgICAgdGV4dDogXCJPdmVydmlld1wiLFxuICAgICAgbGluazogXCIvXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiBcIkdldHRpbmcgU3RhcnRlZFwiLFxuICAgICAgbGluazogXCIvZ2V0dGluZy1zdGFydGVkXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiBcIlByb3ZhYmxlIEFwcHNcIixcbiAgICAgIGxpbms6IFwiL3Byb3ZhYmxlLWFwcHNcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6IFwiRkFRXCIsXG4gICAgICBsaW5rOiBcIi9mYXFcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6IFwiRnJhbWV3b3JrXCIsXG4gICAgICBpdGVtczogW1xuICAgICAgICB7IHRleHQ6IFwiT3ZlcnZpZXdcIiwgbGluazogXCIvZnJhbWV3b3JrXCIgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6IFwiV29ybGRcIixcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHsgdGV4dDogXCJPdmVydmlld1wiLCBsaW5rOiBcIi9mcmFtZXdvcmsvd29ybGRcIiB9LFxuICAgICAgICAgICAgeyB0ZXh0OiBcIkV2ZW50c1wiLCBsaW5rOiBcIi9mcmFtZXdvcmsvd29ybGQvZXZlbnRzXCIgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogXCJBdXRob3JpemF0aW9uXCIsXG4gICAgICAgICAgICAgIGxpbms6IFwiL2ZyYW1ld29yay93b3JsZC9hdXRob3JpemF0aW9uXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyB0ZXh0OiBcIk1ldGFkYXRhXCIsIGxpbms6IFwiL2ZyYW1ld29yay93b3JsZC9tZXRhZGF0YVwiIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6IFwiQ29udHJhY3RzXCIsXG4gICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7IHRleHQ6IFwiT3ZlcnZpZXdcIiwgbGluazogXCIvZnJhbWV3b3JrL2NvbnRyYWN0cy9cIiB9LFxuICAgICAgICAgICAgeyB0ZXh0OiBcIlN5c3RlbXNcIiwgbGluazogXCIvZnJhbWV3b3JrL2NvbnRyYWN0cy9zeXN0ZW1zXCIgfSxcbiAgICAgICAgICAgIHsgdGV4dDogXCJFdmVudHNcIiwgbGluazogXCIvZnJhbWV3b3JrL2NvbnRyYWN0cy9ldmVudHNcIiB9LFxuICAgICAgICAgICAgeyB0ZXh0OiBcIk1hY3Jvc1wiLCBsaW5rOiBcIi9mcmFtZXdvcmsvY29udHJhY3RzL21hY3Jvc1wiIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6IFwiTW9kZWxzXCIsXG4gICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7IHRleHQ6IFwiT3ZlcnZpZXdcIiwgbGluazogXCIvZnJhbWV3b3JrL21vZGVsc1wiIH0sXG4gICAgICAgICAgICB7IHRleHQ6IFwiSW50cm9zcGVjdGlvblwiLCBsaW5rOiBcIi9mcmFtZXdvcmsvbW9kZWxzL2ludHJvc3BlY3RcIiB9LFxuICAgICAgICAgICAgeyB0ZXh0OiBcIkVudGl0aWVzXCIsIGxpbms6IFwiL2ZyYW1ld29yay9tb2RlbHMvZW50aXRpZXNcIiB9LFxuICAgICAgICAgICAgeyB0ZXh0OiBcIkVudW1cIiwgbGluazogXCIvZnJhbWV3b3JrL21vZGVscy9lbnVtXCIgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICB7IHRleHQ6IFwiQ29uZmlnXCIsIGxpbms6IFwiL2ZyYW1ld29yay9jb25maWdcIiB9LFxuICAgICAgICB7IHRleHQ6IFwiVGVzdGluZ1wiLCBsaW5rOiBcIi9mcmFtZXdvcmsvdGVzdGluZ1wiIH0sXG4gICAgICAgIHsgdGV4dDogXCJUZXN0aW5nIGNoZWF0IGNvZGVzXCIsIGxpbms6IFwiL2ZyYW1ld29yay90ZXN0aW5nLWNoZWF0LWNvZGVzXCIgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiBcIlRvb2xjaGFpblwiLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6IFwiS2F0YW5hXCIsXG4gICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6IFwiT3ZlcnZpZXdcIixcbiAgICAgICAgICAgICAgbGluazogXCIvdG9vbGNoYWluL2thdGFuYVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogXCJDTEkgUmVmZXJlbmNlXCIsXG4gICAgICAgICAgICAgIGxpbms6IFwiL3Rvb2xjaGFpbi9rYXRhbmEvY2xpLXJlZmVyZW5jZVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogXCJKU09OLVJQQ1wiLFxuICAgICAgICAgICAgICBsaW5rOiBcIi90b29sY2hhaW4va2F0YW5hL3JwY1wiLFxuICAgICAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdGV4dDogXCJzdGFya25ldFwiLFxuICAgICAgICAgICAgICAgICAgbGluazogXCIvdG9vbGNoYWluL2thdGFuYS9ycGMvc3RhcmtuZXRcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6IFwia2F0YW5hXCIsXG4gICAgICAgICAgICAgICAgICBsaW5rOiBcIi90b29sY2hhaW4va2F0YW5hL3JwYy9rYXRhbmFcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6IFwidG9yaWlcIixcbiAgICAgICAgICAgICAgICAgIGxpbms6IFwiL3Rvb2xjaGFpbi9rYXRhbmEvcnBjL3RvcmlpXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiBcImRldlwiLFxuICAgICAgICAgICAgICAgICAgbGluazogXCIvdG9vbGNoYWluL2thdGFuYS9ycGMvZGV2XCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6IFwiTWluaW5nIG1vZGVzXCIsXG4gICAgICAgICAgICAgIGxpbms6IFwiL3Rvb2xjaGFpbi9rYXRhbmEvbWluaW5nXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyB0ZXh0OiBcIkZvcmtpbmdcIiwgbGluazogXCIvdG9vbGNoYWluL2thdGFuYS9mb3JraW5nXCIgfSxcbiAgICAgICAgICAgIHsgdGV4dDogXCJHZW5lc2lzXCIsIGxpbms6IFwiL3Rvb2xjaGFpbi9rYXRhbmEvZ2VuZXNpc1wiIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6IFwiRXhlY3V0aW9uIGVuZ2luZVwiLFxuICAgICAgICAgICAgICBsaW5rOiBcIi90b29sY2hhaW4va2F0YW5hL2V4ZWN1dGlvblwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgdGV4dDogXCJTdG9yYWdlXCIsIGxpbms6IFwiL3Rvb2xjaGFpbi9rYXRhbmEvc3RvcmFnZVwiIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6IFwiVHJhbnNhY3Rpb24gdHlwZXNcIixcbiAgICAgICAgICAgICAgbGluazogXCIvdG9vbGNoYWluL2thdGFuYS90cmFuc2FjdGlvbnNcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6IFwiTWVzc2FnaW5nXCIsXG4gICAgICAgICAgICAgIGxpbms6IFwiL3Rvb2xjaGFpbi9rYXRhbmEvbWVzc2FnaW5nXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyB0ZXh0OiBcIkludGVyYWN0XCIsIGxpbms6IFwiL3Rvb2xjaGFpbi9rYXRhbmEvaW50ZXJhY3RcIiB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiBcIlRvcmlpXCIsXG4gICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6IFwiT3ZlcnZpZXdcIixcbiAgICAgICAgICAgICAgbGluazogXCIvdG9vbGNoYWluL3RvcmlpXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyB0ZXh0OiBcIlJlZmVyZW5jZVwiLCBsaW5rOiBcIi90b29sY2hhaW4vdG9yaWkvcmVmZXJlbmNlXCIgfSxcbiAgICAgICAgICAgIHsgdGV4dDogXCJHcmFwaHFsXCIsIGxpbms6IFwiL3Rvb2xjaGFpbi90b3JpaS9ncmFwaHFsXCIgfSxcbiAgICAgICAgICAgIHsgdGV4dDogXCJnUlBDXCIsIGxpbms6IFwiL3Rvb2xjaGFpbi90b3JpaS9ncnBjXCIgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogXCJTb3pvXCIsXG4gICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6IFwiT3ZlcnZpZXdcIixcbiAgICAgICAgICAgICAgbGluazogXCIvdG9vbGNoYWluL3Nvem9cIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6IFwiUmVmZXJlbmNlXCIsXG4gICAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiBcImluaXRcIixcbiAgICAgICAgICAgICAgICAgIGxpbms6IFwiL3Rvb2xjaGFpbi9zb3pvL3Byb2plY3QtY29tbWFuZHMvaW5pdFwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdGV4dDogXCJwcm9maWxlXCIsXG4gICAgICAgICAgICAgICAgICBsaW5rOiBcIi90b29sY2hhaW4vc296by9jb21tb24tb3B0aW9ucy9wcm9maWxlXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiBcIm9mZmxpbmVcIixcbiAgICAgICAgICAgICAgICAgIGxpbms6IFwiL3Rvb2xjaGFpbi9zb3pvL2NvbW1vbi1vcHRpb25zL29mZmxpbmVcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6IFwiYnVpbGRcIixcbiAgICAgICAgICAgICAgICAgIGxpbms6IFwiL3Rvb2xjaGFpbi9zb3pvL3Byb2plY3QtY29tbWFuZHMvYnVpbGRcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6IFwiY2xlYW5cIixcbiAgICAgICAgICAgICAgICAgIGxpbms6IFwiL3Rvb2xjaGFpbi9zb3pvL3Byb2plY3QtY29tbWFuZHMvY2xlYW5cIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6IFwidGVzdFwiLFxuICAgICAgICAgICAgICAgICAgbGluazogXCIvdG9vbGNoYWluL3Nvem8vcHJvamVjdC1jb21tYW5kcy90ZXN0XCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiBcIm1pZ3JhdGVcIixcbiAgICAgICAgICAgICAgICAgIGxpbms6IFwiL3Rvb2xjaGFpbi9zb3pvL3Byb2plY3QtY29tbWFuZHMvbWlncmF0ZVwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdGV4dDogXCJleGVjdXRlXCIsXG4gICAgICAgICAgICAgICAgICBsaW5rOiBcIi90b29sY2hhaW4vc296by93b3JsZC1jb21tYW5kcy9leGVjdXRlXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiBcImNhbGxcIixcbiAgICAgICAgICAgICAgICAgIGxpbms6IFwiL3Rvb2xjaGFpbi9zb3pvL3dvcmxkLWNvbW1hbmRzL2NhbGxcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6IFwicmVnaXN0ZXJcIixcbiAgICAgICAgICAgICAgICAgIGxpbms6IFwiL3Rvb2xjaGFpbi9zb3pvL3dvcmxkLWNvbW1hbmRzL3JlZ2lzdGVyXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiBcIm1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICBsaW5rOiBcIi90b29sY2hhaW4vc296by93b3JsZC1jb21tYW5kcy9tb2RlbFwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdGV4dDogXCJldmVudHNcIixcbiAgICAgICAgICAgICAgICAgIGxpbms6IFwiL3Rvb2xjaGFpbi9zb3pvL3dvcmxkLWNvbW1hbmRzL2V2ZW50c1wiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdGV4dDogXCJhdXRoXCIsXG4gICAgICAgICAgICAgICAgICBsaW5rOiBcIi90b29sY2hhaW4vc296by93b3JsZC1jb21tYW5kcy9hdXRoXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiBcImFjY291bnRcIixcbiAgICAgICAgICAgICAgICAgIGxpbms6IFwiL3Rvb2xjaGFpbi9zb3pvL3dvcmxkLWNvbW1hbmRzL2FjY291bnRcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6IFwiY29uZmlncnVhdGlvbnNcIixcbiAgICAgICAgICAgICAgICAgIGxpbms6IFwiL3Rvb2xjaGFpbi9zb3pvL2NvbW1vbi1vcHRpb25zL2NvbmZpZ3VyYXRpb25zXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAgeyB0ZXh0OiBcIk9yaWdhbWlcIiwgbGluazogXCIvdG9vbGNoYWluL29yaWdhbWlcIiB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogXCJTbG90XCIsXG4gICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7IHRleHQ6IFwiT3ZlcnZpZXdcIiwgbGluazogXCIvdG9vbGNoYWluL3Nsb3RcIiB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiBcIlJlZmVyZW5jZVwiLFxuICAgICAgICAgICAgICBsaW5rOiBcIi90b29sY2hhaW4vc2xvdC9yZWZlcmVuY2VcIixcbiAgICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVwbG95bWVudHNcIixcbiAgICAgICAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcImNyZWF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIGxpbms6IFwiL3Rvb2xjaGFpbi9zbG90L2RlcGxveW1lbnQtY29tbWFuZHMvY3JlYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcImRlbGV0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIGxpbms6IFwiL3Rvb2xjaGFpbi9zbG90L2RlcGxveW1lbnQtY29tbWFuZHMvZGVsZXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcInVwZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIGxpbms6IFwiL3Rvb2xjaGFpbi9zbG90L2RlcGxveW1lbnQtY29tbWFuZHMvdXBkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcImRlc2NyaWJlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbGluazogXCIvdG9vbGNoYWluL3Nsb3QvZGVwbG95bWVudC1jb21tYW5kcy9kZXNjcmliZVwiLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJsaXN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgbGluazogXCIvdG9vbGNoYWluL3Nsb3QvZGVwbG95bWVudC1jb21tYW5kcy9saXN0XCIsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcImxvZ3NcIixcbiAgICAgICAgICAgICAgICAgICAgICBsaW5rOiBcIi90b29sY2hhaW4vc2xvdC9kZXBsb3ltZW50LWNvbW1hbmRzL2xvZ3NcIixcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiBcIlNES3NcIixcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiBcImRvam8uanNcIixcbiAgICAgICAgICBsaW5rOiBcIi9jbGllbnQvc2RrL2pzL2Rvam9qc1wiLFxuICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiBcIkdldCBTdGFydGVkXCIsXG4gICAgICAgICAgICAgIGxpbms6IFwiL2NsaWVudC9zZGsvanMvZ2V0dGluZy1zdGFydGVkXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiBcIlBhY2thZ2VzXCIsXG4gICAgICAgICAgICAgIGxpbms6IFwiL2NsaWVudC9zZGsvanMvcGFja2FnZXNcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6IFwiU3RhdGUgUHJvdmlkZXJzXCIsXG5cbiAgICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6IFwiUmVjc1wiLFxuICAgICAgICAgICAgICAgICAgbGluazogXCIvY2xpZW50L3Nkay9qcy9yZWNzXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6IFwiRG9qby5qcyBDb25jZXB0c1wiLFxuICAgICAgICAgICAgICBsaW5rOiBcIi9jbGllbnQvc2RrL2pzL2NvbmNlcHRzXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiBcIkNvbW1vbiBQcm9ibGVtc1wiLFxuICAgICAgICAgICAgICBsaW5rOiBcIi9jbGllbnQvc2RrL2pzL2NvbW1vbi1wcm9ibGVtc1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgdGV4dDogXCJFeGFtcGxlXCIsIGxpbms6IFwiL2NsaWVudC9zZGsvanMvZXhhbXBsZVwiIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6IFwiZG9qby51bml0eVwiLFxuICAgICAgICAgIGxpbms6IFwiL2NsaWVudC9zZGsvdW5pdHlcIixcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogXCJHZXQgU3RhcnRlZFwiLFxuICAgICAgICAgICAgICBsaW5rOiBcIi9jbGllbnQvc2RrL3VuaXR5L2dldC1zdGFydGVkXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiBcIkRvam8gdW5pdHkgY29uY2VwdHNcIixcbiAgICAgICAgICAgICAgbGluazogXCIvY2xpZW50L3Nkay91bml0eS9pbXBvcnRhbnQtY29uY2VwdHNcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6IFwiQ29tbW9uIFByb2JsZW1zXCIsXG4gICAgICAgICAgICAgIGxpbms6IFwiL2NsaWVudC9zZGsvdW5pdHkvY29tbW9uLXByb2JsZW1zXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyB0ZXh0OiBcIkV4YW1wbGVcIiwgbGluazogXCIvY2xpZW50L3Nkay91bml0eS9leGFtcGxlXCIgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICB7IHRleHQ6IFwiZG9qby5jXCIsIGxpbms6IFwiL2NsaWVudC9zZGsvY1wiIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogXCJHdWlkZXNcIixcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHsgdGV4dDogXCJEb2pvIHN0YXJ0ZXJcIiwgbGluazogXCIvdHV0b3JpYWwvZG9qby1zdGFydGVyXCIgfSxcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgIHRleHQ6IFwiT25jaGFpbiBDaGVzc1wiLFxuICAgICAgICAvLyAgIGxpbms6IFwiL3R1dG9yaWFsL29uY2hhaW4tY2hlc3MvUkVBRE1FXCIsXG4gICAgICAgIC8vICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAvLyAgIGl0ZW1zOiBbXG4gICAgICAgIC8vICAgICB7IHRleHQ6IFwiMC4gU2V0dXBcIiwgbGluazogXCIvdHV0b3JpYWwvb25jaGFpbi1jaGVzcy8wLXNldHVwXCIgfSxcbiAgICAgICAgLy8gICAgIHsgdGV4dDogXCIxLiBJbml0aWF0ZVwiLCBsaW5rOiBcIi90dXRvcmlhbC9vbmNoYWluLWNoZXNzLzEtYWN0aW9uXCIgfSxcbiAgICAgICAgLy8gICAgIHsgdGV4dDogXCIyLiBNb3ZlXCIsIGxpbms6IFwiL3R1dG9yaWFsL29uY2hhaW4tY2hlc3MvMi1tb3ZlXCIgfSxcbiAgICAgICAgLy8gICAgIHsgdGV4dDogXCIzLiBUZXN0IENoZXNzXCIsIGxpbms6IFwiL3R1dG9yaWFsL29uY2hhaW4tY2hlc3MvMy10ZXN0XCIgfSxcbiAgICAgICAgLy8gICBdLFxuICAgICAgICAvLyB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogXCJEZXBsb3kgdXNpbmcgU2xvdFwiLFxuICAgICAgICAgIGxpbms6IFwiL3R1dG9yaWFsL2RlcGxveS11c2luZy1zbG90L21haW5cIixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6IFwiS2F0YW5hLVN0YXJrbGktU2NhcmI6IEFkdmFuY2VkIGV4YW1wbGVcIixcbiAgICAgICAgICBsaW5rOiBcIi90dXRvcmlhbC9rYXRhbmEtc3RhcmtsaS1zY2FyYi9tYWluXCIsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gIF0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1IsU0FBUyxvQkFBb0I7QUFFclQsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsUUFBUTtBQUFBLEVBQ1IsT0FBTztBQUFBLEVBQ1AsU0FBUztBQUFBLEVBQ1QsU0FBUztBQUFBLEVBQ1QsU0FBUztBQUFBLElBQ1A7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUVOLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQUEsRUFDQSxVQUFVO0FBQUEsSUFDUixTQUFTO0FBQUEsSUFDVCxNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsWUFDRTtBQUFBLEVBQ0YsYUFDRTtBQUFBLEVBQ0YsUUFBUTtBQUFBLElBQ04sRUFBRSxNQUFNLFFBQVEsTUFBTSxtQ0FBbUM7QUFBQSxJQUN6RDtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFB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WUFDUjtBQUFBLFlBQ0E7QUFBQSxjQUNFLE1BQU07QUFBQSxjQUNOLFdBQVc7QUFBQSxjQUNYLE9BQU87QUFBQSxnQkFDTDtBQUFBLGtCQUNFLE1BQU07QUFBQSxrQkFDTixNQUFNO0FBQUEsZ0JBQ1I7QUFBQSxnQkFDQTtBQUFBLGtCQUNFLE1BQU07QUFBQSxrQkFDTixNQUFNO0FBQUEsZ0JBQ1I7QUFBQSxnQkFDQTtBQUFBLGtCQUNFLE1BQU07QUFBQSxrQkFDTixNQUFNO0FBQUEsZ0JBQ1I7QUFBQSxnQkFDQTtBQUFBLGtCQUNFLE1BQU07QUFBQSxrQkFDTixNQUFNO0FBQUEsZ0JBQ1I7QUFBQSxnQkFDQTtBQUFBLGtCQUNFLE1BQU07QUFBQSxrQkFDTixNQUFNO0FBQUEsZ0JBQ1I7QUFBQSxnQkFDQTtBQUFBLGtCQUNFLE1BQU07QUFBQSxrQkFDTixNQUFNO0FBQUEsZ0JBQ1I7QUFBQSxnQkFDQTtBQUFBLGtCQUNFLE1BQU07QUFBQSxrQkFDTixNQUFNO0FBQUEsZ0JBQ1I7QUFBQSxnQkFDQTtBQUFBLGtCQUNFLE1BQU07QUFBQSxrQkFDTixNQUFNO0FBQUEsZ0JBQ1I7QUFBQSxnQkFDQTtBQUFBLGtCQUNFLE1BQU07QUFBQSxrQkFDTixNQUFNO0FBQUEsZ0JBQ1I7QUFBQSxnQkFDQTtBQUFBLGtCQUNFLE1BQU07QUFBQSxrQkFDTixNQUFNO0FBQUEsZ0JBQ1I7QUFBQSxnQkFDQTtBQUFBLGtCQUNFLE1BQU07QUFBQSxrQkFDTixNQUFNO0FBQUEsZ0JBQ1I7QUFBQSxnQkFDQTtBQUFBLGtCQUNFLE1BQU07QUFBQSxrQkFDTixNQUFNO0FBQUEsZ0JBQ1I7QUFBQSxnQkFDQTtBQUFBLGtCQUNFLE1BQU07QUFBQSxrQkFDTixNQUFNO0FBQUEsZ0JBQ1I7QUFBQSxnQkFDQTtBQUFBLGtCQUNFLE1BQU07QUFBQSxrQkFDTixNQUFNO0FBQUEsZ0JBQ1I7QUFBQSxnQkFDQTtBQUFBLGtCQUNFLE1BQU07QUFBQSxrQkFDTixNQUFNO0FBQUEsZ0JBQ1I7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7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
