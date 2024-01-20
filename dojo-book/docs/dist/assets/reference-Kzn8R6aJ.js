import{u as t,j as e}from"./index-m6NaWekR.js";const d=void 0;function n(s){const i={a:"a",br:"br",code:"code",div:"div",em:"em",figure:"figure",h2:"h2",h3:"h3",h4:"h4",h5:"h5",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...t(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.h2,{id:"katana-reference",children:["katana reference",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#katana-reference",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.h3,{id:"name",children:["NAME",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#name",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.p,{children:"katana - Create a local testnet node for deploying and testing Starknet smart contracts."}),`
`,e.jsxs(i.h3,{id:"usage",children:["USAGE",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#usage",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(i.pre,{tabIndex:"0","data-language":"sh","data-theme":"github-dark-dimmed github-light",children:e.jsx(i.code,{"data-language":"sh","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:e.jsxs(i.span,{"data-line":"",children:[e.jsx(i.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"katana"}),e.jsx(i.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:" [OPTIONS]"})]})})})}),`
`,e.jsxs(i.h3,{id:"description",children:["DESCRIPTION",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#description",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:["Create a local testnet node for deploying and testing Starknet smart contracts. Katana supports deployment and execution of the ",e.jsx(i.strong,{children:"new"})," as well as the ",e.jsx(i.strong,{children:"legacy"})," (Cairo 0) Cairo contracts."]}),`
`,e.jsx(i.p,{children:"This section covers an extensive list of information about Mining Modes, Supported RPC Methods, Katana flags and their usages. You can run multiple flags at the same time."}),`
`,e.jsxs(i.h4,{id:"mining-modes",children:["Mining Modes",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#mining-modes",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.p,{children:"In Katana, mining modes determine how frequent blocks are mined. By default, a new block is automatically mined as soon as a transaction is submitted."}),`
`,e.jsxs(i.p,{children:["You can switch from the default mining behaviour to interval mining, where a new block is created at a fixed time interval selected by the user. To enable this mode of mining, use the ",e.jsx(i.code,{children:"--block-time <MILLISECONDS>"})," flag, as demonstrated in the following example."]}),`
`,e.jsx(i.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(i.pre,{tabIndex:"0","data-language":"sh","data-theme":"github-dark-dimmed github-light",children:e.jsxs(i.code,{"data-language":"sh","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[e.jsx(i.span,{"data-line":"",children:e.jsx(i.span,{style:{"--shiki-dark":"#768390","--shiki-light":"#6A737D"},children:"# Produces a new block every 10 seconds"})}),`
`,e.jsxs(i.span,{"data-line":"",children:[e.jsx(i.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"katana"}),e.jsx(i.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:" --block-time"}),e.jsx(i.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:" 10000"})]})]})})}),`
`,e.jsxs(i.h4,{id:"forking",children:["Forking",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#forking",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:["Katana supports forking from a Starknet RPC provider. You can configure your node to enable the forking feature by providing a valid RPC provider using the ",e.jsx(i.code,{children:"--rpc-url <URL>"})," flag., which would initiate Katana to fork the latest block of the provided network. If you would like to fork from a specific block, you can do so using ",e.jsx(i.code,{children:"--fork-block-number <BLOCK_NUMBER>"}),"."]}),`
`,e.jsx(i.p,{children:"NOTE: This does not allow fetching of historical blocks but only blocks that are mined by Katana. However, support for fetching historical blocks will be added in the future."}),`
`,e.jsx(i.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(i.pre,{tabIndex:"0","data-language":"sh","data-theme":"github-dark-dimmed github-light",children:e.jsxs(i.code,{"data-language":"sh","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[e.jsx(i.span,{"data-line":"",children:e.jsx(i.span,{style:{"--shiki-dark":"#768390","--shiki-light":"#6A737D"},children:"# Forks the network at block 1200"})}),`
`,e.jsxs(i.span,{"data-line":"",children:[e.jsx(i.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"katana"}),e.jsx(i.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:" --rpc-url"}),e.jsx(i.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" http://your-rpc-provider.com --fork-block-number "}),e.jsx(i.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"1200"})]})]})})}),`
`,e.jsxs(i.h4,{id:"messaging",children:["Messaging",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#messaging",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.p,{children:"Katana also allows users to perform L1 <-> L2 integration using the messaging feature. There are two types of messaging service supported by Katana:"}),`
`,e.jsxs(i.ol,{children:[`
`,e.jsx(i.li,{children:e.jsx(i.em,{children:"Ethereum"})}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Starknet"})," (",e.jsx(i.strong,{children:"experimental"}),")"]}),`
`]}),`
`,e.jsxs(i.p,{children:["If configured to ",e.jsx(i.em,{children:"Ethereum"})," messaging, Katana will listen/send messages on an Ethereum chain. This type of messaging behaves similar to the canonical Starknet sequencer with the exception that messages from L2 -> L1 will be sent directly to the settlement chain for consumption, instead of having to wait for the corresponding blocks of the messages to be proven on the settlement chain (which in reality would be a very time consuming process)."]}),`
`,e.jsxs(i.p,{children:["The ",e.jsx(i.em,{children:"Starknet"})," messaging, however, is an experimental feature that allows Katana to listen/send messages on a Starknet chain. It attempts to replicate the behaviour of Ethereum messaging but with a Starknet chain as the settlement layer. This is achieved by having Katana listen to the Starknet chain for new blocks and then sending the messages to the settlement chain for consumption. This is an experimental and opinionated feature, and is not recommended for production use."]}),`
`,e.jsx(i.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(i.pre,{tabIndex:"0","data-language":"sh","data-theme":"github-dark-dimmed github-light",children:e.jsx(i.code,{"data-language":"sh","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:e.jsxs(i.span,{"data-line":"",children:[e.jsx(i.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"katana"}),e.jsx(i.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:" --messaging"}),e.jsx(i.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" path/to/messaging/config.json"})]})})})}),`
`,e.jsx(i.p,{children:"The messaging config file is a JSON file that contains the following fields:"}),`
`,e.jsx(i.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(i.pre,{tabIndex:"0","data-language":"json","data-theme":"github-dark-dimmed github-light",children:e.jsxs(i.code,{"data-language":"json","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[e.jsx(i.span,{"data-line":"",children:e.jsx(i.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"{"})}),`
`,e.jsx(i.span,{"data-line":"",children:e.jsx(i.span,{style:{"--shiki-dark":"#768390","--shiki-light":"#6A737D"},children:'  /// The type of messaging service to use. Can be either "ethereum" or "starknet".'})}),`
`,e.jsxs(i.span,{"data-line":"",children:[e.jsx(i.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'  "chain"'}),e.jsx(i.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),e.jsx(i.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"ethereum"'}),e.jsx(i.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,e.jsx(i.span,{"data-line":"",children:e.jsx(i.span,{style:{"--shiki-dark":"#768390","--shiki-light":"#6A737D"},children:"  /// The RPC-URL of the settlement chain."})}),`
`,e.jsxs(i.span,{"data-line":"",children:[e.jsx(i.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'  "rpc_url"'}),e.jsx(i.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),e.jsx(i.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"http://127.0.0.1:8545"'}),e.jsx(i.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,e.jsx(i.span,{"data-line":"",children:e.jsx(i.span,{style:{"--shiki-dark":"#768390","--shiki-light":"#6A737D"},children:"  /// The messaging-contract address on the settlement chain."})}),`
`,e.jsxs(i.span,{"data-line":"",children:[e.jsx(i.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'  "contract_address"'}),e.jsx(i.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),e.jsx(i.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0x5FbDB2315678afecb367f032d93F642f64180aa3"'}),e.jsx(i.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,e.jsx(i.span,{"data-line":"",children:e.jsx(i.span,{style:{"--shiki-dark":"#768390","--shiki-light":"#6A737D"},children:"  /// The address to use for settling messages. It should be a valid address that"})}),`
`,e.jsx(i.span,{"data-line":"",children:e.jsx(i.span,{style:{"--shiki-dark":"#768390","--shiki-light":"#6A737D"},children:"  /// can be used to send a transaction on the settlement chain."})}),`
`,e.jsxs(i.span,{"data-line":"",children:[e.jsx(i.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'  "sender_address"'}),e.jsx(i.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),e.jsx(i.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"'}),e.jsx(i.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,e.jsx(i.span,{"data-line":"",children:e.jsx(i.span,{style:{"--shiki-dark":"#768390","--shiki-light":"#6A737D"},children:"  /// The private key associated to `sender_address`."})}),`
`,e.jsxs(i.span,{"data-line":"",children:[e.jsx(i.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'  "private_key"'}),e.jsx(i.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),e.jsx(i.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"'}),e.jsx(i.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,e.jsx(i.span,{"data-line":"",children:e.jsx(i.span,{style:{"--shiki-dark":"#768390","--shiki-light":"#6A737D"},children:"  /// The interval, in seconds, at which the messaging service will fetch and settle messages"})}),`
`,e.jsx(i.span,{"data-line":"",children:e.jsx(i.span,{style:{"--shiki-dark":"#768390","--shiki-light":"#6A737D"},children:"  /// from/to the settlement chain."})}),`
`,e.jsxs(i.span,{"data-line":"",children:[e.jsx(i.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'  "interval"'}),e.jsx(i.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),e.jsx(i.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"2"}),e.jsx(i.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,e.jsx(i.span,{"data-line":"",children:e.jsx(i.span,{style:{"--shiki-dark":"#768390","--shiki-light":"#6A737D"},children:"  /// The block on settlement chain from where Katana will start fetching messages."})}),`
`,e.jsxs(i.span,{"data-line":"",children:[e.jsx(i.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'  "from_block"'}),e.jsx(i.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),e.jsx(i.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"0"})]}),`
`,e.jsx(i.span,{"data-line":"",children:e.jsx(i.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"}"})})]})})}),`
`,e.jsxs(i.h4,{id:"supported-transport-layers",children:["Supported Transport Layers",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#supported-transport-layers",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.p,{children:"Only HTTP connection is supported at the moment. The server listens on port 5050 by default, but it can be changed by running the following command:"}),`
`,e.jsx(i.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(i.pre,{tabIndex:"0","data-language":"sh","data-theme":"github-dark-dimmed github-light",children:e.jsx(i.code,{"data-language":"sh","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:e.jsxs(i.span,{"data-line":"",children:[e.jsx(i.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"katana"}),e.jsx(i.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:" --port"}),e.jsx(i.span,{style:{"--shiki-dark":"#F47067","--shiki-light":"#D73A49"},children:" <"}),e.jsx(i.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:"POR"}),e.jsx(i.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"T"}),e.jsx(i.span,{style:{"--shiki-dark":"#F47067","--shiki-light":"#D73A49"},children:">"})]})})})}),`
`,e.jsxs(i.h4,{id:"starknet-feature-compatibility",children:["Starknet Feature Compatibility",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#starknet-feature-compatibility",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.h5,{id:"supported-transaction-type",children:["Supported Transaction Type",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#supported-transaction-type",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Type"}),e.jsx(i.th,{children:"Version"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"INVOKE"}),e.jsx(i.td,{children:"1"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"DECLARE"}),e.jsx(i.td,{children:"1, 2"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"DEPLOY_ACCOUNT"}),e.jsx(i.td,{})]})]})]}),`
`,e.jsxs(i.h4,{id:"supported-rpc-methods",children:["Supported RPC Methods",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#supported-rpc-methods",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.h5,{id:"starknet-methods",children:["Starknet Methods",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#starknet-methods",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:["Katana supports version ",e.jsx(i.strong,{children:"v0.3.0"})," of the Starknet JSON-RPC specifications. The standard methods are based on ",e.jsx(i.a,{href:"https://github.com/starkware-libs/starknet-specs/tree/v0.3.0",children:"this"})," reference."]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:e.jsx(i.code,{children:"starknet_blockNumber"})}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:e.jsx(i.code,{children:"starknet_blockHashAndNumber"})}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:e.jsx(i.code,{children:"starknet_getBlockWithTxs"})}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:e.jsx(i.code,{children:"starknet_getBlockWithTxHashes"})}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:e.jsx(i.code,{children:"starknet_getBlockTransactionCount"})}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:e.jsx(i.code,{children:"starknet_getTransactionByHash"})}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:e.jsx(i.code,{children:"starknet_getTransactionByBlockIdAndIndex"})}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:e.jsx(i.code,{children:"starknet_getTransactionReceipt"})}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:e.jsx(i.code,{children:"starknet_pendingTransactions"})}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:e.jsx(i.code,{children:"starknet_getStateUpdate"})}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:e.jsx(i.code,{children:"starknet_call"})}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:e.jsx(i.code,{children:"starknet_estimateFee"})}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:e.jsx(i.code,{children:"starknet_chainId"})}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:e.jsx(i.code,{children:"starknet_getNonce"})}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:e.jsx(i.code,{children:"starknet_getEvents"})}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:e.jsx(i.code,{children:"starknet_getStorageAt"})}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:e.jsx(i.code,{children:"starknet_getClassHashAt"})}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:e.jsx(i.code,{children:"starknet_getClass"})}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.strong,{children:e.jsx(i.code,{children:"starknet_getClassAt"})}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:e.jsx(i.code,{children:"starknet_addInvokeTransaction"})}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:e.jsx(i.code,{children:"starknet_addDeclareTransaction"})}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:e.jsx(i.code,{children:"starknet_addDeployAccountTransaction"})}),`
`]}),`
`]}),`
`,e.jsxs(i.h5,{id:"custom-methods",children:["Custom Methods",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#custom-methods",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.p,{children:"Katana provides a convenient set of custom RPC methods to quickly and easily configure the node to suit your testing environment."}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"katana_generateBlock"}),e.jsx(i.br,{}),`
`,"Mine a new block which includes all currently pending transactions."]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"katana_nextBlockTimestamp"}),e.jsx(i.br,{}),`
`,"Get the time for the next block."]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"katana_increaseNextBlockTimestamp"}),e.jsx(i.br,{}),`
`,"Increase the time for the block by a given amount of time, in seconds."]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"katana_setNextBlockTimestamp"}),e.jsx(i.br,{}),`
`,"Similar to ",e.jsx(i.code,{children:"katana_increaseNextBlockTimestamp"})," but takes the exact timestamp that you want in the next block."]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"katana_predeployedAccounts"}),e.jsx(i.br,{}),`
`,"Get the info for all of the predeployed accounts."]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"katana_setStorageAt"}),e.jsx(i.br,{}),`
`,"Set an exact value of a contract's storage slot."]}),`
`,e.jsxs(i.h3,{id:"options",children:["OPTIONS",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#options",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.h4,{id:"general-options",children:["General Options",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#general-options",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"--silent"}),e.jsx(i.br,{}),`
`,"     Don't print anything on startup."]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"--no-mining"}),e.jsx(i.br,{}),`
`,"     Disable auto and interval mining, and mine on demand instead."]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"-b, --block-time <MILLISECONDS>"}),e.jsx(i.br,{}),`
`,"     Block time in milliseconds for interval mining."]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"--dump-state <PATH>"}),e.jsx(i.br,{}),`
`,"     Dump the state of chain on exit to the given file.",e.jsx(i.br,{}),`
`,"     If the value is a directory, the state will be written to ",e.jsx(i.code,{children:"<PATH>/state.bin"}),"."]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"--rpc-url <URL>"}),e.jsx(i.br,{}),`
`,"     The Starknet RPC provider to fork the network from."]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"--json-log"}),e.jsx(i.br,{}),`
`,"     Output logs in JSON format."]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"--fork-block-number <BLOCK_NUMBER>"}),e.jsx(i.br,{}),`
`,"     Fork the network at a specific block."]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"--messaging <PATH>"}),e.jsx(i.br,{}),`
`,"     Configure the messaging service to allow Katana to listen/send messages on a settlement chain that can be either Ethereum or another Starknet sequencer (experimental)."]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"-h, --help"}),e.jsx(i.br,{}),`
`,"     Print help (see a summary with '-h')."]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"-V, --version"}),e.jsx(i.br,{}),`
`,"     Print version information."]}),`
`,e.jsxs(i.h4,{id:"server-options",children:["Server Options",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#server-options",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"-p, --port <PORT>"}),e.jsx(i.br,{}),`
`,"     Port number to listen on. [default: 5050]"]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"--host <HOST>"}),e.jsx(i.br,{}),`
`,"     The IP address the server will listen on."]}),`
`,e.jsxs(i.h4,{id:"starknet-options",children:["Starknet Options",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#starknet-options",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"--seed <SEED>"}),e.jsx(i.br,{}),`
`,"     Specify the seed for randomness of accounts to be predeployed."]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"--accounts <NUM>"}),e.jsx(i.br,{}),`
`,"     Number of pre-funded accounts to generate. [default: 10]"]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"--disable-fee"}),e.jsx(i.br,{}),`
`,"     Disable charging fee for transactions."]}),`
`,e.jsxs(i.h4,{id:"environment-options",children:["Environment Options",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#environment-options",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"--chain-id <CHAIN_ID>"}),e.jsx(i.br,{}),`
`,"     The chain ID. [default: KATANA]"]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"--gas-price <GAS_PRICE>"}),e.jsx(i.br,{}),`
`,"     The gas price."]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"--validate-max-steps <VALIDATE_MAX_STEPS>"}),e.jsx(i.br,{}),`
`,"     The maximum number of steps available for the account validation logic."]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"--invoke-max-steps <INVOKE_MAX_STEPS>"}),e.jsx(i.br,{}),`
`,"     The maximum number of steps available for the account execution logic."]}),`
`,e.jsxs(i.h3,{id:"shell-completions",children:["Shell Completions",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#shell-completions",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"katana"})," completions shell"]}),`
`,e.jsx(i.p,{children:"Generates a shell completions script for the given shell."}),`
`,e.jsx(i.p,{children:"Supported shells are:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"bash"}),`
`,e.jsx(i.li,{children:"elvish"}),`
`,e.jsx(i.li,{children:"fish"}),`
`,e.jsx(i.li,{children:"powershell"}),`
`,e.jsx(i.li,{children:"zsh"}),`
`]}),`
`,e.jsxs(i.h4,{id:"examples",children:["EXAMPLES",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#examples",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:["Generate shell completions script for ",e.jsx(i.code,{children:"bash"})," and appends it to a ",e.jsx(i.code,{children:".bashrc"})," file:"]}),`
`,e.jsx(i.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(i.pre,{tabIndex:"0","data-language":"bash","data-theme":"github-dark-dimmed github-light",children:e.jsx(i.code,{"data-language":"bash","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:e.jsxs(i.span,{"data-line":"",children:[e.jsx(i.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"katana"}),e.jsx(i.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" completions bash"}),e.jsx(i.span,{style:{"--shiki-dark":"#F47067","--shiki-light":"#D73A49"},children:" >>"}),e.jsx(i.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" ~/.bashrc"})]})})})}),`
`,e.jsxs(i.h3,{id:"examples-1",children:["EXAMPLES",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#examples-1",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.ol,{children:[`
`,e.jsx(i.li,{children:"Create 15 dev accounts and disable transaction fee mechanism"}),`
`]}),`
`,e.jsx(i.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(i.pre,{tabIndex:"0","data-language":"sh","data-theme":"github-dark-dimmed github-light",children:e.jsx(i.code,{"data-language":"sh","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:e.jsxs(i.span,{"data-line":"",children:[e.jsx(i.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"katana"}),e.jsx(i.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:" --accounts"}),e.jsx(i.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:" 15"}),e.jsx(i.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" --disable-fee"})]})})})}),`
`,e.jsxs(i.ol,{start:"2",children:[`
`,e.jsxs(i.li,{children:["Set the chain id to ",e.jsx(i.code,{children:"SN_GOERLI"})," and run the server on port 8545"]}),`
`]}),`
`,e.jsx(i.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(i.pre,{tabIndex:"0","data-language":"sh","data-theme":"github-dark-dimmed github-light",children:e.jsx(i.code,{"data-language":"sh","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:e.jsxs(i.span,{"data-line":"",children:[e.jsx(i.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"katana"}),e.jsx(i.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:" --chain-id"}),e.jsx(i.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" SN_GOERLI --port "}),e.jsx(i.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"8545"})]})})})}),`
`,e.jsxs(i.ol,{start:"3",children:[`
`,e.jsx(i.li,{children:"Load previously stored state and dump the state of this session to a file on shutdown"}),`
`]}),`
`,e.jsx(i.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(i.pre,{tabIndex:"0","data-language":"sh","data-theme":"github-dark-dimmed github-light",children:e.jsx(i.code,{"data-language":"sh","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:e.jsxs(i.span,{"data-line":"",children:[e.jsx(i.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"katana"}),e.jsx(i.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:" --load-state"}),e.jsx(i.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" ./dump-state.bin --dump-state ./dump-state.bin"})]})})})})]})}function r(s={}){const{wrapper:i}={...t(),...s.components};return i?e.jsx(i,{...s,children:e.jsx(n,{...s})}):n(s)}export{r as default,d as frontmatter};
