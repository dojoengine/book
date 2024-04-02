import{u as r,j as e}from"./index-KZ_aprDi.js";const d={title:"CLI References",description:"undefined"};function s(i){const n={a:"a",br:"br",code:"code",div:"div",figure:"figure",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",span:"span",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"cli-references",children:["CLI References",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#cli-references",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(n.h2,{id:"name",children:["NAME",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#name",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"katana"})," - Create a local Starknet sequencer for deploying and developing Starknet smart contracts."]}),`
`,e.jsxs(n.h2,{id:"usage",children:["USAGE",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#usage",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"sh","data-theme":"github-dark-dimmed github-light",children:e.jsx(n.code,{"data-language":"sh","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"katana"}),e.jsx(n.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:" [OPTIONS] [COMMAND]"})]})})})}),`
`,e.jsxs(n.h2,{id:"options",children:["OPTIONS",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#options",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.h3,{id:"general-options",children:["General Options",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#general-options",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"--silent"}),e.jsx(n.br,{}),`
`,"     Don't print anything on startup."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"--no-mining"}),e.jsx(n.br,{}),`
`,"     Disable auto and interval mining, and mine on demand instead."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"-b, --block-time <MILLISECONDS>"}),e.jsx(n.br,{}),`
`,"     Block time in milliseconds for interval mining."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"--db-dir <PATH>"}),e.jsx(n.br,{}),`
`,"     Directory path of the database to initialize from. The path must either be an empty directory or a directory which already contains a previously initialized Katana database."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"--json-log"}),e.jsx(n.br,{}),`
`,"     Output logs in JSON format."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"--rpc-url <URL>"}),e.jsx(n.br,{}),`
`,"     The Starknet RPC provider to fork the network from."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"--fork-block-number <BLOCK_NUMBER>"}),e.jsx(n.br,{}),`
`,"     Fork the network at a specific block."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"--messaging <PATH>"}),e.jsx(n.br,{}),`
`,"     Configure the messaging service to allow Katana to listen/send messages on a settlement chain that can be either Ethereum or another Starknet sequencer (experimental)."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"-h, --help"}),e.jsx(n.br,{}),`
`,"     Print help (see a summary with '-h')."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"-V, --version"}),e.jsx(n.br,{}),`
`,"     Print version information."]}),`
`,e.jsxs(n.h3,{id:"server-options",children:["Server Options",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#server-options",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"-p, --port <PORT>"}),e.jsx(n.br,{}),`
`,"     Port number to listen on. [default: 5050]"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"--host <HOST>"}),e.jsx(n.br,{}),`
`,"     The IP address the server will listen on."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"--max-connections <MAX_CONNECTIONS>"}),e.jsx(n.br,{}),`
`,"     Maximum number of concurrent connections allowed. [default: 100]"]}),`
`,e.jsxs(n.h3,{id:"starknet-options",children:["Starknet Options",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#starknet-options",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"--seed <SEED>"}),e.jsx(n.br,{}),`
`,"     Specify the seed for randomness of accounts to be predeployed."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"--accounts <NUM>"}),e.jsx(n.br,{}),`
`,"     Number of pre-funded accounts to generate. [default: 10]"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"--disable-fee"}),e.jsx(n.br,{}),`
`,"     Disable charging fee for transactions."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"--disable-validate"}),e.jsx(n.br,{}),`
`,"     Disable validation when executing transactions. Allowing transaction to be executed even with invalid signature."]}),`
`,e.jsxs(n.h4,{id:"environment-options",children:["Environment Options",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#environment-options",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"--chain-id <CHAIN_ID>"}),e.jsx(n.br,{}),`
`,"     The chain ID. [default: KATANA]"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"--gas-price <GAS_PRICE>"}),e.jsx(n.br,{}),`
`,"     The gas price."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"--validate-max-steps <VALIDATE_MAX_STEPS>"}),e.jsx(n.br,{}),`
`,"     The maximum number of steps available for the account validation logic."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"--invoke-max-steps <INVOKE_MAX_STEPS>"}),e.jsx(n.br,{}),`
`,"     The maximum number of steps available for the account execution logic."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"--genesis <GENESIS>"}),e.jsx(n.br,{}),`
`,"     The genesis configuration file."]}),`
`,e.jsxs(n.h2,{id:"subcommands",children:["SUBCOMMANDS",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#subcommands",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.h3,{id:"completions",children:[e.jsx(n.code,{children:"completions"}),e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#completions",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"Generates a shell completions script for the given supported shells:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"bash"}),`
`,e.jsx(n.li,{children:"elvish"}),`
`,e.jsx(n.li,{children:"fish"}),`
`,e.jsx(n.li,{children:"powershell"}),`
`,e.jsx(n.li,{children:"zsh"}),`
`]}),`
`,e.jsxs(n.h4,{id:"examples",children:["EXAMPLES",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#examples",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Generate shell completions script for ",e.jsx(n.code,{children:"bash"})," and appends it to a ",e.jsx(n.code,{children:".bashrc"})," file:"]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"bash","data-theme":"github-dark-dimmed github-light",children:e.jsx(n.code,{"data-language":"bash","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"katana"}),e.jsx(n.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" completions bash"}),e.jsx(n.span,{style:{"--shiki-dark":"#F47067","--shiki-light":"#D73A49"},children:" >>"}),e.jsx(n.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" ~/.bashrc"})]})})})})]})}function t(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{t as default,d as frontmatter};
