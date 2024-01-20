import{u as i,j as n}from"./index-m6NaWekR.js";const l=void 0;function s(a){const e={a:"a",blockquote:"blockquote",code:"code",div:"div",em:"em",figure:"figure",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...i(),...a.components};return n.jsxs(n.Fragment,{children:[n.jsxs(e.h2,{id:"models",children:["Models",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#models",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(e.blockquote,{children:[`
`,n.jsx(e.p,{children:"Models = Data"}),`
`]}),`
`,n.jsx(e.strong,{children:n.jsx(e.em,{children:"TL;DR"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Models store structured data in your world."}),`
`,n.jsx(e.li,{children:"Models are Cairo structs with additional features."}),`
`,n.jsx(e.li,{children:"Models can implement traits."}),`
`,n.jsxs(e.li,{children:["Use the ",n.jsx(e.code,{children:"#[derive(Model)]"})," decorator to define them."]}),`
`,n.jsx(e.li,{children:"Custom enums and types are supported."}),`
`,n.jsxs(e.li,{children:["Define the primary key using the ",n.jsx(e.code,{children:"#[key]"})," attribute."]}),`
`]}),`
`,n.jsxs(e.h3,{id:"models-are-structs",children:["Models are Structs",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#models-are-structs",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(e.p,{children:["Models are structs annotated with the ",n.jsx(e.code,{children:"#[derive(Model)]"})," attribute. Consider these models as a key-value store, where the ",n.jsx(e.code,{children:"#[key]"})," attribute is utilized to define the primary key. While models can contain any number of fields, adhering to best practices in Entity-Component-System (ECS) design involves maintaining small, isolated models."]}),`
`,n.jsx(e.p,{children:"This approach fosters modularity and composability, enabling you to reuse models across various entity types."}),`
`,n.jsx(e.figure,{"data-rehype-pretty-code-figure":"",children:n.jsx(e.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:n.jsxs(e.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"#[derive(Model, Copy, Drop, Serde)]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"struct Moves {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    #[key]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    player: ContractAddress,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    remaining: u8,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"}"})})]})})}),`
`,n.jsxs(e.h4,{id:"the-key-attribute",children:["The #[key] attribute",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#the-key-attribute",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(e.p,{children:["The ",n.jsx(e.code,{children:"#[key]"})," attribute indicates to Dojo that this model is indexed by the ",n.jsx(e.code,{children:"player"})," field. A field that is identified as a ",n.jsx(e.code,{children:"#[key]"})," is not stored. It is used by the dojo database system to uniquely identify the storage location that contains your model."]}),`
`,n.jsxs(e.p,{children:["You need to define at least one key for each model, as this is how you query the model. However, you can create composite keys by defining multiple fields as keys. If you define multiple keys, they must ",n.jsx(e.strong,{children:"all"})," be provided to query the model."]}),`
`,n.jsx(e.figure,{"data-rehype-pretty-code-figure":"",children:n.jsx(e.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:n.jsxs(e.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"#[derive(Model, Copy, Drop, Serde)]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"struct Resource {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    #[key]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    player: ContractAddress,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    #[key]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    location: ContractAddress,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    balance: u8,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"}"})})]})})}),`
`,n.jsx(e.p,{children:"In this case you then would set the model with both the player and location fields:"}),`
`,n.jsx(e.figure,{"data-rehype-pretty-code-figure":"",children:n.jsx(e.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:n.jsxs(e.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"set!("})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    world,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    ("})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        Resource {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            player: caller,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            location: 12,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            balance: 10"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        },"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    )"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:");"})})]})})}),`
`,n.jsxs(e.p,{children:["To retrieve a model with a composite key using the ",n.jsx(e.a,{href:"/commands",children:"get!"})," command, you must provide a value for each key as follow:"]}),`
`,n.jsx(e.figure,{"data-rehype-pretty-code-figure":"",children:n.jsx(e.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:n.jsxs(e.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"let player = get_caller_address();"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"let location = 0x1234;"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"let resource = get!(world, (player, location), (Resource));"})})]})})}),`
`,n.jsxs(e.h4,{id:"implementing-traits",children:["Implementing Traits",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#implementing-traits",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(e.p,{children:["Models can implement traits. This is useful for defining common functionality across models. For example, you may want to define a ",n.jsx(e.code,{children:"Position"})," model that implements a ",n.jsx(e.code,{children:"PositionTrait"})," trait. This trait could define functions such as ",n.jsx(e.code,{children:"is_zero"})," and ",n.jsx(e.code,{children:"is_equal"})," which could be used when accessing the model."]}),`
`,n.jsx(e.figure,{"data-rehype-pretty-code-figure":"",children:n.jsx(e.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:n.jsxs(e.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"trait PositionTrait {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    fn is_zero(self: Position) -> bool;"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    fn is_equal(self: Position, b: Position) -> bool;"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"}"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"impl PositionImpl of PositionTrait {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    fn is_zero(self: Position) -> bool {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        if self.x - self.y == 0 {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            return true;"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        }"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        false"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    }"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    fn is_equal(self: Position, b: Position) -> bool {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        self.x == b.x && self.y == b.y"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    }"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"}"})})]})})}),`
`,n.jsxs(e.h4,{id:"custom-setting-models",children:["Custom Setting models",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#custom-setting-models",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(e.p,{children:["Suppose we need a place to keep a global value with the flexibility to modify it in the future. Take, for instance, a global ",n.jsx(e.code,{children:"combat_cool_down"})," parameter that defines the duration required for an entity to be primed for another attack. To achieve this, we can craft a model dedicated to storing this value, while also allowing for its modification via a decentralized governance model."]}),`
`,n.jsx(e.p,{children:"To establish these models, you'd follow the usual creation method. However, when initializing them, employ a constant identifier, such as GAME_SETTINGS_ID."}),`
`,n.jsx(e.figure,{"data-rehype-pretty-code-figure":"",children:n.jsx(e.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:n.jsxs(e.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"const GAME_SETTINGS_ID: u32 = 9999999999999;"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"#[derive(model, Copy, Drop, Serde)]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"struct GameSettings {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    #[key]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    game_settings_id: u32,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    combat_cool_down: u32,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"}"})})]})})}),`
`,n.jsxs(e.h4,{id:"types",children:["Types",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#types",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsx(e.p,{children:"Support model types:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"u8"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"u16"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"u32"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"u64"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"u128"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"u256"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"ContractAddress"})}),`
`,n.jsx(e.li,{children:"Enums"}),`
`,n.jsx(e.li,{children:"Custom Types"}),`
`]}),`
`,n.jsx(e.p,{children:"It is currently not possible to use Arrays."}),`
`,n.jsxs(e.h4,{id:"custom-types--enums",children:["Custom Types + Enums",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#custom-types--enums",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(e.p,{children:["For models containing complex types, it's crucial to implement the ",n.jsx(e.code,{children:"SchemaIntrospection"})," trait."]}),`
`,n.jsx(e.p,{children:"Consider the model below:"}),`
`,n.jsx(e.figure,{"data-rehype-pretty-code-figure":"",children:n.jsx(e.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:n.jsxs(e.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"struct Card {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    #[key]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    token_id: u256,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    /// The card's designated role."})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    role: Roles,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"}"})})]})})}),`
`,n.jsxs(e.p,{children:["For complex types, like ",n.jsx(e.code,{children:"Roles"})," in the above example, you need to implement ",n.jsx(e.code,{children:"SchemaIntrospection"}),". Here's how:"]}),`
`,n.jsx(e.figure,{"data-rehype-pretty-code-figure":"",children:n.jsx(e.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:n.jsxs(e.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"impl RolesSchemaIntrospectionImpl for SchemaIntrospection<Roles> {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    #[inline(always)]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    fn size() -> usize {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        1 // Represents the byte size of the enum."})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    }"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    #[inline(always)]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    fn layout(ref layout: Array<u8>) {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        layout.append(8); // Specifies the layout byte size;"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    }"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    #[inline(always)]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    fn ty() -> Ty {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        Ty::Enum("})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            Enum {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                name: 'Roles',"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                attrs: array![].span(),"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                children: array!["})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    ('Goalkeeper', serialize_member_type(@Ty::Tuple(array![].span()))),"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    ('Defender', serialize_member_type(@Ty::Tuple(array![].span()))),"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    ('Midfielder', serialize_member_type(@Ty::Tuple(array![].span()))),"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    ('Attacker', serialize_member_type(@Ty::Tuple(array![].span()))),"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                ]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                .span()"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            }"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        )"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    }"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"}"})})]})})}),`
`,n.jsxs(e.h3,{id:"in-practice-with-modularity-in-mind",children:["In practice with modularity in mind",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#in-practice-with-modularity-in-mind",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsx(e.p,{children:"Consider a tangible analogy: Humans and Goblins. While they possess intrinsic differences, they share common traits, such as having a position and health. However, humans possess an additional model. Furthermore, we introduce a Counter model, a distinct feature that tallies the numbers of humans and goblins."}),`
`,n.jsx(e.figure,{"data-rehype-pretty-code-figure":"",children:n.jsx(e.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:n.jsxs(e.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"#[derive(Model, Copy, Drop, Serde)]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"struct Potions {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    #[key]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    entity_id: u32,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    quantity: u8,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"}"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"#[derive(Model, Copy, Drop, Serde)]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"struct Health {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    #[key]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    entity_id: u32,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    health: u8,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"}"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"#[derive(Model, Copy, Drop, Serde)]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"struct Position {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    #[key]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    entity_id: u32,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    x: u32,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    y: u32"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"}"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"// Special counter model"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"#[derive(Model, Copy, Drop, Serde)]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"struct Counter {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    #[key]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    counter: u32,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    goblin_count: u32,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    human_count: u32,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"}"})})]})})}),`
`,n.jsxs(e.p,{children:["So the Human will have a ",n.jsx(e.code,{children:"Potions"}),", ",n.jsx(e.code,{children:"Health"})," and ",n.jsx(e.code,{children:"Position"})," model, and the Goblin will have a ",n.jsx(e.code,{children:"Health"})," and ",n.jsx(e.code,{children:"Position"})," model. By doing we save having to create Health and Position models for each entity type."]}),`
`,n.jsx(e.p,{children:"So then a contract would look like this:"}),`
`,n.jsx(e.figure,{"data-rehype-pretty-code-figure":"",children:n.jsx(e.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:n.jsxs(e.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"#[dojo::contract]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"mod spawnHuman {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    use array::ArrayTrait;"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    use box::BoxTrait;"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    use traits::Into;"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    use dojo::world::Context;"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    use dojo_examples::models::Position;"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    use dojo_examples::models::Health;"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    use dojo_examples::models::Potions;"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    use dojo_examples::models::Counter;"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    // we can set the counter value as a const, then query it easily! This pattern is useful for settings."})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    const COUNTER_ID: u32 = 9999999999999;"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    // impl: implement functions specified in trait"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    #[abi(embed_v0)]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    impl GoblinActionsImpl of IGoblinActions<ContractState> {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        fn goblin_actions(self: @ContractState, entity_id: u32) {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            let world = self.world_dispatcher.read();"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            let counter = get!(world, COUNTER_ID, (Counter));"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            let human_count = counter.human_count + 1;"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            let goblin_count = counter.goblin_count + 1;"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            // spawn a human"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            set!("})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                world,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                ("})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    Health {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                        entity_id: human_count, health: 100"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                        },"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    Position {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                        entity_id: human_count, x: position.x + 10, y: position.y + 10,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                        },"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    Potions {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                        entity_id: human_count, quantity: 10"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    },"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                )"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            );"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            // spawn a goblin"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            set!("})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                world,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                ("})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    Health {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                        entity_id: goblin_count, health: 100"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                        },"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    Position {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                        entity_id: goblin_count, x: position.x + 10, y: position.y + 10,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                        },"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                )"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            );"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            // increment the counter"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            set!("})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                world,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                ("})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    Counter {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                        counter: COUNTER_ID, human_count: human_count, goblin_count: goblin_count"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    },"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                )"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            );"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        }"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    }"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"}"})})]})})}),`
`,n.jsxs(e.blockquote,{children:[`
`,n.jsxs(e.p,{children:["A complete example can be found in the ",n.jsx(e.a,{href:"https://github.com/dojoengine/dojo-starter",children:"Dojo Starter"})]}),`
`]})]})}function t(a={}){const{wrapper:e}={...i(),...a.components};return e?n.jsx(e,{...a,children:n.jsx(s,{...a})}):s(a)}export{t as default,l as frontmatter};
