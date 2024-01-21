import{u as a,j as e}from"./index-B0rG63LL.js";const s=void 0;function i(d){const n={a:"a",code:"code",div:"div",em:"em",figure:"figure",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...a(),...d.components};return e.jsxs(e.Fragment,{children:[e.jsxs(n.h2,{id:"commands",children:["Commands",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#commands",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.strong,{children:e.jsx(n.em,{children:"TL;DR"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Commands are shorthand ways to write function calls"}),`
`,e.jsx(n.li,{children:"Commands abstract complex queries into shorthands"}),`
`,e.jsx(n.li,{children:"Commands are similar to rust macros"}),`
`]}),`
`,e.jsx(n.p,{children:"Understanding commands is key to understanding Dojo. You will leverage them heavily within the systems you design."}),`
`,e.jsx(n.p,{children:"Commands in Dojo are generalized functions that are expanded at compile time to facilitate system execution. They provide a convenient way for systems to interact with the world state by abstracting common operations, such as retrieving or updating models, and generating unique IDs. By leveraging these commands, developers can streamline their system implementations and improve code readability."}),`
`,e.jsxs(n.h3,{id:"using-commands",children:["Using commands",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#using-commands",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"Commands are used within systems to interact with the world state. They are called using the following syntax:"}),`
`,e.jsxs(n.h3,{id:"the-get-command",children:["The ",e.jsx(n.code,{children:"get!"})," command",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#the-get-command",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"get!"})," command is used to retrieve models from the world state:"]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:e.jsxs(n.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"// world = calling world"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"// caller = key of the entity that called the system"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"// (Position, Moves) = tuple of models to retrieve"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"let (position, moves) = get!(world, caller, (Position, Moves));"})})]})})}),`
`,e.jsxs(n.p,{children:["Here we are retrieving the ",e.jsx(n.code,{children:"Position"})," and ",e.jsx(n.code,{children:"Moves"})," models from the world state. We are also using the ",e.jsx(n.code,{children:"caller"})," to retrieve the models for the current entity."]}),`
`,e.jsxs(n.p,{children:["You can then use ",e.jsx(n.code,{children:"position"})," and ",e.jsx(n.code,{children:"moves"})," as you would as any other Cairo struct."]}),`
`,e.jsxs(n.p,{children:["In the case that your model defines several keys as the ",e.jsx(n.a,{href:"/cairo/models",children:"resource example"}),", you must provide a value for each key."]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:e.jsxs(n.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"let player = get_caller_address();"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"let location = 0x1234;"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"let resource = get!(world, (player, location), (Resource));"})})]})})}),`
`,e.jsxs(n.p,{children:["If you use the ",e.jsx(n.code,{children:"get!"})," command on a model that has never been set before, all the fields that are not ",e.jsx(n.code,{children:"#[key]"})," are equal to 0 in the returned model, which is the default value in the storage."]}),`
`,e.jsxs(n.h3,{id:"the-set-command",children:["The ",e.jsx(n.code,{children:"set!"})," command",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#the-set-command",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"set!"})," command is used to update models state."]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:e.jsxs(n.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"set !(world, ("})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    Moves {"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        player: caller, remaining: 10"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    },"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    Position {"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"        player: caller, x: position.x + 10, y: position.y + 10"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    },"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"));"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"// If the structs are already defined it can also be written as:"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"set!(world, (moves, position));"})})]})})}),`
`,e.jsxs(n.p,{children:["Here we are updating the ",e.jsx(n.code,{children:"Moves"})," and ",e.jsx(n.code,{children:"Position"})," models in the world state using the ",e.jsx(n.code,{children:"caller"})," as the entity id."]}),`
`,e.jsxs(n.h3,{id:"the-emit-command",children:["The ",e.jsx(n.code,{children:"emit!"})," command",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#the-emit-command",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"emit!"})," command is used to emit custom events. These events are indexed by ",e.jsx(n.a,{href:"/toolchain/torii/overview",children:"Torii"}),"."]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:e.jsx(n.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"emit!(world, Moved { address: caller, direction });"})})})})}),`
`,e.jsxs(n.p,{children:["This will emit these values which could be captured by a client or you could query these via ",e.jsx(n.a,{href:"/toolchain/torii/overview",children:"Torii"}),"."]}),`
`,e.jsxs(n.h3,{id:"the-delete-command",children:["The ",e.jsx(n.code,{children:"delete!"})," command",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#the-delete-command",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"delete!"})," command deletes a model from the db."]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:e.jsx(n.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"delete!(world, Moved { address: caller, direction });"})})})})})]})}function r(d={}){const{wrapper:n}={...a(),...d.components};return n?e.jsx(n,{...d,children:e.jsx(i,{...d})}):i(d)}export{r as default,s as frontmatter};
