export const routes = [
	{
		text: "Overview",
		link: "/overview",
	},
	{
		text: "Installation",
		link: "/installation",
	},
	{
		text: "FAQ",
		link: "/faq",
	},
	{
		text: "Tutorials",
		items: [
			{
				text: "Dojo 101",
				link: "/tutorials/dojo-starter",
			},
			{
				text: "Deploy to Mainnet",
				link: "/tutorials/deploy-to-mainnet/main",
			},
			{
				text: "Deploy using Slot",
				link: "/tutorials/deploy-using-slot/main",
			},
			// {
			//   text: "Dungeon Crawler",
			//   link: "/tutorials/deploy-using-slot/main",
			// },
			// {
			//   text: "Using Graphql",
			//   link: "/tutorials/deploy-using-slot/main",
			// },
			// {
			//   text: "Using gRPC",
			//   link: "/tutorials/deploy-using-slot/main",
			// },
			// {
			//   text: "Deploying an NFT",
			//   link: "/tutorials/deploy-using-slot/main",
			// },
			// {
			//   text: "Katana-Starkli-Scarb",
			//   link: "/tutorials/katana-starkli-scarb/main",
			// },
		],
	},
	{
		text: "Framework",
		items: [
			{ text: "Overview", link: "/framework" },
			{ text: "Dojo 1.x", link: "/framework/dojo-1x" },
			{
				text: "World",
				collapsed: true,
				items: [
					{ text: "Overview", link: "/framework/world" },
					{ text: "API", link: "/framework/world/api" },
					{ text: "Systems", link: "/framework/world/systems" },
					{ text: "Events", link: "/framework/world/events" },
					{ text: "Metadata", link: "/framework/world/metadata" },
				],
			},
			{
				text: "Models",
				collapsed: true,
				items: [
					{ text: "Overview", link: "/framework/models" },
					{
						text: "Introspection",
						link: "/framework/models/introspect",
					},
					{ text: "Entities", link: "/framework/models/entities" },
					{ text: "Enum", link: "/framework/models/enum" },
					{ text: "Upgrades", link: "/framework/models/upgrades" },
				],
			},
			{
				text: "Authorization",
				link: "/framework/authorization",
				collapsed: true,
			},
			{
				text: "Config",
				link: "/framework/config",
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
						text: "CLI references",
						link: "/toolchain/katana/cli",
						collapsed: true,
						items: [
							{
								text: "katana",
								link: "/toolchain/katana/cli/katana",
							},
							{
								text: "katana db",
								link: "/toolchain/katana/cli/db/",
								collapsed: true,
								items: [
									{
										text: "katana db stats",
										link: "/toolchain/katana/cli/db/stats",
									},
								],
							},
							{
								text: "katana completions",
								link: "/toolchain/katana/cli/completions",
							},
						],
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
					{
						text: "Configuration file",
						link: "/toolchain/katana/config_file",
					},
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
					{
						text: "Configuration file",
						link: "/toolchain/torii/config_file",
					},
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
						text: "Calldata format",
						link: "/toolchain/sozo/calldata_format",
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
								text: "verify with walnut",
								link: "/toolchain/sozo/project-commands/walnut-verify",
							},
							{
								text: "hash",
								link: "/toolchain/sozo/project-commands/hash",
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
			{
				text: "Saya",
				collapsed: true,
				items: [
					{
						text: "Overview",
						link: "/toolchain/saya",
					},
					{
						text: "Herodotus",
						link: "/toolchain/saya/herodotus",
					},
					{
						text: "Persistent mode",
						link: "/toolchain/saya/persistent",
					},
					{
						text: "Sovereign mode",
						link: "/toolchain/saya/sovereign",
					},
					{
						text: "Slot",
						link: "/toolchain/saya/slot",
					},
				],
			},
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
		text: "Scaling",
		items: [
			{
				text: "Execution Sharding",
				link: "/architecture/execution-sharding",
			},
			{
				text: "Sovereign Rollups",
				link: "/architecture/sovereign-rollups",
			},
		],
	},
	{
		text: "Libraries",
		items: [
			{
				text: "Origami",
				link: "/libraries/origami",
			},
			{
				text: "Alexandria",
				link: "/libraries/alexandria",
			},
		],
	},
	{
		text: "SDKs",
		items: [
			{ text: "Overview", link: "/client/sdk" },

			{
				text: "dojo.js",
				link: "/client/sdk/javascript",
				collapsed: true,
				items: [
					{
						text: "Getting Started",
						link: "/client/sdk/javascript/get-started",
					},
					{
						text: "Overview",
						link: "/client/sdk/javascript/overview",
					},
					{
						text: "Query your entities",
						link: "/client/sdk/javascript/query-your-entities",
					},
					{
						text: "Query tokens",
						link: "/client/sdk/javascript/tokens",
					},
				],
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
			{
        text: "dojo.unreal",
        link: "/client/sdk/unrealengine",
        collapsed: true,
        items: [
          {
              text: "Reference",
              link: "/client/sdk/unrealengine/reference",
          },
          { text: "Example", link: "/client/sdk/unrealengine/example" },
        ],
      },
			{ text: "dojo.c", link: "/client/sdk/c" },
			{ text: "dojo.godot", link: "/client/sdk/godot" },
			{
				text: "dojo.rust",
				link: "/client/sdk/rust",
				collapsed: true,
				items: [{ text: "Example", link: "/client/sdk/rust/example" }],
			},
			{ text: "dojo.telegram", link: "/client/sdk/telegram" },
			{ text: "dojo.discord", link: "/client/sdk/discord" },
		],
	},
];
