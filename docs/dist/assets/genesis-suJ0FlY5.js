import{u as e,j as i}from"./index-KZ_aprDi.js";const t={title:"Genesis Configuration",description:"undefined"};function n(h){const s={a:"a",br:"br",code:"code",div:"div",em:"em",figure:"figure",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...e(),...h.components};return i.jsxs(i.Fragment,{children:[i.jsx(s.header,{children:i.jsxs(s.h1,{id:"genesis-configuration",children:["Genesis Configuration",i.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#genesis-configuration",children:i.jsx(s.div,{"data-autolink-icon":!0})})]})}),`
`,i.jsxs(s.p,{children:["Katana's genesis configuration feature allows you to define the ",i.jsx(s.strong,{children:"initial state"})," and settings of your blockchain network. This feature enables you to ",i.jsx(s.strong,{children:"customize"})," the chain's starting point and set up some aspects of the network according to your specific requirements. With this feature, you can:"]}),`
`,i.jsxs(s.ol,{children:[`
`,i.jsxs(s.li,{children:["Specify the ",i.jsx(s.strong,{children:"token"})," used for network fees"]}),`
`,i.jsxs(s.li,{children:[i.jsx(s.strong,{children:"Allocate"})," initial token balances to accounts"]}),`
`,i.jsxs(s.li,{children:[i.jsx(s.strong,{children:"Pre-declare classes"})," at the start of the chain"]}),`
`,i.jsxs(s.li,{children:[i.jsx(s.strong,{children:"Pre-deploy smart contracts"})," at the start of the chain"]}),`
`]}),`
`,i.jsxs(s.p,{children:["The genesis configuration provides a convenient way to customize the chain's starting point, ",i.jsx(s.strong,{children:"reduce manual setup"})," efforts, and ensure a ",i.jsx(s.strong,{children:"consistent"})," and predictable initial state for your applications and smart contracts."]}),`
`,i.jsxs(s.h2,{id:"configuration-file-format",children:["Configuration File Format",i.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#configuration-file-format",children:i.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,i.jsx(s.p,{children:"The genesis config file is a JSON file that contains the following fields:"}),`
`,i.jsxs(s.ul,{children:[`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"number"}),i.jsx(s.br,{}),`
`,i.jsx(s.em,{children:"The block number of the genesis block."})]}),`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"parentHash"}),i.jsx(s.br,{}),`
`,i.jsx(s.em,{children:"The parent hash of the genesis block."})]}),`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"timestamp"}),i.jsx(s.br,{}),`
`,i.jsx(s.em,{children:"The timestamp of the genesis block."})]}),`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"stateRoot"}),i.jsx(s.br,{}),`
`,i.jsx(s.em,{children:"The state root of the genesis block."})]}),`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"sequencerAddress"}),i.jsx(s.br,{}),`
`,i.jsx(s.em,{children:"The sequencer address."})]}),`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"gasPrices"})," ",i.jsx(s.em,{children:"The gas prices for the L1 tokens at the genesis block."}),`
`,i.jsxs(s.ul,{children:[`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"ETH"}),i.jsx(s.br,{}),`
`,i.jsx(s.em,{children:"The price of ETH in wei."})]}),`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"STRK"}),i.jsx(s.br,{}),`
`,i.jsx(s.em,{children:"The price of STRK in fri."})]}),`
`]}),`
`]}),`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"feeToken"})," ",i.jsx(s.em,{children:"The network fee token configuration. (optional)"}),`
`,i.jsxs(s.ul,{children:[`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"name"}),i.jsx(s.br,{}),`
`,i.jsx(s.em,{children:"The name of the fee token."})]}),`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"symbol"}),i.jsx(s.br,{}),`
`,i.jsx(s.em,{children:"The symbol of the fee token."})]}),`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"decimals"}),i.jsx(s.br,{}),`
`,i.jsx(s.em,{children:"The number of decimal places for the fee token."})]}),`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"address"})," (optional)",i.jsx(s.br,{}),`
`,i.jsx(s.em,{children:"The fee token contract address."})]}),`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"class"}),"  (optional)",i.jsx(s.br,{}),`
`,i.jsx(s.em,{children:"The class of the fee token."})]}),`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"storage"})," (optional)",i.jsx(s.br,{}),`
`,i.jsx(s.em,{children:"Key-value pairs for the fee token's storage."})]}),`
`]}),`
`]}),`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"universalDeployer"})," ",i.jsx(s.em,{children:"The universal deployer configuration. (optional)"}),`
`,i.jsxs(s.ul,{children:[`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"address"})," (optional)",i.jsx(s.br,{}),`
`,i.jsx(s.em,{children:"The universal deployer contract address."})]}),`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"storage"})," (optional)",i.jsx(s.br,{}),`
`,i.jsx(s.em,{children:"Key-value pairs for the universal deployer's storage."})]}),`
`]}),`
`]}),`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"accounts"})," ",i.jsx(s.em,{children:"The genesis allocations."}),`
`,i.jsxs(s.ul,{children:[`
`,i.jsxs(s.li,{children:["<CONTRACT_ADDRESS> ",i.jsx(s.em,{children:"The address of the account contract."}),`
`,i.jsxs(s.ul,{children:[`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"publicKey"}),i.jsx(s.br,{}),`
`,i.jsx(s.em,{children:"The public key associated with the account."})]}),`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"privateKey"})," (optional)",i.jsx(s.br,{}),`
`,i.jsx(s.em,{children:"The private key associated with publicKey."})]}),`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"balance"})," (optional)",i.jsx(s.br,{}),`
`,i.jsx(s.em,{children:"The initial balance of the account."})]}),`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"nonce"})," (optional)",i.jsx(s.br,{}),`
`,i.jsx(s.em,{children:"The nonce of the account."})]}),`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"class"})," (optional)",i.jsx(s.br,{}),`
`,i.jsx(s.em,{children:"The class to be used for the account contract."})]}),`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"storage"})," (optional)",i.jsx(s.br,{}),`
`,i.jsx(s.em,{children:"Key-value pairs for the account's storage."})]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"contracts"})," ",i.jsx(s.em,{children:"Genesis contract deployments."}),`
`,i.jsxs(s.ul,{children:[`
`,i.jsxs(s.li,{children:["<CONTRACT_ADDRESS> ",i.jsx(s.em,{children:"The address of the contract."}),`
`,i.jsxs(s.ul,{children:[`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"class"}),i.jsx(s.br,{}),`
`,i.jsx(s.em,{children:"The class of the contract."})]}),`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"balance"})," (optional)",i.jsx(s.br,{}),`
`,i.jsx(s.em,{children:"The balance allocated to the contract."})]}),`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"storage"})," (optional)",i.jsx(s.br,{}),`
`,i.jsx(s.em,{children:"Key-value pairs for the contract's storage."})]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"classes"}),"  ",i.jsx(s.em,{children:"Classes to declare at genesis."}),`
`,i.jsxs(s.ul,{children:[`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"class"}),i.jsx(s.br,{}),`
`,i.jsx(s.em,{children:"The path to the class artifact file relative to the genesis config file, or the full class artifact object."})]}),`
`,i.jsxs(s.li,{children:[i.jsx(s.code,{children:"classHash"}),` (optional)
`,i.jsx(s.em,{children:"The hash of the class. To override the actual class hash that will be computed from the class definition itself."})]}),`
`]}),`
`]}),`
`]}),`
`,i.jsxs(s.h3,{id:"example",children:["Example",i.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#example",children:i.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,i.jsx(s.figure,{"data-rehype-pretty-code-figure":"",children:i.jsx(s.pre,{tabIndex:"0","data-language":"jsonc","data-theme":"github-dark-dimmed github-light",children:i.jsxs(s.code,{"data-language":"jsonc","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"{"})}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'	"number"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"0"}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'	"parentHash"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0x999"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'	"timestamp"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"5123512314"}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'	"stateRoot"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0x99"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'	"sequencerAddress"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0x100"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'	"gasPrices"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": {"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'		"ETH"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"1111"}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'		"STRK"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"2222"})]}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"	},"})}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'	"feeToken"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": {"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'		"address"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0x55"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'		"name"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"ETHER"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'		"symbol"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"ETH"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'		"decimals"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"18"}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'		"class"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0x8"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'		"storage"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": {"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'			"0x111"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0x1"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'			"0x222"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0x2"'})]}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"		}"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"	},"})}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'	"universalDeployer"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": {"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'		"address"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0x041a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'		"storage"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": {"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'			"0x10"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0x100"'})]}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"		}"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"	},"})}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'	"accounts"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": {"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'		"0x66efb28ac62686966ae85095ff3a772e014e7fbf56d4c5f6fac5606d4dde23a"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": {"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'			"publicKey"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0x1"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'			"balance"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0xD3C21BCECCEDA1000000"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'			"nonce"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0x1"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'			"class"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0x444"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'			"storage"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": {"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'				"0x1"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0x1"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'				"0x2"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0x2"'})]}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"			}"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"		},"})}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'		"0x6b86e40118f29ebe393a75469b4d926c7a44c2e2681b6d319520b7c1156d114"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": {"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'			"publicKey"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0x2"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'			"balance"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0xD3C21BCECCEDA1000000"'})]}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"		},"})}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'		"0x79156ecb3d8f084001bb498c95e37fa1c4b40dbb35a3ae47b77b1ad535edcb9"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": {"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'			"publicKey"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0x3"'})]}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"		},"})}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'		"0x053a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": {"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'			"publicKey"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0x4"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'			"balance"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0xD3C21BCECCEDA1000000"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'			"privateKey"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0x115"'})]}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"		}"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"	},"})}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'	"contracts"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": {"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'		"0x29873c310fbefde666dc32a1554fea6bb45eecc84f680f8a2b0a8fbb8cb89af"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": {"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'			"balance"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0xD3C21BCECCEDA1000000"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'			"class"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0x8"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'			"storage"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": {"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'				"0x1"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0x1"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'				"0x2"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0x2"'})]}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"			}"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"		},"})}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'		"0xe29882a1fcba1e7e10cad46212257fea5c752a4f9b1b1ec683c503a2cf5c8a"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": {"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'			"balance"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0xD3C21BCECCEDA1000000"'})]}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"		},"})}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'		"0x05400e90f7e0ae78bd02c77cd75527280470e2fe19c54970dd79dc37a9d3645c"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": {"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'			"storage"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": {"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'				"0x1"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0x1"'})]}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"			}"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"		}"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"	},"})}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'	"classes"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": ["})]}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"		{"})}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'			"class"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"path/to/file/erc20.json"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'			"classHash"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0x8"'})]}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"		},"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"		{"})}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'			"class"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"path/to/file/universal_deployer.json"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'			"classHash"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0x444"'})]}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"		},"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"		{"})}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'			"class"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": {"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'				"abi"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": ["})]}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"					{"})}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'						"members"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": ["})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"							{ "}),i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'"name"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"to"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:", "}),i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'"offset"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"0"}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:", "}),i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'"type"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"felt"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:" },"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"							{ "}),i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'"name"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"selector"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:", "}),i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'"offset"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"1"}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:", "}),i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'"type"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"felt"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:" },"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"							{ "}),i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'"name"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"data_offset"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:", "}),i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'"offset"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"2"}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:", "}),i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'"type"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"felt"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:" },"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"							{ "}),i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'"name"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"data_len"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:", "}),i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'"offset"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"3"}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:", "}),i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'"type"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"felt"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:" }"})]}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"						],"})}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'						"name"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"AccountCallArray"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'						"size"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"4"}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'						"type"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"struct"'})]}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"					}"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"				],"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#FF938A","--shiki-light":"#B31D28","--shiki-dark-font-style":"italic","--shiki-light-font-style":"italic"},children:"                ..."})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"			}"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"		}"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"	]"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"}"})})]})})})]})}function a(h={}){const{wrapper:s}={...e(),...h.components};return s?i.jsx(s,{...h,children:i.jsx(n,{...h})}):n(h)}export{a as default,t as frontmatter};
