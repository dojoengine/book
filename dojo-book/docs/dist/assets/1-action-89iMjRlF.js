import{u as i,j as n}from"./index-B0rG63LL.js";const l={title:"1. Actions",description:"undefined"};function s(a){const e={a:"a",code:"code",div:"div",figure:"figure",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",...i(),...a.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.header,{children:n.jsxs(e.h1,{id:"1-actions",children:["1. Actions",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-actions",children:n.jsx(e.div,{"data-autolink-icon":!0})})]})}),`
`,n.jsxs(e.p,{children:["This chapter will address implementing ",n.jsx(e.code,{children:"actions.cairo"}),", which spawns the game & squares containing pieces and also allow players to move pieces."]}),`
`,n.jsxs(e.h2,{id:"what-is-actions-contract",children:["What is ",n.jsx(e.code,{children:"actions"})," contract?",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#what-is-actions-contract",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(e.p,{children:["To play chess, you need, to start game, spawn the pieces, and move around the board. The ",n.jsx(e.code,{children:"actions"})," contract has two dominant functions ",n.jsx(e.code,{children:"spawn"})," function which spawns the game entity, places each piece in its proper position on the board and returns the game_id, and the ",n.jsx(e.code,{children:"move"})," funtion which allows pieces to be moved around the board."]}),`
`,`
`,n.jsxs(e.h2,{id:"requirements",children:["Requirements",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#requirements",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:["Write an interface for the ",n.jsx(e.code,{children:"actions"})," contract on top of your code. In this case, ",n.jsx(e.code,{children:"move"})," and ",n.jsx(e.code,{children:"spawn"})]}),`
`]}),`
`,n.jsx(e.figure,{"data-rehype-pretty-code-figure":"",children:n.jsx(e.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:n.jsxs(e.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    use starknet::ContractAddress;"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    use chess::models::piece::Vec2;"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    #[starknet::interface]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    trait IActions<ContractState> {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        fn move("})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            self: @ContractState,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            curr_position: Vec2,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            next_position: Vec2,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            caller: ContractAddress, //player"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            game_id: u32"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        );"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        fn spawn("})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            self: @ContractState, white_address: ContractAddress, black_address: ContractAddress"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        ) -> u32;"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    }"})})]})})}),`
`,n.jsxs(e.ol,{start:"2",children:[`
`,n.jsx(e.li,{children:"Bring in required imports into the contract like this :"}),`
`]}),`
`,n.jsx(e.figure,{"data-rehype-pretty-code-figure":"",children:n.jsx(e.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:n.jsxs(e.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    #[dojo::contract]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    mod actions {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        use chess::models::player::{Player, Color, PlayerTrait};"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        use chess::models::piece::{Piece, PieceType, PieceTrait};"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        use chess::models::game::{Game, GameTurn, GameTurnTrait};"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        use super::{ContractAddress, IActions, Vec2};"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    }"})})]})})}),`
`,n.jsxs(e.p,{children:["Should be noted that ",n.jsx(e.code,{children:"actions"})," is the contract name."]}),`
`,n.jsxs(e.ol,{start:"3",children:[`
`,n.jsxs(e.li,{children:["Write a ",n.jsx(e.code,{children:"spawn"})," function that accepts the ",n.jsx(e.code,{children:"white address"}),", and ",n.jsx(e.code,{children:"black address"})," as input and set necessary states using ",n.jsx(e.code,{children:"set!(...)"}),". Implement the ",n.jsx(e.code,{children:"player"})," entity from player model. Implement the game entity, comprised of the ",n.jsx(e.code,{children:"Game"})," model and ",n.jsx(e.code,{children:"GameTurn"})," model we created in the ",n.jsx(e.code,{children:"game.cairo"})," and implement the piece entities from a1 to h8 containing the correct ",n.jsx(e.code,{children:"PieceType"})," in the ",n.jsx(e.code,{children:"spawn"})," fn."]}),`
`]}),`
`,n.jsx(e.figure,{"data-rehype-pretty-code-figure":"",children:n.jsx(e.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:n.jsxs(e.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    #[abi(embed_v0)]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    impl IActionsImpl of IActions<ContractState> {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        fn spawn("})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            self: @ContractState, white_address: ContractAddress, black_address: ContractAddress"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        ) -> u32 {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            let world = self.world_dispatcher.read();"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            let game_id = world.uuid();"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            // set Players"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            set!("})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                world,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                ("})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    Player { game_id, address: black_address, color: Color::Black },"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    Player { game_id, address: white_address, color: Color::White },"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                )"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            );"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            // set Game and GameTurn"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            set!("})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                world,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                ("})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    Game {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                        game_id, winner: Color::None, white: white_address, black: black_address"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    },"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    GameTurn { game_id, player_color: Color::White },"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                )"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            );"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            // set Pieces"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            set!("})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                world,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                (Piece {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    game_id,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    color: Color::White,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    position: Vec2 { x: 0, y: 0 },"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    piece_type: PieceType::Rook"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                })"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            );"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            set!("})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                world,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                (Piece {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    game_id,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    color: Color::White,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    position: Vec2 { x: 0, y: 1 },"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    piece_type: PieceType::Pawn"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                })"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            );"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            set!("})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                world,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                (Piece {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    game_id,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    color: Color::Black,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    position: Vec2 { x: 1, y: 6 },"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    piece_type: PieceType::Pawn"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                })"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            );"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            set!("})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                world,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                (Piece {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    game_id,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    color: Color::White,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    position: Vec2 { x: 1, y: 0 },"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    piece_type: PieceType::Knight"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                })"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            );"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            set!("})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                world,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                (Piece {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    game_id,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    color: Color::None,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    position: Vec2 { x: 0, y: 2 },"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    piece_type: PieceType::None"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                })"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            );"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            set!("})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                world,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                (Piece {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    game_id,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    color: Color::None,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    position: Vec2 { x: 0, y: 3 },"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    piece_type: PieceType::None"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                })"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            );"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            set!("})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                world,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                (Piece {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    game_id,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    color: Color::None,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    position: Vec2 { x: 1, y: 4 },"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                    piece_type: PieceType::None"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"                })"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            );"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            //the rest of the positions on the board goes here...."})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            game_id"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        }"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        fn move("})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            self: @ContractState,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            curr_position: Vec2,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            next_position: Vec2,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            caller: ContractAddress, //player"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            game_id: u32"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        )  {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            // Upcoming code"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        }"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    }"})})]})})})]})}function r(a={}){const{wrapper:e}={...i(),...a.components};return e?n.jsx(e,{...a,children:n.jsx(s,{...a})}):s(a)}export{r as default,l as frontmatter};
