import{u as a,j as i}from"./index-m6NaWekR.js";const l={title:"Hello Dojo",description:"undefined"};function n(e){const s={a:"a",blockquote:"blockquote",code:"code",div:"div",em:"em",figure:"figure",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",span:"span",ul:"ul",...a(),...e.components};return i.jsxs(i.Fragment,{children:[i.jsx(s.header,{children:i.jsxs(s.h1,{id:"hello-dojo",children:["Hello Dojo",i.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#hello-dojo",children:i.jsx(s.div,{"data-autolink-icon":!0})})]})}),`
`,i.jsxs(s.blockquote,{children:[`
`,i.jsxs(s.p,{children:["This section assumes that you have already installed the Dojo toolchain and are familiar with Cairo. If not, please refer to the ",i.jsx(s.a,{href:"/getting-started/quick-start",children:"Getting Started"})," section."]}),`
`]}),`
`,i.jsxs(s.h2,{id:"dojo-as-an-ecs-in-15-minutes",children:["Dojo as an ECS in 15 Minutes",i.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#dojo-as-an-ecs-in-15-minutes",children:i.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,i.jsxs(s.p,{children:["Although Dojo isn't exclusively an Entity Component System (ECS) framework, we recommend adopting this robust design pattern. In this context, systems shape the environment's logic, while components (",i.jsx(s.a,{href:"/models",children:"models"}),") mirror the state of the world. By taking this route, you'll benefit from a structured and modular framework that promises both flexibility and scalability in a continuously evolving world. If this seems a bit intricate at first, hang tight; we'll delve into the details shortly."]}),`
`,i.jsx(s.p,{children:"To start, let's set up a project to run locally on your machine. From an empty directory, execute:"}),`
`,i.jsx(s.figure,{"data-rehype-pretty-code-figure":"",children:i.jsx(s.pre,{tabIndex:"0","data-language":"console","data-theme":"github-dark-dimmed github-light",children:i.jsx(s.code,{"data-language":"console","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"sozo init"})})})})}),`
`,i.jsxs(s.p,{children:["Congratulations! You now have a local Dojo project. This command creates a ",i.jsx(s.code,{children:"dojo-starter"})," project in your current directory. It's the ideal starting point for a new project and equips you with everything you need to begin."]}),`
`,i.jsxs(s.h4,{id:"anatomy-of-a-dojo-project",children:["Anatomy of a Dojo Project",i.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#anatomy-of-a-dojo-project",children:i.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,i.jsxs(s.p,{children:["Inspect the contents of the ",i.jsx(s.code,{children:"dojo-starter"})," project, and you'll notice the following structure (excluding the non-Cairo files):"]}),`
`,i.jsx(s.figure,{"data-rehype-pretty-code-figure":"",children:i.jsx(s.pre,{tabIndex:"0","data-language":"bash","data-theme":"github-dark-dimmed github-light",children:i.jsxs(s.code,{"data-language":"bash","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"src"})}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"  -"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" lib.cairo"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"    -"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" systems.cairo"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"      -"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" actions.cairo"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"    -"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" models.cairo"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"      -"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" position.cairo"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"      -"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" moves.cairo"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"    -"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" tests.cairo"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"      -"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" test_world.cairo"})]}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"Scarb.toml"})})]})})}),`
`,i.jsx(s.p,{children:"Dojo projects bear a strong resemblance to typical Cairo projects. The primary difference is the inclusion of a special attribute tag used to define your data models. In this context, we'll refer to these models as components."}),`
`,i.jsx(s.p,{children:"As we're crafting an ECS, we'll adhere to the specific terminology associated with Entity Component Systems."}),`
`,i.jsxs(s.p,{children:["Open the ",i.jsx(s.code,{children:"src/models/moves.cairo"})," file to continue."]}),`
`,i.jsx(s.figure,{"data-rehype-pretty-code-figure":"",children:i.jsx(s.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:i.jsxs(s.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"#[derive(Model, Drop, Serde)]"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"struct Moves {"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    #[key]"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    player: ContractAddress,"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    remaining: u8,"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    last_direction: Direction"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"}"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"...rest of code"})})]})})}),`
`,i.jsxs(s.p,{children:["Notice the ",i.jsx(s.code,{children:"#[derive(Model, Drop, Serde)]"})," attributes. For a model to be recognized, we ",i.jsx(s.em,{children:"must"})," include ",i.jsx(s.code,{children:"Model"}),". This signals to the Dojo compiler that this struct should be treated as a model."]}),`
`,i.jsxs(s.p,{children:["Our ",i.jsx(s.code,{children:"Moves"})," model houses a ",i.jsx(s.code,{children:"player"})," field. At the same time, we have the ",i.jsx(s.code,{children:"#[key]"})," attribute, it informs Dojo that this model is indexed by the ",i.jsx(s.code,{children:"player"})," field. If this is unfamiliar to you, we'll clarify its importance later in the chapter. Essentially, it implies that you can query this model using the ",i.jsx(s.code,{children:"player"})," field. Our ",i.jsx(s.code,{children:"Moves"})," model also contains the ",i.jsx(s.code,{children:"remaining"})," and ",i.jsx(s.code,{children:"last_direction"})," fields"]}),`
`,i.jsxs(s.p,{children:["Open the ",i.jsx(s.code,{children:"src/models/position.cairo"})," file to continue."]}),`
`,i.jsx(s.figure,{"data-rehype-pretty-code-figure":"",children:i.jsx(s.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:i.jsxs(s.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"#[derive(Model, Copy, Drop, Serde)]"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"struct Position {"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    #[key]"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    player: ContractAddress,"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    vec: Vec2,"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"}"})}),`
`,i.jsx(s.span,{"data-line":"",children:" "}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"#[derive(Copy, Drop, Serde, Introspect)]"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"struct Vec2 {"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    x: u32,"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    y: u32"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"}"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"...rest of code"})})]})})}),`
`,i.jsxs(s.p,{children:["In a similar vein, we have a ",i.jsx(s.code,{children:"Position"})," model that have a Vec2 data structure. Vec holds ",i.jsx(s.code,{children:"x"})," and ",i.jsx(s.code,{children:"y"})," values. Once again, this model is indexed by the ",i.jsx(s.code,{children:"player"})," field."]}),`
`,i.jsxs(s.p,{children:["Now, let's examine the ",i.jsx(s.code,{children:"src/systems/actions.cairo"})," file:"]}),`
`,i.jsx(s.figure,{"data-rehype-pretty-code-figure":"",children:i.jsx(s.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:i.jsxs(s.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"// define the interface"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"#[starknet::interface]"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"trait IActions<TContractState> {"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    fn spawn(self: @TContractState);"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    fn move(self: @TContractState, direction: dojo_starter::models::moves::Direction);"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"}"})}),`
`,i.jsx(s.span,{"data-line":"",children:" "}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"// dojo decorator"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"#[dojo::contract]"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"mod actions {"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    use super::IActions;"})}),`
`,i.jsx(s.span,{"data-line":"",children:" "}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    use starknet::{ContractAddress, get_caller_address};"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    use dojo_starter::models::{position::{Position, Vec2}, moves::{Moves, Direction}};"})}),`
`,i.jsx(s.span,{"data-line":"",children:" "}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    // declaring custom event struct"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    #[event]"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    #[derive(Drop, starknet::Event)]"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    enum Event {"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"        Moved: Moved,"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    }"})}),`
`,i.jsx(s.span,{"data-line":"",children:" "}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    // declaring custom event struct"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    #[derive(Drop, starknet::Event)]"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    struct Moved {"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"        player: ContractAddress,"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"        direction: Direction"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    }"})}),`
`,i.jsx(s.span,{"data-line":"",children:" "}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    // define functions in your contracts like this:"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    fn next_position(mut position: Position, direction: Direction) -> Position {"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"        match direction {"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            Direction::None => { return position; },"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            Direction::Left => { position.vec.x -= 1; },"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            Direction::Right => { position.vec.x += 1; },"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            Direction::Up => { position.vec.y -= 1; },"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            Direction::Down => { position.vec.y += 1; },"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"        };"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"        position"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    }"})}),`
`,i.jsx(s.span,{"data-line":"",children:" "}),`
`,i.jsx(s.span,{"data-line":"",children:" "}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    // impl: implement functions specified in trait"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    #[abi(embed_v0)]"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    impl ActionsImpl of IActions<ContractState> {"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"        // ContractState is defined by system decorator expansion"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"        fn spawn(self: @ContractState) {"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            // Access the world dispatcher for reading."})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            let world = self.world_dispatcher.read();"})}),`
`,i.jsx(s.span,{"data-line":"",children:" "}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            // Get the address of the current caller, possibly the player's address."})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            let player = get_caller_address();"})}),`
`,i.jsx(s.span,{"data-line":"",children:" "}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            // Retrieve the player's current position from the world."})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            let position = get!(world, player, (Position));"})}),`
`,i.jsx(s.span,{"data-line":"",children:" "}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            // Retrieve the player's move data, e.g., how many moves they have left."})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            let moves = get!(world, player, (Moves));"})}),`
`,i.jsx(s.span,{"data-line":"",children:" "}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            // Update the world state with the new data."})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            // 1. Set players moves to 10"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            // 2. Move the player's position 100 units in both the x and y direction."})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            set!("})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"                world,"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"                ("})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"                    Moves { player, remaining: 100, last_direction: Direction::None },"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"                    Position { player, vec: Vec2 { x: 10, y: 10 } },"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"                )"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            );"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"        }"})}),`
`,i.jsx(s.span,{"data-line":"",children:" "}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"        // Implementation of the move function for the ContractState struct."})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"        fn move(self: @ContractState, direction: Direction) {"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            // Access the world dispatcher for reading."})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            let world = self.world_dispatcher.read();"})}),`
`,i.jsx(s.span,{"data-line":"",children:" "}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            // Get the address of the current caller, possibly the player's address."})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            let player = get_caller_address();"})}),`
`,i.jsx(s.span,{"data-line":"",children:" "}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            // Retrieve the player's current position and moves data from the world."})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            let (mut position, mut moves) = get!(world, player, (Position, Moves));"})}),`
`,i.jsx(s.span,{"data-line":"",children:" "}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            // Deduct one from the player's remaining moves."})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            moves.remaining -= 1;"})}),`
`,i.jsx(s.span,{"data-line":"",children:" "}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            // Update the last direction the player moved in."})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            moves.last_direction = direction;"})}),`
`,i.jsx(s.span,{"data-line":"",children:" "}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            // Calculate the player's next position based on the provided direction."})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            let next = next_position(position, direction);"})}),`
`,i.jsx(s.span,{"data-line":"",children:" "}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            // Update the world state with the new moves data and position."})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            set!(world, (moves, next));"})}),`
`,i.jsx(s.span,{"data-line":"",children:" "}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            // Emit an event to the world to notify about the player's move."})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            emit!(world, Moved { player, direction });"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"        }"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    }"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"}"})})]})})}),`
`,i.jsxs(s.h3,{id:"breaking-it-down",children:["Breaking it down",i.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#breaking-it-down",children:i.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,i.jsxs(s.h4,{id:"system-is-a-function-in-a-contract",children:["System is a function in a contract",i.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#system-is-a-function-in-a-contract",children:i.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,i.jsxs(s.p,{children:["As you can see a ",i.jsx(s.code,{children:"System"})," is like a regular function of a dojo(starknet) contract. It imports the Models we defined earlier and exposes two functions ",i.jsx(s.code,{children:"spawn"})," and ",i.jsx(s.code,{children:"move"}),". These functions are called when a player spawns into the world and when they move respectively."]}),`
`,i.jsx(s.figure,{"data-rehype-pretty-code-figure":"",children:i.jsx(s.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:i.jsxs(s.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"// Retrieve the player's current position from the world."})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"let position = get!(world, player, (Position));"})}),`
`,i.jsx(s.span,{"data-line":"",children:" "}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"// Retrieve the player's move data, e.g., how many moves they have left."})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"let moves = get!(world, player, (Moves));"})})]})})}),`
`,i.jsxs(s.p,{children:["Here we use ",i.jsx(s.code,{children:"get!"})," ",i.jsx(s.a,{href:"/commands",children:"command"})," to retrieve the ",i.jsx(s.code,{children:"Position"})," and ",i.jsx(s.code,{children:"Moves"})," model for the ",i.jsx(s.code,{children:"player"})," entity, which is the address of the caller."]}),`
`,i.jsx(s.p,{children:"Now the next line:"}),`
`,i.jsx(s.figure,{"data-rehype-pretty-code-figure":"",children:i.jsx(s.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:i.jsxs(s.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"// Update the world state with the new data."})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"// 1. Increase the player's remaining moves by 10."})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"// 2. Move the player's position 10 units in both the x and y direction."})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"set!("})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    world,"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    ("})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"        Moves {"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            player, remaining: moves.remaining + 10, last_direction: Direction::None"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"        },"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"        Position {"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"            player, vec: Vec2 { x: position.vec.x + 10, y: position.vec.y + 10}"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"        },"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:"    )"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{children:");"})})]})})}),`
`,i.jsxs(s.p,{children:["Here we use the ",i.jsx(s.code,{children:"set!"})," ",i.jsx(s.a,{href:"/commands",children:"command"})," to set the ",i.jsx(s.code,{children:"Moves"})," and ",i.jsx(s.code,{children:"Position"})," models for the ",i.jsx(s.code,{children:"player"})," entity."]}),`
`,i.jsx(s.p,{children:"We covered a lot here in a short time. Let's recap:"}),`
`,i.jsxs(s.ul,{children:[`
`,i.jsx(s.li,{children:"Explained the anatomy of a Dojo project"}),`
`,i.jsxs(s.li,{children:["Explained the importance of the ",i.jsx(s.code,{children:"#[derive(Model)]"}),"attribute"]}),`
`,i.jsxs(s.li,{children:["Explained the ",i.jsx(s.code,{children:"spawn"})," and ",i.jsx(s.code,{children:"move"})," functions"]}),`
`,i.jsxs(s.li,{children:["Explained the ",i.jsx(s.code,{children:"Moves"})," and ",i.jsx(s.code,{children:"Position"})," struct"]}),`
`,i.jsxs(s.li,{children:["Touched on the ",i.jsx(s.code,{children:"get!"})," and ",i.jsx(s.code,{children:"set!"})," commands"]}),`
`]}),`
`,i.jsxs(s.h3,{id:"run-it-locally",children:["Run it locally!",i.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#run-it-locally",children:i.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,i.jsx(s.p,{children:"Now that we've covered some theory, let's build the Dojo project! In your primary terminal:"}),`
`,i.jsx(s.figure,{"data-rehype-pretty-code-figure":"",children:i.jsx(s.pre,{tabIndex:"0","data-language":"bash","data-theme":"github-dark-dimmed github-light",children:i.jsx(s.code,{"data-language":"bash","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"sozo"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" build"})]})})})}),`
`,i.jsx(s.p,{children:"That compiled the models and system into an artifact that can be deployed! Simple as that!"}),`
`,i.jsxs(s.p,{children:["Now, let's deploy it to ",i.jsx(s.a,{href:"/toolchain/katana/overview",children:"Katana"}),"! First, we need to get Katana running. Open a second terminal and execute:"]}),`
`,i.jsx(s.figure,{"data-rehype-pretty-code-figure":"",children:i.jsx(s.pre,{tabIndex:"0","data-language":"bash","data-theme":"github-dark-dimmed github-light",children:i.jsx(s.code,{"data-language":"bash","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"katana"}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:" --disable-fee"})]})})})}),`
`,i.jsxs(s.p,{children:["Success! ",i.jsx(s.a,{href:"/toolchain/katana/overview",children:"Katana"})," should now be running locally on your machine. Now, let's deploy! In your primary terminal, execute:"]}),`
`,i.jsx(s.figure,{"data-rehype-pretty-code-figure":"",children:i.jsx(s.pre,{tabIndex:"0","data-language":"bash","data-theme":"github-dark-dimmed github-light",children:i.jsx(s.code,{"data-language":"bash","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"sozo"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" migrate"})]})})})}),`
`,i.jsxs(s.p,{children:["This will deploy the artifact to ",i.jsx(s.a,{href:"/toolchain/katana/overview",children:"Katana"}),". You should see terminal output similar to this:"]}),`
`,i.jsx(s.figure,{"data-rehype-pretty-code-figure":"",children:i.jsx(s.pre,{tabIndex:"0","data-language":"bash","data-theme":"github-dark-dimmed github-light",children:i.jsxs(s.code,{"data-language":"bash","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[i.jsx(s.span,{"data-line":"",children:" "}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"Migration"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" account: "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"0x517ececd29116499f4a1b64b094da79ba08dfd54a3edaa316134c41f8160973"})]}),`
`,i.jsx(s.span,{"data-line":"",children:" "}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"World"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" name: dojo_examples"})]}),`
`,i.jsx(s.span,{"data-line":"",children:" "}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"["}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"1"}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"] 🌎 Building World state...."})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F47067","--shiki-light":"#D73A49"},children:"  >"}),i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:" No"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" remote World found"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"["}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"2"}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"] 🧰 Evaluating Worlds diff...."})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F47067","--shiki-light":"#D73A49"},children:"  >"}),i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:" Total"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" diffs found: "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"5"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"["}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"3"}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"] 📦 Preparing "}),i.jsx(s.span,{style:{"--shiki-dark":"#F47067","--shiki-light":"#D73A49"},children:"for"}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:" migration...."})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F47067","--shiki-light":"#D73A49"},children:"  >"}),i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:" Total"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" items to be migrated "}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"("}),i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"5"}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:")"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:": New "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"5"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" Update "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"0"})]}),`
`,i.jsx(s.span,{"data-line":"",children:" "}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#768390","--shiki-light":"#6A737D"},children:"# Executor"})}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F47067","--shiki-light":"#D73A49"},children:"  >"}),i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:" Contract"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" address: "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"0x59f31686991d7cac25a7d4844225b9647c89e3e1e2d03460dbc61e3fbfafc59"})]}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#768390","--shiki-light":"#6A737D"},children:"# Base Contract"})}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F47067","--shiki-light":"#D73A49"},children:"  >"}),i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:" Class"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" Hash: "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"0x77638e9a645209ac1e32e143bfdbfe9caf723c4f7645fcf465c38967545ea2f"})]}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#768390","--shiki-light":"#6A737D"},children:"# World"})}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F47067","--shiki-light":"#D73A49"},children:"  >"}),i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:" Contract"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" address: "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"0x5010c31f127114c6198df8a5239e2b7a5151e1156fb43791e37e7385faa8138"})]}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#768390","--shiki-light":"#6A737D"},children:"# Models (2)"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"Moves"})}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F47067","--shiki-light":"#D73A49"},children:"  >"}),i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:" Class"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" hash: "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"0x509a65bd8cc5516176a694a3b3c809011f1f0680959c567b3189e60ddab7ce1"})]}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"Position"})}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F47067","--shiki-light":"#D73A49"},children:"  >"}),i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:" Class"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" hash: "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"0x52a1da1853c194683ca5d6d154452d0654d23f2eacd4267c555ff2338e144d6"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F47067","--shiki-light":"#D73A49"},children:"  >"}),i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:" Registered"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" at: "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"0x82d996aab290f086314745685c6f05bd69730d46589339763202de5264b1b6"})]}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#768390","--shiki-light":"#6A737D"},children:"# Contracts (1)"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"actions"})}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F47067","--shiki-light":"#D73A49"},children:"  >"}),i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:" Contract"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" address: "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"0x31571485922572446df9e3198a891e10d3a48e544544317dbcbb667e15848cd"})]}),`
`,i.jsx(s.span,{"data-line":"",children:" "}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"🎉"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" Successfully migrated World at address "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"0x5010c31f127114c6198df8a5239e2b7a5151e1156fb43791e37e7385faa8138"})]}),`
`,i.jsx(s.span,{"data-line":"",children:" "}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"✨"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" Updating manifest.json..."})]}),`
`,i.jsx(s.span,{"data-line":"",children:" "}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"✨"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" Done."})]}),`
`,i.jsx(s.span,{"data-line":"",children:" "})]})})}),`
`,i.jsxs(s.p,{children:["Your 🌎 is now deployed at ",i.jsx(s.code,{children:"0x5010c31f127114c6198df8a5239e2b7a5151e1156fb43791e37e7385faa8138"}),"!"]}),`
`,i.jsx(s.p,{children:"This establishes the world address for your project."}),`
`,i.jsxs(s.p,{children:["Let's discuss the ",i.jsx(s.code,{children:"Scarb.toml"})," file in the project. This file contains environment variables that make running CLI commands in your project a breeze (read more about it ",i.jsx(s.a,{href:"/config",children:"here"}),"). Make sure your file specifies the version of Dojo you have installed! In this case version ",i.jsx(s.code,{children:"0.4.4"}),"."]}),`
`,i.jsx(s.figure,{"data-rehype-pretty-code-figure":"",children:i.jsx(s.pre,{tabIndex:"0","data-language":"toml","data-theme":"github-dark-dimmed github-light",children:i.jsxs(s.code,{"data-language":"toml","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"["}),i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"dependencies"}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"]"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"dojo = { git = "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"https://github.com/dojoengine/dojo"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:", version = "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0.4.4"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:" }"})]})]})})}),`
`,i.jsxs(s.h3,{id:"indexing",children:["Indexing",i.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#indexing",children:i.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,i.jsxs(s.p,{children:["With your local world address established, let's delve into indexing. You can index the entire world. To accomplish this we have to copy your ",i.jsx(s.code,{children:"world address"})," from the output of ",i.jsx(s.code,{children:"sozo migrate"}),". Now Open a new terminal and input this simple command that includes your own world address:"]}),`
`,i.jsx(s.figure,{"data-rehype-pretty-code-figure":"",children:i.jsx(s.pre,{tabIndex:"0","data-language":"bash","data-theme":"github-dark-dimmed github-light",children:i.jsx(s.code,{"data-language":"bash","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"torii"}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:" --world"}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:" 0x5010c31f127114c6198df8a5239e2b7a5151e1156fb43791e37e7385faa8138"})]})})})}),`
`,i.jsxs(s.p,{children:["Running the command mentioned above starts a ",i.jsx(s.a,{href:"/toolchain/torii/overview",children:"Torii"})," server on your local machine. This server uses SQLite as its database and is accessible at ",i.jsx(s.a,{href:"http://0.0.0.0:8080/graphql",children:"http://0.0.0.0:8080/graphql"}),". ",i.jsx(s.a,{href:"/toolchain/torii/overview",children:"Torii"})," will automatically organize your data into tables, making it easy for you to perform queries using GraphQL. When you run the command, you'll see terminal output that looks something like this:"]}),`
`,i.jsx(s.figure,{"data-rehype-pretty-code-figure":"",children:i.jsx(s.pre,{tabIndex:"0","data-language":"bash","data-theme":"github-dark-dimmed github-light",children:i.jsxs(s.code,{"data-language":"bash","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"2023-10-18T06:49:48.184233Z"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:"  INFO torii::server: 🚀 Torii listening at http://0.0.0.0:8080"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"2023-10-18T06:49:48.184244Z"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:"  INFO torii::server: Graphql playground: http://0.0.0.0:8080/graphql"})]}),`
`,i.jsx(s.span,{"data-line":"",children:" "}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"2023-10-18T06:49:48.185648Z"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:"  INFO torii_core::engine: processed block: "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"0"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"2023-10-18T06:49:48.186129Z"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:"  INFO torii_core::engine: processed block: "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"1"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"2023-10-18T06:49:48.186720Z"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:"  INFO torii_core::engine: processed block: "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"2"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"2023-10-18T06:49:48.187202Z"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:"  INFO torii_core::engine: processed block: "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"3"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"2023-10-18T06:49:48.187674Z"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:"  INFO torii_core::engine: processed block: "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"4"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"2023-10-18T06:49:48.188215Z"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:"  INFO torii_core::engine: processed block: "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"5"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"2023-10-18T06:49:48.188611Z"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:"  INFO torii_core::engine: processed block: "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"6"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"2023-10-18T06:49:48.188985Z"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:"  INFO torii_core::engine: processed block: "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"7"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"2023-10-18T06:49:48.199592Z"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:"  INFO torii_core::processors::register_model: Registered model: Moves"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"2023-10-18T06:49:48.210032Z"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:"  INFO torii_core::processors::register_model: Registered model: Position"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"2023-10-18T06:49:48.210571Z"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:"  INFO torii_core::engine: processed block: "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"8"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"2023-10-18T06:49:48.211678Z"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:"  INFO torii_core::engine: processed block: "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"9"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"2023-10-18T06:49:48.212335Z"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:"  INFO torii_core::engine: processed block: "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"10"})]}),`
`,i.jsx(s.span,{"data-line":"",children:" "})]})})}),`
`,i.jsxs(s.p,{children:["You can observe that our ",i.jsx(s.code,{children:"Moves"})," and ",i.jsx(s.code,{children:"Position"}),` models have been successfully registered.
Next, let's use the GraphiQL IDE to retrieve data from the `,i.jsx(s.code,{children:"Moves"})," model. In your web browser, navigate to ",i.jsx(s.code,{children:"http://0.0.0.0:8080/graphql"}),", and enter the following query:"]}),`
`,i.jsx(s.figure,{"data-rehype-pretty-code-figure":"",children:i.jsx(s.pre,{tabIndex:"0","data-language":"graphql","data-theme":"github-dark-dimmed github-light",children:i.jsxs(s.code,{"data-language":"graphql","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F47067","--shiki-light":"#D73A49"},children:"query"}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:" {"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#E36209"},children:"  model"}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"("}),i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#E36209"},children:"id"}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"Moves"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:") {"})]}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#E36209"},children:"    id"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#E36209"},children:"    name"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#E36209"},children:"    classHash"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#E36209"},children:"    transactionHash"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#E36209"},children:"    createdAt"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"  }"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"}"})})]})})}),`
`,i.jsx(s.p,{children:"After you run the query, you will receive an output like this:"}),`
`,i.jsx(s.figure,{"data-rehype-pretty-code-figure":"",children:i.jsx(s.pre,{tabIndex:"0","data-language":"json","data-theme":"github-dark-dimmed github-light",children:i.jsxs(s.code,{"data-language":"json","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"{"})}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'  "data"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": {"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'    "model"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": {"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'      "id"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"Moves"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'      "name"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"Moves"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'      "classHash"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0x64495ca6dc1dc328972697b30468cea364bcb7452bbb6e4aaad3e4b3f190147"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'      "transactionHash"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'""'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'      "createdAt"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"2023-12-15 18:07:22"'})]}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"    }"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"  }"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"}"})})]})})}),`
`,i.jsx(s.p,{children:"Awesome, now let's work with subscriptions to get real-time updates. Let's clean up your workspace on the GraphiQL IDE and input the following subscription:"}),`
`,i.jsx(s.figure,{"data-rehype-pretty-code-figure":"",children:i.jsx(s.pre,{tabIndex:"0","data-language":"graphql","data-theme":"github-dark-dimmed github-light",children:i.jsxs(s.code,{"data-language":"graphql","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#DCBDFB","--shiki-light":"#6F42C1"},children:"subscription"}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:" {"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#E36209"},children:"  entityUpdated"}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:" {"})]}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#E36209"},children:"    id"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#E36209"},children:"    keys"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#E36209"},children:"    eventId"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#E36209"},children:"    createdAt"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#E36209"},children:"    updatedAt"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"  }"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"}"})})]})})}),`
`,i.jsx(s.p,{children:"Once you execute the subscription, you will receive notifications whenever new entities are updated or created. For now, don't make any changes to it and proceed to create a new entity."}),`
`,i.jsx(s.p,{children:"To accomplish this, we have to go back to our primary terminal and check the contracts section."}),`
`,i.jsx(s.figure,{"data-rehype-pretty-code-figure":"",children:i.jsx(s.pre,{tabIndex:"0","data-language":"bash","data-theme":"github-dark-dimmed github-light",children:i.jsxs(s.code,{"data-language":"bash","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#768390","--shiki-light":"#6A737D"},children:"# Contracts (1)"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"actions"})}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F47067","--shiki-light":"#D73A49"},children:"  >"}),i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:" Contract"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" address: "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"0x31571485922572446df9e3198a891e10d3a48e544544317dbcbb667e15848cd"})]})]})})}),`
`,i.jsxs(s.p,{children:["We have to use ",i.jsx(s.code,{children:"actions"})," contract address to start to create entities. In your main local terminal, run the following command:"]}),`
`,i.jsx(s.figure,{"data-rehype-pretty-code-figure":"",children:i.jsx(s.pre,{tabIndex:"0","data-language":"bash","data-theme":"github-dark-dimmed github-light",children:i.jsx(s.code,{"data-language":"bash","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"sozo"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" execute "}),i.jsx(s.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"0x31571485922572446df9e3198a891e10d3a48e544544317dbcbb667e15848cd"}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" spawn"})]})})})}),`
`,i.jsx(s.p,{children:"By running this command, you've activated the spawn system, resulting in the creation of a new entity. This action establishes a local world that you can interact with."}),`
`,i.jsx(s.p,{children:"Now, go back to your GraphiQL IDE, and you will notice that you have received the subscription's results, which should look something like this:"}),`
`,i.jsx(s.figure,{"data-rehype-pretty-code-figure":"",children:i.jsx(s.pre,{tabIndex:"0","data-language":"json","data-theme":"github-dark-dimmed github-light",children:i.jsxs(s.code,{"data-language":"json","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"{"})}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'  "data"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": {"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'    "entityUpdated"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": {"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'      "id"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0x28cd7ee02d7f6ec9810e75b930e8e607793b302445abbdee0ac88143f18da20"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'      "keys"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": ["})]}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'        "0x517ececd29116499f4a1b64b094da79ba08dfd54a3edaa316134c41f8160973"'})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"      ],"})}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'      "eventId"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0x000000000000000000000000000000000000000000000000000000000000000e:0x0000:0x0000"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'      "createdAt"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"2023-12-15 18:07:22"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'      "updatedAt"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"2023-12-15 18:10:56"'})]}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"    }"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"  }"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"}"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"--------------------------------------------------------------------------------------------------------"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"{"})}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'  "data"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": {"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'    "entityUpdated"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": {"})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'      "id"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0x28cd7ee02d7f6ec9810e75b930e8e607793b302445abbdee0ac88143f18da20"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'      "keys"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": ["})]}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'        "0x517ececd29116499f4a1b64b094da79ba08dfd54a3edaa316134c41f8160973"'})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"      ],"})}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'      "eventId"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"0x000000000000000000000000000000000000000000000000000000000000000e:0x0000:0x0001"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'      "createdAt"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"2023-12-15 18:07:22"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(s.span,{"data-line":"",children:[i.jsx(s.span,{style:{"--shiki-dark":"#8DDB8C","--shiki-light":"#005CC5"},children:'      "updatedAt"'}),i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(s.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:'"2023-12-15 18:10:56"'})]}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"    }"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"  }"})}),`
`,i.jsx(s.span,{"data-line":"",children:i.jsx(s.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"}"})})]})})}),`
`,i.jsxs(s.p,{children:["In the GraphiQL IDE, by clicking the ",i.jsx(s.code,{children:"DOCS"}),"-button on the right, you can open the API documentation. This documentation is auto-generated based on our schema definition and displays all API operations and data types of our schema.. In order to know more about query and subscription, you can jump to ",i.jsx(s.a,{href:"/toolchain/torii/graphql",children:"GraphQL"}),` section.
We've covered quite a bit! Here's a recap:`]}),`
`,i.jsxs(s.ul,{children:[`
`,i.jsx(s.li,{children:"Built a Dojo world"}),`
`,i.jsx(s.li,{children:"Deployed the project to Katana"}),`
`,i.jsx(s.li,{children:"Indexed the world with Torii"}),`
`,i.jsx(s.li,{children:"Ran the spawn system locally"}),`
`,i.jsx(s.li,{children:"Interacted with GraphQL"}),`
`]}),`
`,i.jsxs(s.h3,{id:"next-steps",children:["Next Steps",i.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#next-steps",children:i.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,i.jsx(s.p,{children:"This overview provides a rapid end-to-end glimpse into Dojo. However, the potential of these worlds is vast! Designed to manage hundreds of systems and components, Dojo is equipped for expansive creativity. So, what will you craft next?"})]})}function t(e={}){const{wrapper:s}={...a(),...e.components};return s?i.jsx(s,{...e,children:i.jsx(n,{...e})}):n(e)}export{t as default,l as frontmatter};
