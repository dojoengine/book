export const routes = [
    { text: "Overview", link: "/overview" },
    { text: "Installation", link: "/installation" },
    { text: "FAQ", link: "/faq" },
    // Blog section - currently not surfaced
    // {
    // 	text: "Blog",
    // 	items: [
    // 		{ text: "Overview", link: "/blog" },
    // 		{ text: "Provable Games", link: "/blog/provable-games" },
    // 	],
    // },
    {
        text: "Getting Started",
        items: [
            { text: "Learning Path", link: "/getting-started" },
            {
                text: "Your First Dojo App",
                link: "/getting-started/your-first-dojo-app",
            },
            {
                text: "Understanding the Toolchain",
                link: "/getting-started/understanding-the-toolchain",
            },
            // These pages are WIP
            // { text: "Development Workflow", link: "/getting-started/development-workflow" },
            // { text: "Next Steps", link: "/getting-started/next-steps" },
        ],
    },
    {
        text: "Tutorials",
        items: [
            { text: "Dojo 101", link: "/tutorials/dojo-starter" },
            {
                text: "Deploy to Mainnet",
                link: "/tutorials/deploy-to-mainnet/main",
            },
            {
                text: "Deploy using Slot",
                link: "/tutorials/deploy-using-slot/main",
            },
            // Additional tutorials - currently not surfaced
            // { text: "Tutorial Overview", link: "/tutorials" },
            // { text: "Advanced Concepts", link: "/tutorials/advanced" },
            // { text: "React Integration", link: "/tutorials/react" },
            // { text: "Dojo + React", link: "/tutorials/dojo-react" },
            // { text: "Katana + Starkli + Scarb", link: "/tutorials/katana-starkli-scarb/main" },
            // Onchain Chess tutorial series (5 parts)
            // { text: "Onchain Chess Setup", link: "/tutorials/onchain-chess/0-setup" },
            // { text: "Chess Actions", link: "/tutorials/onchain-chess/1-action" },
            // { text: "Chess Moves", link: "/tutorials/onchain-chess/2-move" },
            // { text: "Chess Testing", link: "/tutorials/onchain-chess/3-test" },
        ],
    },
    {
        text: "Framework",
        items: [
            { text: "Overview", link: "/framework" },
            { text: "Configuration", link: "/framework/configuration" },
            {
                text: "World",
                collapsed: true,
                items: [
                    { text: "Overview", link: "/framework/world" },
                    {
                        text: "Permissions",
                        link: "/framework/world/permissions",
                    },
                    { text: "Events", link: "/framework/world/events" },
                    { text: "Metadata", link: "/framework/world/metadata" },
                    { text: "API", link: "/framework/world/api" },
                ],
            },
            {
                text: "Models",
                collapsed: true,
                items: [
                    { text: "Overview", link: "/framework/models" },
                    { text: "Entities", link: "/framework/models/entities" },
                    { text: "Enums", link: "/framework/models/enums" },
                    {
                        text: "Introspection",
                        link: "/framework/models/introspection",
                    },
                    { text: "Upgrades", link: "/framework/models/upgrades" },
                    { text: "API", link: "/framework/models/api" },
                ],
            },
            {
                text: "Systems",
                collapsed: true,
                items: [
                    { text: "Overview", link: "/framework/systems" },
                    {
                        text: "Architecture",
                        link: "/framework/systems/architecture",
                    },
                    {
                        text: "Coordination",
                        link: "/framework/systems/coordination",
                    },
                ],
            },
            {
                text: "Testing",
                collapsed: true,
                items: [
                    { text: "Overview", link: "/framework/testing" },
                    {
                        text: "Cheat Codes",
                        link: "/framework/testing/cheat-codes",
                    },
                ],
            },
            {
                text: "Upgrading",
                collapsed: true,
                items: [
                    { text: "Overview", link: "/framework/upgrading" },
                    { text: "Dojo 1.7", link: "/framework/upgrading/dojo-1-7" },
                    { text: "Dojo 1.0", link: "/framework/upgrading/dojo-1-0" },
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
                    { text: "Overview", link: "/toolchain/katana" },
                    {
                        text: "Configuration Guide",
                        link: "/toolchain/katana/configuration",
                    },
                    {
                        text: "Development Features",
                        link: "/toolchain/katana/development",
                    },
                    {
                        text: "CLI and RPC Reference",
                        link: "/toolchain/katana/reference",
                    },
                    {
                        text: "Advanced Features",
                        link: "/toolchain/katana/advanced",
                    },
                ],
            },
            {
                text: "Torii",
                collapsed: true,
                items: [
                    { text: "Overview", link: "/toolchain/torii" },
                    {
                        text: "Configuration Guide",
                        link: "/toolchain/torii/configuration",
                    },
                    {
                        text: "Graphql API Reference",
                        link: "/toolchain/torii/graphql",
                    },
                    {
                        text: "gRPC API Reference",
                        link: "/toolchain/torii/grpc",
                    },
                    { text: "SQL API Reference", link: "/toolchain/torii/sql" },
                ],
            },
            {
                text: "Sozo",
                collapsed: true,
                items: [
                    { text: "Overview", link: "/toolchain/sozo" },
                    {
                        text: "Project Management",
                        link: "/toolchain/sozo/project-management",
                    },
                    {
                        text: "World Interaction",
                        link: "/toolchain/sozo/world-interaction",
                    },
                    {
                        text: "Binding Generation",
                        link: "/toolchain/sozo/binding-generation",
                    },
                ],
            },
            {
                text: "Saya",
                collapsed: true,
                items: [
                    { text: "Overview", link: "/toolchain/saya" },
                    {
                        text: "Persistent Mode",
                        link: "/toolchain/saya/persistent",
                    },
                    {
                        text: "Sovereign Mode",
                        link: "/toolchain/saya/sovereign",
                    },
                ],
            },
            { text: "Cainome", link: "/toolchain/cainome" },
        ],
    },
    {
        text: "Scaling",
        items: [
            { text: "Execution Sharding", link: "/scaling/execution-sharding" },
            { text: "Sovereign Rollups", link: "/scaling/sovereign-rollups" },
        ],
    },
    {
        text: "Libraries",
        items: [
            { text: "Origami", link: "/libraries/origami" },
            { text: "Alexandria", link: "/libraries/alexandria" },
        ],
    },
    // Theory section - currently not surfaced
    // {
    // 	text: "Theory",
    // 	items: [
    // 		{ text: "Autonomous Worlds", link: "/theory/autonomous-worlds" },
    // 	],
    // },
    {
        text: "SDKs",
        items: [
            { text: "Overview", link: "/client/sdk" },
            {
                text: "dojo.c",
                collapsed: true,
                items: [
                    { text: "Overview", link: "/client/sdk/c" },
                    {
                        text: "C Bindings API",
                        link: "/client/sdk/c/c-bindings",
                    },
                    {
                        text: "WASM JavaScript API",
                        link: "/client/sdk/c/wasm-bindings",
                    },
                ],
            },
            { text: "dojo.js", link: "/client/sdk/javascript" },
            { text: "dojo.unity", link: "/client/sdk/unity" },
            { text: "dojo.unreal", link: "/client/sdk/unrealengine" },
            { text: "dojo.godot", link: "/client/sdk/godot" },
            { text: "dojo.bevy", link: "/client/sdk/bevy" },
            { text: "dojo.rust", link: "/client/sdk/rust" },
            { text: "dojo.telegram", link: "/client/sdk/telegram" },
        ],
    },
    { text: "Brand Assets", link: "/brand" },
];
