import{u as t,j as e}from"./index-B0rG63LL.js";const i=void 0;function a(s){const n={a:"a",blockquote:"blockquote",code:"code",div:"div",figure:"figure",h2:"h2",h3:"h3",img:"img",p:"p",pre:"pre",span:"span",strong:"strong",...t(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"To think about:"})," Consider Autonomous Worlds as sovereign blockchains residing within another blockchain - a nested blockchain, so to speak. Just as you can deploy contracts onto Ethereum to enhance its functionality, you can similarly introduce systems into the World contract to enrich its features. While anyone can contribute to the World, akin to Ethereum, authorization is required to interact with model state. There is a dedicated topic to ",e.jsx(n.a,{href:"/cairo/authorization",children:"Authorisation"}),"."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/world-map.png",alt:"overview"})}),`
`,e.jsxs(n.h2,{id:"the-world-contract",children:["The World Contract",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#the-world-contract",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"The world contract functions as a central store for the world models and systems. Every contract that interacts with the world, must use the world contract address as the first parameter. This is how the world contract is able to manage the state of the world."}),`
`,e.jsx(n.p,{children:"Although we suggest strongly to structure your world around an ECS pattern you are not required to do so. You can simply use the dojo-models as a keypair store along with the supporting infrastructure."}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"NOTE: Dojo core abstracts the world contract away, you do not write it and it is not meant to be altered when building a world. However, it's important to understand how it works and how it interacts with the rest of the system."}),`
`]}),`
`,e.jsxs(n.h3,{id:"events",children:["Events",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#events",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["The world contract emits all model events via the ",e.jsx(n.code,{children:"StoreSetRecord"})," event. This enables block explorers to reconstruct everything in the world by listening to one contract."]}),`
`,e.jsxs(n.h3,{id:"full-world-api",children:["Full World API",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#full-world-api",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["The world exposes an interface which can be interacted with by any client. It is worth noting here that as a developer you don't deploy this world, it is deployed when you ",e.jsx(n.a,{href:"/toolchain/sozo/overview",children:"migrate"})," the world."]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:e.jsxs(n.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"// World interface"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"#[starknet::interface]"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"trait IWorld<T> {"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    fn metadata_uri(self: @T, resource: felt252) -> Span<felt252>;"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    fn set_metadata_uri(ref self: T, resource: felt252, uri: Span<felt252>);"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    fn model(self: @T, name: felt252) -> ClassHash;"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    fn register_model(ref self: T, class_hash: ClassHash);"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    fn deploy_contract(ref self: T, salt: felt252, class_hash: ClassHash) -> ContractAddress;"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    fn upgrade_contract(ref self: T, address: ContractAddress, class_hash: ClassHash) -> ClassHash;"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    fn uuid(ref self: T) -> usize;"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    fn emit(self: @T, keys: Array<felt252>, values: Span<felt252>);"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    fn entity("})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        self: @T, model: felt252, keys: Span<felt252>, offset: u8, length: usize, layout: Span<u8>"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    ) -> Span<felt252>;"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    fn set_entity("})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        ref self: T,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        model: felt252,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        keys: Span<felt252>,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        offset: u8,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        values: Span<felt252>,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        layout: Span<u8>"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    );"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    fn entities("})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        self: @T,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        model: felt252,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        index: Option<felt252>,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        values: Span<felt252>,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        values_length: usize,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        values_layout: Span<u8>"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    ) -> (Span<felt252>, Span<Span<felt252>>);"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    fn entity_ids(self: @T, model: felt252) -> Span<felt252>;"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    fn set_executor(ref self: T, contract_address: ContractAddress);"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    fn executor(self: @T) -> ContractAddress;"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    fn base(self: @T) -> ClassHash;"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    fn delete_entity(ref self: T, model: felt252, keys: Span<felt252>, layout: Span<u8>);"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    fn is_owner(self: @T, address: ContractAddress, resource: felt252) -> bool;"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    fn grant_owner(ref self: T, address: ContractAddress, resource: felt252);"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    fn revoke_owner(ref self: T, address: ContractAddress, resource: felt252);"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    fn is_writer(self: @T, model: felt252, system: ContractAddress) -> bool;"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    fn grant_writer(ref self: T, model: felt252, system: ContractAddress);"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    fn revoke_writer(ref self: T, model: felt252, system: ContractAddress);"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"}"})})]})})}),`
`,e.jsxs(n.h3,{id:"uuid",children:[e.jsx(n.code,{children:"uuid()"}),e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#uuid",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["It is often useful to generate unique IDs for entities. The ",e.jsx(n.code,{children:"uuid()"})," fn can be used to generate a unique ID."]}),`
`,e.jsx(n.p,{children:"Use it like this:"}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:e.jsx(n.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"let game_id = world.uuid();"})})})})})]})}function d(s={}){const{wrapper:n}={...t(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(a,{...s})}):a(s)}export{d as default,i as frontmatter};
