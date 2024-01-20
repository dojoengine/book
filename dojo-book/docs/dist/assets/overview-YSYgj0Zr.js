import{u as t,j as e}from"./index-m6NaWekR.js";const s=void 0;function r(n){const i={a:"a",blockquote:"blockquote",code:"code",div:"div",figure:"figure",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...t(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.p,{children:e.jsx(i.img,{src:"/torii-icon-word.png",alt:"katana"})}),`
`,e.jsxs(i.h2,{id:"torii",children:["Torii",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#torii",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.p,{children:"Torii is an automatic indexer and client for dojo worlds. Built in rust to be blazingly fast and exceptionally scalable. Torii provides a fully typed, dynamically generated GraphqQL interface and a high performance gRPC api for binding clients to the world state. There are two parts to torii, the client and the server."}),`
`,e.jsxs(i.h3,{id:"torii-server",children:["Torii Server",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#torii-server",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.p,{children:"The torii server comprises of the rust backend that exposes the graphql and gRPC endpoints."}),`
`,e.jsxs(i.h3,{id:"torii-client",children:["Torii Client",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#torii-client",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.p,{children:"Torii client interfaces with the server to provide an easy to use api for your clients:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:e.jsx(i.a,{href:"/client/dojojs",children:"wasm"})}),`
`,e.jsx(i.li,{children:e.jsx(i.a,{href:"/client/sdk/unity",children:"unity"})}),`
`,e.jsx(i.li,{children:e.jsx(i.a,{href:"/client/sdk/unity",children:"c"})}),`
`]}),`
`,e.jsxs(i.h3,{id:"usage",children:["Usage",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#usage",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.p,{children:"Torii leverages world introspection to bootstrap directly from an onchain deployment. Simply run:"}),`
`,e.jsx(i.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(i.pre,{tabIndex:"0","data-language":"sh","data-theme":"github-dark-dimmed github-light",children:e.jsx(i.code,{"data-language":"sh","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:e.jsxs(i.span,{"data-line":"",children:[e.jsx(i.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"torii"}),e.jsx(i.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:" --world"}),e.jsx(i.span,{style:{"--shiki-dark":"#F47067","--shiki-light":"#D73A49"},children:" <"}),e.jsx(i.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:"World Addres"}),e.jsx(i.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"s"}),e.jsx(i.span,{style:{"--shiki-dark":"#F47067","--shiki-light":"#D73A49"},children:">"})]})})})}),`
`,e.jsxs(i.p,{children:["You'll have a GraphQL API running at ",e.jsx(i.code,{children:"http://localhost:8080/graphql"})," and a gRPC api at ",e.jsx(i.code,{children:"http://localhost:8080"})]}),`
`,e.jsxs(i.h2,{id:"installation",children:["Installation",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#installation",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:["The ",e.jsx(i.code,{children:"torii"})," binary can be installed via ",e.jsx(i.a,{href:"/getting-started/quick-start",children:e.jsx(i.code,{children:"dojoup"})}),", our dedicated installation package manager."]}),`
`,e.jsxs(i.h3,{id:"installing-from-source",children:["Installing from Source",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#installing-from-source",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.p,{children:"If you prefer to install from the source code:"}),`
`,e.jsx(i.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(i.pre,{tabIndex:"0","data-language":"sh","data-theme":"github-dark-dimmed github-light",children:e.jsx(i.code,{"data-language":"sh","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:e.jsxs(i.span,{"data-line":"",children:[e.jsx(i.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"cargo"}),e.jsx(i.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" install --path ./crates/torii --profile local --force"})]})})})}),`
`,e.jsx(i.p,{children:"This will install Torii and the required dependencies on your local system."}),`
`,e.jsxs(i.blockquote,{children:[`
`,e.jsxs(i.p,{children:["📚 ",e.jsx(i.strong,{children:"Reference"})]}),`
`,e.jsxs(i.p,{children:["See the ",e.jsxs(i.a,{href:"/reference",children:[e.jsx(i.code,{children:"torii"})," Reference"]})," for a complete reference."]}),`
`]})]})}function d(n={}){const{wrapper:i}={...t(),...n.components};return i?e.jsx(i,{...n,children:e.jsx(r,{...n})}):r(n)}export{d as default,s as frontmatter};
