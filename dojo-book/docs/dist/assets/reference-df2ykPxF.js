import{u as s,j as e}from"./index-B0rG63LL.js";const a=void 0;function t(n){const i={a:"a",br:"br",code:"code",div:"div",figure:"figure",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",span:"span",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.h2,{id:"torii-reference",children:["torii reference",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#torii-reference",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.h3,{id:"name",children:["Name",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#name",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.p,{children:"torii - An automatic indexer and networking layer for a world contract."}),`
`,e.jsxs(i.h3,{id:"usage",children:["USAGE",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#usage",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(i.pre,{tabIndex:"0","data-language":"sh","data-theme":"github-dark-dimmed github-light",children:e.jsx(i.code,{"data-language":"sh","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:e.jsxs(i.span,{"data-line":"",children:[e.jsx(i.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"torii"}),e.jsx(i.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:" [OPTIONS]"})]})})})}),`
`,e.jsxs(i.h3,{id:"description",children:["DESCRIPTION",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#description",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"torii"})," starts the indexer and exposes GraphQL/gRPC API endpoints. The indexer queries the specified Starknet RPC endpoint for transaction blocks and listens for transactions related to the world contract. These transactions can include component/system registrations, entity state updates, system calls, and events. The parsed data is then stored in a local SQLite database."]}),`
`,e.jsx(i.p,{children:"The GraphQL and gRPC API endpoints run in tandem with the indexer, providing custom queries specific to the world contract for client applications."}),`
`,e.jsxs(i.h4,{id:"database-url",children:["Database URL",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#database-url",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"torii"})," uses a sqlite database to store indexed data. The database can be stored either in-memory or persistently on the filesystem."]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"The in-memory database is ephemeral and only lasts as long as the indexer is running. This is a fast and simple option to start the indexer for development/testing."}),`
`,e.jsx(i.li,{children:"Persistent storage should be used in production. It relies on the local filesystem for storage."}),`
`]}),`
`,e.jsx(i.p,{children:"Note: If using in-memory db, the memory will be garbage collected after a period of inactivity, causing queries to result in errors. Workaround is to use a persistent database."}),`
`,e.jsx(i.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(i.pre,{tabIndex:"0","data-language":"sh","data-theme":"github-dark-dimmed github-light",children:e.jsxs(i.code,{"data-language":"sh","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[e.jsx(i.span,{"data-line":"",children:e.jsx(i.span,{style:{"--shiki-dark":"#768390","--shiki-light":"#6A737D"},children:"# Persistent database storage using file indexer.db"})}),`
`,e.jsxs(i.span,{"data-line":"",children:[e.jsx(i.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"torii"}),e.jsx(i.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:" --database"}),e.jsx(i.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" indexer.db"})]})]})})}),`
`,e.jsxs(i.h3,{id:"options",children:["OPTIONS",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#options",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.h4,{id:"general-options",children:["General Options",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#general-options",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"-w, --world"}),e.jsx(i.br,{}),`
`,"     Address of the world contract to index"]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"--rpc"}),e.jsx(i.br,{}),`
`,"     Starknet RPC endpoint to use [default: http//localhost:5050]"]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"-d, --database <DATABASE>"}),e.jsx(i.br,{}),`
`,"     Database filepath (ex: indexer.db) [default: :memory:]"]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"-s, --start-block <START_BLOCK>"}),e.jsx(i.br,{}),`
`,"     Specify a block to start indexing from, ignored if stored head exists [default: 0]"]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"--allowed-origins <ALLOWED_ORIGINS>"}),e.jsx(i.br,{}),`
`,'     Specify allowed origins for api endpoints (comma-separated list of allowed origins, or "*" for all) [default: *]']}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"--external-url <EXTERNAL_URL>"}),e.jsx(i.br,{}),`
`,"     The external url of the server, used for configuring the GraphQL Playground in a hosted environment"]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"-h, --help"}),`
     Print help`]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"-V, --version"}),`
     Print version`]})]})}function d(n={}){const{wrapper:i}={...s(),...n.components};return i?e.jsx(i,{...n,children:e.jsx(t,{...n})}):t(n)}export{d as default,a as frontmatter};
