import{u as i,j as e}from"./index-m6NaWekR.js";const t=void 0;function s(a){const n={a:"a",code:"code",div:"div",figure:"figure",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...i(),...a.components};return e.jsxs(e.Fragment,{children:[e.jsxs(n.h2,{id:"migration-guide-to-030",children:["Migration Guide to 0.3.0",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#migration-guide-to-030",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"0.3.0 introduced some breaking changes to Systems and Models which requires reworking of your worlds."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#components-to-models",children:"Components"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#systems-update",children:"Systems"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#events",children:"Events"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#npm",children:"Npm"})}),`
`]}),`
`,e.jsxs(n.h3,{id:"components-to-models",children:["Components to Models",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#components-to-models",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:'In version 0.3.0, "components" have been renamed to "models". This has been done due to Cairo introducing the concept of Components natively.'}),`
`,e.jsx(n.p,{children:"You must:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Replace ",e.jsx(n.code,{children:"#[component]"})," with ",e.jsx(n.code,{children:"#[model]"}),"."]}),`
`,e.jsxs(n.li,{children:["Update ",e.jsx(n.code,{children:"#[derive(Component)]"})," to ",e.jsx(n.code,{children:"#[derive(Model)]"})," throughout your code."]}),`
`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note"}),": Ensure all related files and imports are updated accordingly."]}),`
`,e.jsxs(n.h3,{id:"changes-in-model-implementation",children:["Changes in Model Implementation",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#changes-in-model-implementation",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["The trait ",e.jsx(n.code,{children:"SerdeLen"})," is no longer implemented for models. If you relied on this previously, you should now use ",e.jsx(n.code,{children:"SchemaIntrospection"}),"."]}),`
`,e.jsxs(n.h3,{id:"schema-introduction",children:["Schema Introduction",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#schema-introduction",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["For models containing complex types, it's crucial to implement the ",e.jsx(n.code,{children:"SchemaIntrospection"})," trait."]}),`
`,e.jsx(n.p,{children:"Consider the model below:"}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:e.jsxs(n.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"struct Card {"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    #[key]"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    token_id: u256,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    /// The card's designated role."})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    role: Roles,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"}"})})]})})}),`
`,e.jsxs(n.p,{children:["For complex types, like ",e.jsx(n.code,{children:"Roles"})," in the above example, you need to implement ",e.jsx(n.code,{children:"SchemaIntrospection"}),". Here's how:"]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:e.jsxs(n.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"impl RolesSchemaIntrospectionImpl of SchemaIntrospection<Roles> {"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    #[inline(always)]"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    fn size() -> usize {"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        1 // Represents the byte size of the enum."})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    }"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    #[inline(always)]"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    fn layout(ref layout: Array<u8>) {"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        layout.append(8); // Specifies the layout byte size;"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    }"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    #[inline(always)]"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    fn ty() -> Ty {"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        Ty::Enum("})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"            Enum {"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"                name: 'Roles',"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"                attrs: array![].span(),"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"                children: array!["})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"                    ('Goalkeeper', serialize_member_type(@Ty::Tuple(array![].span()))),"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"                    ('Defender', serialize_member_type(@Ty::Tuple(array![].span()))),"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"                    ('Midfielder', serialize_member_type(@Ty::Tuple(array![].span()))),"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"                    ('Attacker', serialize_member_type(@Ty::Tuple(array![].span()))),"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"                ]"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"                .span()"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"            }"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        )"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    }"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"}"})})]})})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Key Takeaways from custom types"}),":"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"size"}),": Defines the byte size of the type."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"layout"}),": Outlines the byte structure/layout for the type. Validate and adjust as necessary."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"ty"}),": Details the specific type, attributes, and subcomponents. For enums, like ",e.jsx(n.code,{children:"Roles"}),", you need to specify each member and its type."]}),`
`]}),`
`,e.jsxs(n.h3,{id:"systems-update",children:["Systems Update",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#systems-update",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"Systems in 0.3.0 are very similar now to Cairo Contracts. You can write your systems just like regular contracts, and each dojo contract can contain mulitple systems."}),`
`,e.jsx(n.p,{children:"Important high level changes:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Systems are now starknet contracts"}),`
`,e.jsxs(n.li,{children:["Define ",e.jsx(n.a,{href:"#interface-creation",children:"Interfaces"})," for each system contract"]}),`
`,e.jsxs(n.li,{children:["New optional ",e.jsx(n.code,{children:"#[dojo::contract]"})," decorator defining systems"]}),`
`,e.jsx(n.li,{children:"Multiple systems per dojo contract, rather than singular"}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"execute"})," is no longer required system selector name"]}),`
`]}),`
`,e.jsxs(n.h4,{id:"interface-creation",children:["Interface Creation",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#interface-creation",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"System management has been revamped. Start by defining an interface for each system, which specifies its implementation:"}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:e.jsxs(n.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"#[starknet::interface]"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"trait ICreateCard<TContractState> {"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    fn create_card("})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        self: @TContractState,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        world: IWorldDispatcher,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        token_id: u256,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        dribble: u8,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        defense: u8,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        cost: u8,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        role: Roles,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        is_captain: bool"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    );"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"}"})})]})})}),`
`,e.jsxs(n.p,{children:["Ensure the trait is typed with ",e.jsx(n.code,{children:"TContractState"}),"."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note"}),": Earlier versions required functions within the system to be named ",e.jsx(n.code,{children:"execute"}),". This is no longer the case."]}),`
`,e.jsxs(n.h4,{id:"interface-implementation",children:["Interface Implementation",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#interface-implementation",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"To implement the interface:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Add ",e.jsx(n.code,{children:"#[abi(embed_v0)]"})," before each method."]}),`
`,e.jsxs(n.li,{children:["Ensure to reference the created interface in the module with ",e.jsx(n.code,{children:"use super::ICreateCard;"}),"."]}),`
`]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:e.jsxs(n.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"#[abi(embed_v0)]"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"impl CreateCardImpl of ICreateCard<ContractState> {"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    fn create_card("})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        self: @ContractState,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        world: IWorldDispatcher,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        token_id: u256,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        dribble: u8,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        defense: u8,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        cost: u8,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        role: Roles,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        is_captain: bool"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    ) {"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        // your logic here"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    }"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"}"})})]})})}),`
`,e.jsxs(n.p,{children:["This then allows the ",e.jsx(n.code,{children:"create_card"})," to be called just like a regular starknet function."]}),`
`,e.jsxs(n.h4,{id:"dojocontract-decorator",children:[e.jsx(n.code,{children:"#[dojo::contract]"})," decorator",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#dojocontract-decorator",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["0.3.0 introduces a new optional decorator ",e.jsx(n.code,{children:"#[dojo::contract]"})," which indicates to the compiler to inject imports and the world dispatcher. This allows for minimal boilerplate."]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:e.jsxs(n.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"#[dojo::contract]"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"mod move {"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"....code TODO"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"}"})})]})})}),`
`,e.jsxs(n.h3,{id:"events",children:["Events",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#events",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"Events should now reside within the models. Here's an example of how to migrate your events:"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Previous Format"}),":"]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:e.jsxs(n.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"#[derive(Drop, starknet::Event, Copy)]"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"struct DeckCreated {"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    player: ContractAddress,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    token_list: Span<u256>,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"}"})})]})})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"New Format"}),":"]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:e.jsxs(n.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"#[event]"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"#[derive(Drop, starknet::Event)]"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"enum Event {"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    DeckCreated: DeckCreated"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"}"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"#[derive(Drop, starknet::Event)]"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"struct DeckCreated {"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    player: ContractAddress,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    token_list: Span<u256>,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"}"})})]})})}),`
`,e.jsxs(n.h3,{id:"testing-changes",children:["Testing Changes",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#testing-changes",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.h4,{id:"setup",children:["Setup",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#setup",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Testing has seen significant changes with the change to systems as Contracts. Instead of using ",e.jsx(n.code,{children:"world.execute"}),", use the dispatcher."]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Import necessary modules and traits:"}),`
`]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:e.jsxs(n.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"use dojo::test_utils::deploy_contract;"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"use tsubasa::systems::{ICreateCardDispatcher, ICreateCardDispatcherTrait};"})})]})})}),`
`,e.jsxs(n.ol,{start:"2",children:[`
`,e.jsx(n.li,{children:"Deploy the contract and instantiate the dispatcher:"}),`
`]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:e.jsxs(n.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"let contract_create_card = deploy_contract("})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    create_card_system::TEST_CLASS_HASH, array![].span()"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:");"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"let create_card_system = ICreateCardDispatcher { contract_address: contract_create_card };"})})]})})}),`
`,e.jsxs(n.h4,{id:"function-testing",children:["Function Testing",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#function-testing",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"With the contract deployed and the dispatcher instantiated, proceed to test your functions:"}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:e.jsxs(n.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"// ... (previous setup code)"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"let result = create_card_system.create_card("})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    // ... provide necessary parameters here"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:");"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"// Assert or validate the 'result' as per your test conditions"})})]})})})]})}function r(a={}){const{wrapper:n}={...i(),...a.components};return n?e.jsx(n,{...a,children:e.jsx(s,{...a})}):s(a)}export{r as default,t as frontmatter};
