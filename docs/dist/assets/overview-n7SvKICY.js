import{u as o,j as e}from"./index-KZ_aprDi.js";const d={title:"Dojo.unity",description:"undefined"};function t(i){const n={a:"a",blockquote:"blockquote",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",header:"header",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"dojounity",children:["Dojo.unity",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#dojounity",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(n.h2,{id:"overview",children:["Overview",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#overview",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"Dojo.unity is the official Unity SDK for interacting with Dojo worlds to develop web and desktop 2D and 3D games."}),`
`,e.jsxs(n.h2,{id:"prerequisites",children:["Prerequisites",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#prerequisites",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"Before getting started, you must follow a few steps to get the project up and running:"}),`
`,e.jsxs(n.div,{"data-vocs-steps":"true",children:[e.jsxs(n.div,{"data-depth":"3",children:[e.jsxs(n.h3,{id:"install-dependencies",children:["Install dependencies",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#install-dependencies",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Install ",e.jsx(n.a,{href:"/toolchain/dojoup",children:"Dojo"})]}),`
`]}),e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:["Required version >= ",e.jsx(n.code,{children:"0.4.0"})]}),`
`]}),e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Install ",e.jsx(n.a,{href:"https://unity.com/download",children:"Unity"})]}),`
`]}),e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:["Required version >= ",e.jsx(n.code,{children:"2022.3.15f1"})]}),`
`]})]}),e.jsxs(n.div,{"data-depth":"3",children:[e.jsxs(n.h3,{id:"setting-up-dojounity-sdk",children:["Setting up Dojo.unity sdk",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#setting-up-dojounity-sdk",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),e.jsx(n.p,{children:"To get started with the Dojo.Unity SDK, follow these steps:"}),e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Download the dojo.unity package:"})," Visit the ",e.jsx(n.a,{href:"https://github.com/dojoengine/dojo.unity/releases",children:"dojo.unity releases page"})," and download the latest version of the ",e.jsx(n.code,{children:"dojo.unitypackage"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Open or Create a Unity Project:"})," Launch Unity and either create a new project or open an existing one where you intend to integrate Dojo.unity"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Import the Dojo.unity Package:"})," Navigate to ",e.jsx(n.code,{children:"Assets/Import Package/Custom Package"}),` within your Unity project.
Choose the downloaded `,e.jsx(n.code,{children:"dojo.unitypackage"}),` file.
`,e.jsx(n.img,{src:"/unity/import-unitypackage-01.png",alt:"unitypackage01"}),`
Finally, ensure to check only the aimed platforms for your project.
`,e.jsx(n.img,{src:"/unity/import-unitypackage-02.png",alt:"unitypackage02"})]}),`
`]}),e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Warning:"})," If your project includes the ",e.jsx(n.code,{children:"Plugins/iOS"})," directory, note that it requires ",e.jsx(n.strong,{children:"Git Large File Storage (LFS)"})," to be uploaded. Refer to ",e.jsx(n.a,{href:"https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage",children:"GitHub's documentation on Git LFS"})," for more information."]}),`
`]}),e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Import Newtonsoft's Json.NET Dependency:"})," In Unity, navigate to ",e.jsx(n.code,{children:"Window/Package Manager"}),`.
`,e.jsx(n.img,{src:"/unity/unitypackage-dependencies-01.png",alt:"unitypackage01"}),`
Once the `,e.jsx(n.code,{children:"Package Manager"})," window opens, select ",e.jsx(n.code,{children:"Add package from git URL"}),`
`,e.jsx(n.img,{src:"/unity/unitypackage-dependencies-02.png",alt:"unitypackage02"}),`
Enter `,e.jsx(n.code,{children:"com.unity.nuget.newtonsoft-json"})," as the package URL, click ",e.jsx(n.code,{children:"Add"})," and then ",e.jsx(n.code,{children:"Done"})," to import the dependency."]}),`
`]})]})]})]})}function r(i={}){const{wrapper:n}={...o(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{r as default,d as frontmatter};
