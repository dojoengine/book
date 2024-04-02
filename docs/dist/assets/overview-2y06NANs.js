import{u as s,j as i}from"./index-KZ_aprDi.js";const l=void 0;function n(a){const e={a:"a",aside:"aside",br:"br",code:"code",div:"div",em:"em",figure:"figure",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...s(),...a.components};return i.jsxs(i.Fragment,{children:[i.jsx(e.p,{children:i.jsx(e.img,{src:"/katana-icon-word.png",alt:"katana"})}),`
`,i.jsxs(e.p,{children:["Katana is a ",i.jsx(e.em,{children:"blazingly fast"})," Starknet sequencer, designed to support both local development as well as production deployments."]}),`
`,i.jsx(e.p,{children:"In development mode, Katana provides the tool necessary for rapid iteration, including custom development RPCs for manipulating the execution context."}),`
`,i.jsx(e.p,{children:"In production mode, Katana provides a high performance sequencer optimized for gaming workloads, with support for settlment and cross layer communication."}),`
`,i.jsxs(e.h2,{id:"features-highlight",children:["Features highlight",i.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#features-highlight",children:i.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,i.jsxs(e.ul,{children:[`
`,i.jsxs(e.li,{children:[i.jsx(e.a,{href:"https://github.com/starkware-libs/starknet-specs/tree/v0.6.0",children:"Starknet JSON-RPC v0.6.0"})," support"]}),`
`,i.jsx(e.li,{children:"Cross layer communication (L1 <> L2, LN <> LN+1)"}),`
`,i.jsx(e.li,{children:"Development RPC methods for manipulating the blockchain states"}),`
`,i.jsx(e.li,{children:"State forking"}),`
`,i.jsx(e.li,{children:"Highly configurable"}),`
`]}),`
`,i.jsxs(e.h2,{id:"installation",children:["Installation",i.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#installation",children:i.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,i.jsxs(e.p,{children:[i.jsx(e.code,{children:"katana"})," binary is available via ",i.jsx(e.a,{href:"/getting-started/quick-start",children:i.jsx(e.code,{children:"dojoup"})}),"."]}),`
`,i.jsxs(e.h3,{id:"installing-from-source",children:["Installing from source",i.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#installing-from-source",children:i.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,i.jsxs(e.p,{children:["If you would like to install ",i.jsx(e.code,{children:"katana"})," from source, you can clone the Dojo repository locally and install it using ",i.jsx(e.a,{href:"https://doc.rust-lang.org/cargo/",children:i.jsx(e.code,{children:"cargo"})}),"."]}),`
`,i.jsx(e.figure,{"data-rehype-pretty-code-figure":"",children:i.jsx(e.pre,{tabIndex:"0","data-language":"sh","data-theme":"github-dark-dimmed github-light",children:i.jsxs(e.code,{"data-language":"sh","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[i.jsxs(e.span,{"data-line":"",children:[i.jsx(e.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"git"}),i.jsx(e.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" clone https://github.com/dojoengine/dojo"})]}),`
`,i.jsxs(e.span,{"data-line":"",children:[i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"cd"}),i.jsx(e.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" dojo"})]}),`
`,i.jsxs(e.span,{"data-line":"",children:[i.jsx(e.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"cargo"}),i.jsx(e.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" install --path ./bin/katana --locked --force"})]})]})})}),`
`,i.jsxs(e.h2,{id:"usage",children:["Usage",i.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#usage",children:i.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,i.jsx(e.p,{children:"You can run Katana without any arguments to start the sequencer with default settings."}),`
`,i.jsx(e.figure,{"data-rehype-pretty-code-figure":"",children:i.jsx(e.pre,{tabIndex:"0","data-language":"console","data-theme":"github-dark-dimmed github-light",children:i.jsx(e.code,{"data-language":"console","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"$ katana"})})})})}),`
`,i.jsx(e.figure,{"data-rehype-pretty-code-figure":"",children:i.jsx(e.pre,{tabIndex:"0","data-language":"console","data-theme":"github-dark-dimmed github-light",children:i.jsxs(e.code,{"data-language":"console","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[i.jsx(e.span,{"data-line":"",children:" "}),`
`,i.jsx(e.span,{"data-line":"",children:" "}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"██╗  ██╗ █████╗ ████████╗ █████╗ ███╗   ██╗ █████╗"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"██║ ██╔╝██╔══██╗╚══██╔══╝██╔══██╗████╗  ██║██╔══██╗"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"█████╔╝ ███████║   ██║   ███████║██╔██╗ ██║███████║"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"██╔═██╗ ██╔══██║   ██║   ██╔══██║██║╚██╗██║██╔══██║"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"██║  ██╗██║  ██║   ██║   ██║  ██║██║ ╚████║██║  ██║"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝"})}),`
`,i.jsx(e.span,{"data-line":"",children:" "}),`
`,i.jsx(e.span,{"data-line":"",children:" "}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"PREDEPLOYED CONTRACTS"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"=================="})}),`
`,i.jsx(e.span,{"data-line":"",children:" "}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Contract        | Fee Token"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Address         | 0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Class Hash      | 0x02a8846878b6ad1f54f6ba46f5f40e11cee755c677f130b2c4b60566c9003f1f"})}),`
`,i.jsx(e.span,{"data-line":"",children:" "}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Contract        | Universal Deployer"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Address         | 0x41a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Class Hash      | 0x07b3e05f48f0c69e4a65ce5e076a66271a527aff2c34ce1083ec6e1526997a69"})}),`
`,i.jsx(e.span,{"data-line":"",children:" "}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Contract        | Account Contract"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Class Hash      | 0x05400e90f7e0ae78bd02c77cd75527280470e2fe19c54970dd79dc37a9d3645c"})}),`
`,i.jsx(e.span,{"data-line":"",children:" "}),`
`,i.jsx(e.span,{"data-line":"",children:" "}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"PREFUNDED ACCOUNTS"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"=================="})}),`
`,i.jsx(e.span,{"data-line":"",children:" "}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Account address |  0xb3ff441a68610b30fd5e2abbf3a1548eb6ba6f3559f2862bf2dc757e5828ca"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Private key     |  0x2bbf4f9fd0bbb2e60b0316c1fe0b76cf7a4d0198bd493ced9b8df2a3a24d68a"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Public key      |  0x640466ebd2ce505209d3e5c4494b4276ed8f1cde764d757eb48831961f7cdea"})}),`
`,i.jsx(e.span,{"data-line":"",children:" "}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Account address |  0xe29882a1fcba1e7e10cad46212257fea5c752a4f9b1b1ec683c503a2cf5c8a"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Private key     |  0x14d6672dcb4b77ca36a887e9a11cd9d637d5012468175829e9c6e770c61642"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Public key      |  0x16e375df37a7653038bd9eccd767e780c2c4d4c66b4c85f455236a3fd75673a"})}),`
`,i.jsx(e.span,{"data-line":"",children:" "}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Account address |  0x29873c310fbefde666dc32a1554fea6bb45eecc84f680f8a2b0a8fbb8cb89af"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Private key     |  0xc5b2fcab997346f3ea1c00b002ecf6f382c5f9c9659a3894eb783c5320f912"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Public key      |  0x33246ce85ebdc292e6a5c5b4dd51fab2757be34b8ffda847ca6925edf31cb67"})}),`
`,i.jsx(e.span,{"data-line":"",children:" "}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Account address |  0x2d71e9c974539bb3ffb4b115e66a23d0f62a641ea66c4016e903454c8753bbc"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Private key     |  0x33003003001800009900180300d206308b0070db00121318d17b5e6262150b"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Public key      |  0x4c0f884b8e5b4f00d97a3aad26b2e5de0c0c76a555060c837da2e287403c01d"})}),`
`,i.jsx(e.span,{"data-line":"",children:" "}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Account address |  0x3ebb4767aae1262f8eb28d9368db5388cfe367f50552a8244123506f0b0bcca"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Private key     |  0x3e3979c1ed728490308054fe357a9f49cf67f80f9721f44cc57235129e090f4"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Public key      |  0x1e8965b7d0b20b91a62fe515dd991dc9fcb748acddf6b2cf18cec3bdd0f9f9a"})}),`
`,i.jsx(e.span,{"data-line":"",children:" "}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Account address |  0x541da8f7f3ab8247329d22b3987d1ffb181bc8dc7f9611a6eccec3b0749a585"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Private key     |  0x736adbbcdac7cc600f89051db1abbc16b9996b46f6b58a9752a11c1028a8ec8"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Public key      |  0x570258e7277eb345ab80803c1dc5847591efd028916fc826bc7cd47ccd8f20d"})}),`
`,i.jsx(e.span,{"data-line":"",children:" "}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Account address |  0x56c155b624fdf6bfc94f7b37cf1dbebb5e186ef2e4ab2762367cd07c8f892a1"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Private key     |  0x6bf3604bcb41fed6c42bcca5436eeb65083a982ff65db0dc123f65358008b51"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Public key      |  0x4b076e402835913e3f6812ed28cef8b757d4643ebf2714471a387cb10f22be3"})}),`
`,i.jsx(e.span,{"data-line":"",children:" "}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Account address |  0x6162896d1d7ab204c7ccac6dd5f8e9e7c25ecd5ae4fcb4ad32e57786bb46e03"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Private key     |  0x1800000000300000180000000000030000000000003006001800006600"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Public key      |  0x2b191c2f3ecf685a91af7cf72a43e7b90e2e41220175de5c4f7498981b10053"})}),`
`,i.jsx(e.span,{"data-line":"",children:" "}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Account address |  0x66efb28ac62686966ae85095ff3a772e014e7fbf56d4c5f6fac5606d4dde23a"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Private key     |  0x283d1e73776cd4ac1ac5f0b879f561bded25eceb2cc589c674af0cec41df441"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Public key      |  0x73c8a29ba0e6a368422d0551b3f45a30a27166b809ba07a41a1bc434b000ba7"})}),`
`,i.jsx(e.span,{"data-line":"",children:" "}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Account address |  0x6b86e40118f29ebe393a75469b4d926c7a44c2e2681b6d319520b7c1156d114"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Private key     |  0x1c9053c053edf324aec366a34c6901b1095b07af69495bffec7d7fe21effb1b"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"| Public key      |  0x4c339f18b9d1b95b64a6d378abd1480b2e0d5d5bd33cd0828cbce4d65c27284"})}),`
`,i.jsx(e.span,{"data-line":"",children:" "}),`
`,i.jsx(e.span,{"data-line":"",children:" "}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"ACCOUNTS SEED"})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"============="})}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"0"})}),`
`,i.jsx(e.span,{"data-line":"",children:" "}),`
`,i.jsx(e.span,{"data-line":"",children:" "}),`
`,i.jsx(e.span,{"data-line":"",children:i.jsx(e.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"🚀 JSON-RPC server started: http://0.0.0.0:5050"})}),`
`,i.jsx(e.span,{"data-line":"",children:" "})]})})}),`
`,i.jsx(e.aside,{"data-callout":"note",children:i.jsxs(e.p,{children:["📚 ",i.jsx(e.strong,{children:"CLI Reference"}),i.jsx(e.br,{}),`
`,"See the ",i.jsxs(e.a,{href:"/toolchain/katana/cli-reference",children:[i.jsx(e.code,{children:"katana"})," Reference"]})," for an in depth reference and documentation on all the available subcommands and options."]})})]})}function c(a={}){const{wrapper:e}={...s(),...a.components};return e?i.jsx(e,{...a,children:i.jsx(n,{...a})}):n(a)}export{c as default,l as frontmatter};
