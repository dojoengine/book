import{u as i,j as n}from"./index-B0rG63LL.js";const d=void 0;function s(a){const e={a:"a",blockquote:"blockquote",code:"code",div:"div",figure:"figure",h2:"h2",p:"p",pre:"pre",span:"span",...i(),...a.components};return n.jsxs(n.Fragment,{children:[n.jsxs(e.h2,{id:"enum",children:["Enum",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#enum",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsx(e.p,{children:"Enums are very useful in game design, as they simplify the creation of clean, complex logic."}),`
`,n.jsx(e.p,{children:"You can define an enum as follows:"}),`
`,n.jsx(e.figure,{"data-rehype-pretty-code-figure":"",children:n.jsx(e.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:n.jsxs(e.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"// This enum simply defines the states of a game."})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"#[derive(Serde, Copy, Drop, Introspect, PartialEq, Print)]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"enum GameStatus {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    NotStarted: (),"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    Lobby: (),"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    InProgress: (),"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    Finished: (),"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"}"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"// We define an into trait"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"impl GameStatusFelt252 of Into<GameStatus, felt252> {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    fn into(self: GameStatus) -> felt252 {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        match self {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            GameStatus::NotStarted => 0,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            GameStatus::Lobby => 1,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            GameStatus::InProgress => 2,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            GameStatus::Finished => 3,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        }"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    }"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"}"})})]})})}),`
`,n.jsx(e.p,{children:"Then within a trait you can create something like this:"}),`
`,n.jsx(e.figure,{"data-rehype-pretty-code-figure":"",children:n.jsx(e.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:n.jsxs(e.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"#[derive(Model, Copy, Drop, Serde)]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"struct Game {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    #[key]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    game_id: u32,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    status: GameStatus,"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"}"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"#[generate_trait]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"impl GameImpl of GameTrait {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    fn assert_in_progress(self: Game) {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:'        assert(self.status == GameStatus::InProgress, "Game not started");'})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    }"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    fn assert_lobby(self: Game) {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:'        assert(self.status == GameStatus::Lobby, "Game not in lobby");'})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    }"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    fn assert_not_started(self: Game) {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:'        assert(self.status == GameStatus::NotStarted, "Game already started");'})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    }"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"}"})})]})})}),`
`,n.jsxs(e.blockquote,{children:[`
`,n.jsxs(e.p,{children:["Read more about Cairo enums ",n.jsx(e.a,{href:"https://book.cairo-lang.org/ch06-00-enums-and-pattern-matching.html",children:"here"})]}),`
`]})]})}function r(a={}){const{wrapper:e}={...i(),...a.components};return e?n.jsx(e,{...a,children:n.jsx(s,{...a})}):s(a)}export{r as default,d as frontmatter};
