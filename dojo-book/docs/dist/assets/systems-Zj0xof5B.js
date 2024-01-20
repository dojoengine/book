import{u as i,j as n}from"./index-m6NaWekR.js";const d=void 0;function a(s){const e={a:"a",blockquote:"blockquote",code:"code",div:"div",em:"em",figure:"figure",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...i(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsxs(e.h2,{id:"systems",children:["Systems",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#systems",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(e.blockquote,{children:[`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"IMPORTANT:"})," Before defining your systems, prioritize permissions. Plan carefully to ensure proper access and security."]}),`
`]}),`
`,n.jsx(e.strong,{children:n.jsx(e.em,{children:"TL;DR"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Systems function as contract methods."}),`
`,n.jsx(e.li,{children:"Contracts containing Systems gain permissions to write to models."}),`
`,n.jsxs(e.li,{children:["Systems pass a ",n.jsx(e.code,{children:"world"})," address as their first parameter unless utilizing the ",n.jsx(e.a,{href:"#the-dojocontract-decorator",children:n.jsx(e.code,{children:"#[dojo::contract]"})})," decorator."]}),`
`,n.jsx(e.li,{children:"Systems engage the world contract to alter models' state."}),`
`,n.jsx(e.li,{children:"The world contract is invoked through systems."}),`
`,n.jsx(e.li,{children:"Systems ought to be concise and specific."}),`
`,n.jsx(e.li,{children:"In most scenarios, systems are stateless."}),`
`]}),`
`,n.jsxs(e.h3,{id:"what-are-systems",children:["What are Systems?",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#what-are-systems",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsx(e.p,{children:"Within dojo we define systems as functions within a Dojo Contract that act on the world."}),`
`,n.jsxs(e.p,{children:["Systems play a pivotal role in your world's logic, directly mutating its component states. It's important to understand that to enact these mutations, a system needs explicit permission from the ",n.jsx(e.a,{href:"/models",children:n.jsx(e.code,{children:"models"})})," owner."]}),`
`,n.jsxs(e.h3,{id:"system-permissions",children:["System Permissions",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#system-permissions",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsx(e.p,{children:"Since the whole contract is given write access to the model, it is important to be careful when defining systems. A simple way to think about it is:"}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/permissions.png",alt:"System Permissions"})}),`
`,n.jsxs(e.h3,{id:"system-structure",children:["System Structure",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#system-structure",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(e.p,{children:["Every system function starts with a ",n.jsx(e.a,{href:"/world",children:n.jsx(e.code,{children:"world"})})," address as its initial parameter. This design permits these functions to alter the world's state. Notably, this structure also makes systems adaptable and reusable across multiple worlds!"]}),`
`,n.jsxs(e.p,{children:["Let's look at the simplest possible system which mutates the state of the ",n.jsx(e.code,{children:"Moves"})," component."]}),`
`,n.jsxs(e.blockquote,{children:[`
`,n.jsx(e.p,{children:"NOTE: This is not using the #[dojo::contract] attribute meaning it was to accept the world as a parameter."}),`
`]}),`
`,n.jsx(e.figure,{"data-rehype-pretty-code-figure":"",children:n.jsx(e.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:n.jsxs(e.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"#[starknet::contract]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"mod player_actions {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    use starknet::{ContractAddress, get_caller_address};"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    use dojo_examples::components::{Position, Moves, Direction, Vec2};"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    use dojo_examples::utils::next_position;"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    use super::IPlayerActions;"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    // no storage"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    #[storage]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    struct Storage {}"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    // implementation of the PlayerActions interface"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    #[abi(embed_v0)]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    impl PlayerActionsImpl of IPlayerActions<ContractState> {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        fn spawn(self: @ContractState, world: IWorldDispatcher) {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            let player = get_caller_address();"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            let position = get!(world, player, (Position));"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            set!("})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                world,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                ("})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    Moves {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                        player,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                        remaining: 10,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                        last_direction: Direction::None(())"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    }"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                )"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            );"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        }"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    }"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"}"})})]})})}),`
`,n.jsxs(e.h2,{id:"breaking-it-down",children:["Breaking it down",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#breaking-it-down",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(e.h4,{id:"system-is-a-function-in-a-contract",children:["System is a function in a contract",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#system-is-a-function-in-a-contract",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsx(e.p,{children:"As you can see a System is like a regular function of a Starknet contract. This contract can include storage, and it can implement interfaces."}),`
`,n.jsxs(e.h4,{id:"spawn-function",children:[n.jsx(e.code,{children:"Spawn"})," function",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#spawn-function",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsx(e.p,{children:"The spawn function is currently the only system that exists in this contract. It is called when a player spawns into the world. It is responsible for setting up the player's initial state."}),`
`,n.jsxs(e.h3,{id:"the-dojocontract-decorator",children:["The ",n.jsx(e.code,{children:"#[dojo::contract]"})," Decorator",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#the-dojocontract-decorator",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(e.p,{children:["All Starknet contracts are defined using the ",n.jsx(e.code,{children:"#[starknet::contract]"})," decorator, ensuring accurate compilation. In this context, Dojo introduces the ",n.jsx(e.code,{children:"#[dojo::contract]"})," decorator, which aims to minimize boilerplate in contract writing."]}),`
`,n.jsxs(e.p,{children:["The ",n.jsx(e.code,{children:"#[dojo::contract]"})," decorator allows developers to omit including ",n.jsx(e.code,{children:"world: IWorldDispatcher"})," as a parameter. Behind the scenes, it injects the world into the contract and eliminates some imports, thereby streamlining the development process."]}),`
`,n.jsx(e.figure,{"data-rehype-pretty-code-figure":"",children:n.jsx(e.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:n.jsxs(e.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"#[dojo::contract]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"mod player_actions {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    use starknet::{ContractAddress, get_caller_address};"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    use dojo_examples::models::{Position, Moves, Direction, Vec2};"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    use dojo_examples::utils::next_position;"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    use super::IPlayerActions;"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    #[event]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    #[derive(Drop, starknet::Event)]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    enum Event {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        Moved: Moved,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    }"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    #[derive(Drop, starknet::Event)]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    struct Moved {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        player: ContractAddress,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        direction: Direction"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    }"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    // impl: implement functions specified in trait"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    #[abi(embed_v0)]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    impl PlayerActionsImpl of IPlayerActions<ContractState> {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        // ContractState is defined by system decorator expansion"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        fn spawn(self: @ContractState) {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            // world dispatcher"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            let world = self.world_dispatcher.read();"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            // player"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            let player = get_caller_address();"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            // get the position"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            let position = get!(world, player, (Position));"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            // set the position"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            set!("})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                world,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                ("})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    Moves { player, remaining: 10, last_direction: Direction::None(()) },"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    Position { player, vec: Vec2 { x: 10, y: 10 } },"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                )"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            );"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        }"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        fn move(self: @ContractState, direction: Direction) {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            // world dispatcher"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            let world = self.world_dispatcher.read();"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            // player"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            let player = get_caller_address();"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            // get the position and moves"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            let (mut position, mut moves) = get!(world, player, (Position, Moves));"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            // adjust"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            moves.remaining -= 1;"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            moves.last_direction = direction;"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            // get next direction"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            let next = next_position(position, direction);"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            // set models"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            set!(world, (moves, next));"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            // emit custom event"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            emit!(world, Moved { player, direction });"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        }"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    }"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"}"})})]})})}),`
`,n.jsxs(e.blockquote,{children:[`
`,n.jsxs(e.p,{children:["To interact with Systems read more in the ",n.jsx(e.a,{href:"/toolchain/sozo/overview",children:"sozo"})," docs."]}),`
`]})]})}function r(s={}){const{wrapper:e}={...i(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(a,{...s})}):a(s)}export{r as default,d as frontmatter};
