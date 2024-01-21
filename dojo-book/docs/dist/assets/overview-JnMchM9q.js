import{u as i,j as n}from"./index-B0rG63LL.js";const t=void 0;function s(a){const e={a:"a",blockquote:"blockquote",code:"code",div:"div",figure:"figure",h2:"h2",h3:"h3",h4:"h4",p:"p",pre:"pre",span:"span",...i(),...a.components};return n.jsxs(n.Fragment,{children:[n.jsxs(e.blockquote,{children:[`
`,n.jsxs(e.p,{children:["You should have a good understanding of Cairo before proceeding. If you're unfamiliar with Cairo, we recommend you read the ",n.jsx(e.a,{href:"https://book.cairo-lang.org/title-page.html",children:"Cairo documentation"})," first."]}),`
`]}),`
`,n.jsxs(e.h2,{id:"a-new-approach-to-onchain-game-development",children:["A New Approach to Onchain Game Development",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#a-new-approach-to-onchain-game-development",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsx(e.p,{children:"Dojo provides an advanced abstraction layer over Cairo, mirroring React's relationship with JavaScript. Its specialized architecture simplifies game design and development."}),`
`,n.jsxs(e.p,{children:["By leveraging Dojo, developers can use succinct ",n.jsx(e.a,{href:"/cairo/commands",children:"commands"})," that transform into comprehensive queries at compile time."]}),`
`,n.jsxs(e.h4,{id:"delving-into-the-architecture",children:["Delving into the Architecture",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#delving-into-the-architecture",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsx(e.p,{children:"Dojo efficiently encapsulates boilerplate contracts within the compiler, letting developers concentrate on the distinct aspects of their game or app."}),`
`,n.jsx(e.p,{children:"Consider this as the most basic Dojo world setup:"}),`
`,n.jsx(e.figure,{"data-rehype-pretty-code-figure":"",children:n.jsx(e.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:n.jsxs(e.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"- src"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"  - main.cairo"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"  - lib.cairo"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"- Scarb.toml"})})]})})}),`
`,n.jsx(e.p,{children:"While seemingly simple, behind the scenes Dojo compiler generates foundational contracts, setting the stage for you to focus purely on data and logic."}),`
`,n.jsxs(e.p,{children:["Lets take a look at the ",n.jsx(e.code,{children:"main.cairo"}),":"]}),`
`,n.jsx(e.figure,{"data-rehype-pretty-code-figure":"",children:n.jsx(e.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:n.jsxs(e.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"use starknet::ContractAddress;"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"// dojo data models"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"#[derive(Model, Copy, Drop, Serde)]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"struct Position {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    #[key] // primary key"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    player: ContractAddress,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    vec: Vec2,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"}"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"// regular cairo struct"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"#[derive(Copy, Drop, Serde, Introspect)]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"struct Vec2 {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    x: u32,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    y: u32"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"}"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"// interface"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"#[starknet::interface]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"trait IPlayerActions<TContractState> {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    fn spawn(self: @TContractState);"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"}"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"// contract"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"#[dojo::contract]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"mod player_actions {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    use starknet::{ContractAddress, get_caller_address};"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    use super::{Position, Vec2};"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    use super::IPlayerActions;"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    #[abi(embed_v0)]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    impl PlayerActionsImpl of IPlayerActions<ContractState> {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        //"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        // This is how we interact with the world contract."})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        //"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        fn spawn(self: @ContractState) {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            // Access the world dispatcher for reading."})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            let world = self.world_dispatcher.read();"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            // get player address"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            let player = get_caller_address();"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            // dojo command - get player position"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            let position = get!(world, player, (Position));"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            // dojo command - set player position"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            set!(world, (Position { player, vec: Vec2 { x: 10, y: 10 } }));"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        }"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    }"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"}"})})]})})}),`
`,n.jsxs(e.h3,{id:"breakdown",children:["Breakdown",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#breakdown",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsx(e.p,{children:"Dojo contract is just a regular Cairo contract, with some dojo specifics."}),`
`,n.jsxs(e.h4,{id:"position-struct---the-dojo-model",children:[n.jsx(e.code,{children:"Position"})," struct - the dojo model",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#position-struct---the-dojo-model",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(e.p,{children:["In a Dojo world, state is defined using models. These are structs marked with the ",n.jsx(e.code,{children:"#[derive(Model)]"})," attribute, functioning similarly to a key-pair store. The primary key for a model is indicated using the ",n.jsx(e.code,{children:"#[key]"})," attribute; for instance, the ",n.jsx(e.code,{children:"player"})," field serves as the primary key in this context."]}),`
`,n.jsxs(e.p,{children:["Read more about models ",n.jsx(e.a,{href:"/cairo/models",children:"here"}),"."]}),`
`,n.jsxs(e.h4,{id:"spawn-function---a-dojo-system",children:[n.jsx(e.code,{children:"spawn"})," function - a dojo system",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#spawn-function---a-dojo-system",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(e.p,{children:["In the ",n.jsx(e.code,{children:"spawn"})," function, we just call ",n.jsx(e.code,{children:"self.world_dispatcher"}),". This provides a gateway to the world contract. This facilitates the effortless utilization of the get! and set! commands, allowing seamless interaction with the world contract."]}),`
`,n.jsxs(e.p,{children:["Commands, a significant innovation in Dojo, are further explored ",n.jsx(e.a,{href:"/cairo/commands",children:"here"}),"."]})]})}function r(a={}){const{wrapper:e}={...i(),...a.components};return e?n.jsx(e,{...a,children:n.jsx(s,{...a})}):s(a)}export{r as default,t as frontmatter};
