import{u as d,j as e}from"./index-m6NaWekR.js";const t=void 0;function i(a){const n={a:"a",blockquote:"blockquote",code:"code",div:"div",figure:"figure",h2:"h2",h3:"h3",p:"p",pre:"pre",span:"span",...d(),...a.components};return e.jsxs(e.Fragment,{children:[e.jsxs(n.h2,{id:"events",children:["Events",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#events",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Events play a pivotal role in decoding the dynamics of a Dojo world. Every time there's an update to a ",e.jsx(n.code,{children:"Model"}),", the ",e.jsx(n.code,{children:"World"})," contract emits these events. What's even more exciting is that you can craft your own custom events to fit specific needs! Moreover, thanks to ",e.jsx(n.a,{href:"/toolchain/torii/overview",children:"Torii"}),", all these events are seamlessly indexed, ensuring easy and efficient querying."]}),`
`,e.jsxs(n.h3,{id:"model-events",children:["Model Events",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#model-events",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Consider this example of a ",e.jsx(n.code,{children:"Moves"})," model:"]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:e.jsxs(n.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"struct Moves {"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    #[key]"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    player: Address,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    remaining: u32,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"}"})})]})})}),`
`,e.jsxs(n.p,{children:["When this model is updated, the ",e.jsx(n.code,{children:"World"})," contract will emit an event with the following structure:"]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:e.jsxs(n.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"#[derive(Drop, starknet::Event)]"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"struct StoreSetRecord {"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    table: felt252, // Moves"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    keys: Span<felt252>, // [player]"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    offset: u8, // offset for the value in the table"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    value: Span<felt252>, // [remaining]"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"}"})})]})})}),`
`,e.jsxs(n.p,{children:["This will then be captured by ",e.jsx(n.a,{href:"/toolchain/torii/overview",children:"Torii"})," and indexed for querying. This will allow you to then reconstruct the state of your world."]}),`
`,e.jsxs(n.p,{children:["Similarly, when a model is deleted, the ",e.jsx(n.code,{children:"World"})," contract will emit an event with the following structure:"]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:e.jsxs(n.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"#[derive(Drop, starknet::Event)]"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"struct StoreDelRecord {"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    table: felt252,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    keys: Span<felt252>,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"}"})})]})})}),`
`,e.jsxs(n.h3,{id:"world-events",children:["World Events",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#world-events",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"World"})," contract also emits events when it's initialized and when new models and contracts are registered. These events are emitted with the following structures:"]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:e.jsxs(n.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"#[derive(Drop, starknet::Event)]"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"struct WorldSpawned {"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    address: ContractAddress,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    caller: ContractAddress"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"}"})})]})})}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:e.jsxs(n.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"#[derive(Drop, starknet::Event)]"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"struct ModelRegistered {"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    name: felt252,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    class_hash: ClassHash,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    prev_class_hash: ClassHash"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"}"})})]})})}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:e.jsxs(n.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"#[derive(Drop, starknet::Event)]"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"struct ContractDeployed {"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    salt: felt252,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    class_hash: ClassHash,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    address: ContractAddress,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"}"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"#[derive(Drop, starknet::Event)]"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"struct ContractUpgraded {"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    class_hash: ClassHash,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    address: ContractAddress,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"}"})})]})})}),`
`,e.jsxs(n.p,{children:["These events are also captured by ",e.jsx(n.a,{href:"/toolchain/torii/overview",children:"Torii"})," and indexed for querying."]}),`
`,e.jsxs(n.h3,{id:"custom-events",children:["Custom Events",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#custom-events",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Within your game, emitting custom events can be highly beneficial. Fortunately, there's a handy ",e.jsx(n.code,{children:"emit!"})," command that lets you release events directly from your world. These events are indexed by ",e.jsx(n.a,{href:"/toolchain/torii/overview",children:"Torii"}),"."]}),`
`,e.jsx(n.p,{children:"Use it like so:"}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:e.jsx(n.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"emit!(world, Moved { address, direction });"})})})})}),`
`,e.jsx(n.p,{children:"Include this in your contract and it will emit an event with the following structure:"}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:e.jsxs(n.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"#[derive(Drop, starknet::Event)]"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"struct Moved {"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    address: felt252,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    direction: felt252,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"}"})})]})})}),`
`,e.jsx(n.p,{children:"Now a full example using a custom event:"}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:e.jsxs(n.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"fn move(ctx: Context, direction: Direction) {"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    let (mut position, mut moves) = get !(world, caller, (Position, Moves));"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    moves.remaining -= 1;"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    let next = next_position(position, direction);"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    set !(world, (moves, next));"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    emit !(world, Moved { address: caller, direction });"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"}"})})]})})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:["Note: Read about the ",e.jsx(n.code,{children:"get!"})," and ",e.jsx(n.code,{children:"set!"})," macros in ",e.jsx(n.a,{href:"/commands",children:"Commands"}),"."]}),`
`]})]})}function r(a={}){const{wrapper:n}={...d(),...a.components};return n?e.jsx(n,{...a,children:e.jsx(i,{...a})}):i(a)}export{r as default,t as frontmatter};
