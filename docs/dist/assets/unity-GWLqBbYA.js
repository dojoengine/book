import{u as s,j as e}from"./index-KZ_aprDi.js";const o={title:"dojo.unity",description:"undefined"};function r(i){const n={a:"a",code:"code",div:"div",figure:"figure",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",hr:"hr",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"dojounity",children:["dojo.unity",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#dojounity",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(n.h3,{id:"prerequisites",children:["Prerequisites",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#prerequisites",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"Before getting started, there are a few steps you must follow in order to get the project up and running."}),`
`,e.jsxs(n.h4,{id:"dojo",children:["Dojo",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#dojo",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Ensure that you're using the latest supported Dojo ",e.jsx(n.a,{href:"https://github.com/dojoengine/dojo/releases",children:"version"}),"."]}),`
`,e.jsxs(n.h4,{id:"binaries",children:["Binaries",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#binaries",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["If you are using Windows or Linux, you will need to build ",e.jsx(n.a,{href:"https://github.com/dojoengine/dojo.c",children:"dojo.c"})," yourself. Make sure that you're using the latest supported version"]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{tabIndex:"0","data-language":"bash","data-theme":"github-dark-dimmed github-light",children:e.jsxs(n.code,{"data-language":"bash","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"git"}),e.jsx(n.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" clone https://github.com/dojoengine/dojo.c"})]}),`
`,e.jsxs(n.span,{"data-line":"",children:[e.jsx(n.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"cargo"}),e.jsx(n.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" build --release"})]})]})})}),`
`,e.jsxs(n.p,{children:["This will generate a ",e.jsx(n.code,{children:".dll"})," or ",e.jsx(n.code,{children:".so"})," binary in the ",e.jsx(n.code,{children:"target/release"})," directory, depending on your platform. You will need to copy it to the following location ",e.jsx(n.code,{children:"Packages/Dojo/Libraries"})]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.h3,{id:"watch-video",children:["Watch video",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#watch-video",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,`
`,e.jsxs(n.h2,{id:"dojo-unity-concepts",children:["Dojo Unity Concepts",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#dojo-unity-concepts",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"Building on-chain games and worlds with Unity involves understanding several key concepts and components. Let's go over them to give you a clearer picture:"}),`
`,e.jsxs(n.h2,{id:"world-manager",children:["World Manager",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#world-manager",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/unity/world-manager.png",alt:"world-manager"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Function"}),": The World Manager acts as the central hub for your Dojo world within Unity. It's the starting point where all entities from your Dojo world will be managed."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Implementation"}),": In your Unity scene, you'll find a ",e.jsx(n.code,{children:"WorldManager"})," game object. Under this object, all entities from your Dojo world will be instantiated."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Customization"}),": The WorldManager script component comes with default values, but you have the option to modify these. Specifically, you can update the URLs for your Katana and Torii instances and set your own world address."]}),`
`]}),`
`,e.jsxs(n.h2,{id:"synchronization-master",children:["Synchronization Master",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#synchronization-master",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/unity/sync-master.png",alt:"world-manager"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Role"}),": This component is crucial for managing the synchronization of entities between your Dojo world and the Unity world."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Features"}),": In the SynchronizationMaster, you can specify the maximum number of entities you want to synchronize. It also handles the synchronization of your models' components."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Models Component"}),":",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Purpose"}),": These are the components that will be synchronized between the two worlds."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Management"}),": You have the flexibility to add as many models as needed. However, it's important to ensure that the models you add here are also present in your Dojo world for proper synchronization."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.h2,{id:"models",children:["Models",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#models",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/unity/models.png",alt:"models"})}),`
`,e.jsxs(n.p,{children:["You should have a deep understanding of models in dojo if not checkout out models ",e.jsx(n.a,{href:"/cairo/models",children:"here"})," before continuing."]}),`
`,e.jsxs(n.h3,{id:"what-are-models-in-dojo",children:["What are Models in Dojo?",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#what-are-models-in-dojo",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Definition"}),": In Dojo, ",e.jsx(n.a,{href:"/cairo/models",children:"models"})," are essential state that represent various parts of ",e.jsx(n.a,{href:"/cairo/entities",children:"entities"})," within your game. They are the building blocks that make up the content of your game world. Read about ",e.jsx(n.a,{href:"/cairo/hello-dojo",children:"ECS"}),"."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Synchronization Role"}),":"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Models act as the key elements that are synchronized between the onchain Dojo world and the Unity world (your game's visual and interactive representation)."}),`
`,e.jsx(n.li,{children:"This synchronization ensures that changes or interactions happening within the Unity environment are accurately reflected in the Dojo world, and vice versa."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Flexibility in Adding Models"}),":"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["You have the freedom to add as many ",e.jsx(n.a,{href:"/cairo/models",children:"models"})," as needed for your game's design and functionality."]}),`
`,e.jsxs(n.li,{children:["It's vital, however, to ensure that these ",e.jsx(n.a,{href:"/cairo/models",children:"models"})," are consistent across both the Dojo and Unity. This means that for every model you have in Unity, there should be a corresponding model in your Dojo world."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Future Developments"}),":"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["An important aspect to note is that in future versions of the Dojo-Unity integration, the process of adding and synchronizing ",e.jsx(n.a,{href:"/cairo/models",children:"models"})," will be further streamlined."]}),`
`,e.jsxs(n.li,{children:["The plan is to have these ",e.jsx(n.a,{href:"/cairo/models",children:"models"})," auto-generated, which would significantly simplify the development process and reduce the manual effort required for synchronization."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Importance of Understanding Models"}),":"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Before diving into game development with Dojo in Unity, it’s recommended to have a solid understanding of how ",e.jsx(n.a,{href:"/cairo/models",children:"models"})," work in the Dojo environment."]}),`
`,e.jsx(n.li,{children:"This knowledge is crucial for effectively designing and implementing game elements that interact seamlessly between the blockchain and the game's user interface."}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.p,{children:["In summary, ",e.jsx(n.a,{href:"/cairo/models",children:"models"})," are the bridge between the onchain (Dojo) and off-chain (Unity) aspects of your game."]}),`
`,e.jsxs(n.h3,{id:"adding-models",children:["Adding Models",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#adding-models",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"The process to add models is:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Define in your dojo cairo contracts"}),`
`,e.jsx(n.li,{children:"Define in your Unity world making sure they accurately reflect"}),`
`]}),`
`,e.jsxs(n.h3,{id:"adding-systems",children:["Adding Systems",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#adding-systems",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"[insert]"}),`
`,e.jsxs(n.h3,{id:"entities",children:["Entities",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#entities",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Via toriiClient ",e.jsx(n.a,{href:"/cairo/entities",children:"models"})," are synced to Unity and are comprised of the models that you defined."]}),`
`,e.jsxs(n.h3,{id:"starter-project",children:["Starter Project",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#starter-project",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"Get started by:"}),`
`,e.jsxs(n.ol,{start:"0",children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#prerequisites",children:"Prerequisites"})}),`
`,e.jsxs(n.li,{children:["Cloning the ",e.jsx(n.a,{href:"https://github.com/dojoengine/dojo.unity",children:"dojo.unity"})]}),`
`,e.jsx(n.li,{children:"Open project within Unity"}),`
`,e.jsxs(n.li,{children:["Run the ",e.jsx(n.a,{href:"https://github.com/dojoengine/dojo-starter-unity",children:"dojo-starter"})," project and make sure to have Katana and Torii running."]}),`
`]})]})}function d(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(r,{...i})}):r(i)}export{d as default,o as frontmatter};
