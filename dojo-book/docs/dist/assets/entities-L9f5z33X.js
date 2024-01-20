import{u as s,j as e}from"./index-m6NaWekR.js";const d=void 0;function a(t){const n={a:"a",blockquote:"blockquote",code:"code",div:"div",figure:"figure",h2:"h2",p:"p",pre:"pre",span:"span",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsxs(n.h2,{id:"entities",children:["Entities",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#entities",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"Entities are the primary key value within the world, to which models can be attached."}),`
`]}),`
`,e.jsxs(n.p,{children:["Different ECS systems handle entities in various ways. In Dojo, entities are treated as a primary key value within the world, to which models can be attached. To illustrate this concept, consider a simple example of a character in a game that has a ",e.jsx(n.code,{children:"Moves"})," and a ",e.jsx(n.code,{children:"Position"})," model."]}),`
`,e.jsx(n.p,{children:"When defining the models for this entity, it is important to note that we do not reference the entity directly. Instead, we simply provide two structs that the entity will contain."}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:e.jsxs(n.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"#[derive(Models, Drop, Serde)]"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"struct Moves {"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    #[key]"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    player: ContractAddress,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    remaining: u8,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"}"})}),`
`,e.jsx(n.span,{"data-line":"",children:" "}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"#[derive(Models, Drop, Serde)]"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"struct Health {"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    #[key]"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    player: ContractAddress,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    x: u32,"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"    y: u32"})}),`
`,e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{children:"}"})})]})})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:["ECS Theory: Plenty has been written on ECS systems, to go deeper read ",e.jsx(n.a,{href:"https://github.com/SanderMertens/ecs-faq",children:"ECS-FAQ"})]}),`
`]})]})}function r(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(a,{...t})}):a(t)}export{r as default,d as frontmatter};
