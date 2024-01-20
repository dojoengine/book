import{u as i,j as n}from"./index-m6NaWekR.js";const d=void 0;function a(s){const e={a:"a",code:"code",div:"div",figure:"figure",h2:"h2",h3:"h3",h4:"h4",p:"p",pre:"pre",span:"span",...i(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsxs(e.h2,{id:"testing",children:["Testing",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#testing",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(e.p,{children:["Testing is a crucial part of any software development process. Dojo provides a testing framework that allows you to write tests for your smart contracts. Since Dojo uses a custom compiler, you need to use ",n.jsx(e.code,{children:"sozo"})," to test your contracts."]}),`
`,n.jsx(e.p,{children:"From your project directory, simply:"}),`
`,n.jsx(e.figure,{"data-rehype-pretty-code-figure":"",children:n.jsx(e.pre,{tabIndex:"0","data-language":"shell","data-theme":"github-dark-dimmed github-light",children:n.jsx(e.code,{"data-language":"shell","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:n.jsxs(e.span,{"data-line":"",children:[n.jsx(e.span,{style:{"--shiki-dark":"#F69D50","--shiki-light":"#6F42C1"},children:"sozo"}),n.jsx(e.span,{style:{"--shiki-dark":"#96D0FF","--shiki-light":"#032F62"},children:" test"})]})})})}),`
`,n.jsx(e.p,{children:"This will search for all tests within your project and run them."}),`
`,n.jsxs(e.h3,{id:"writing-unit-tests",children:["Writing Unit Tests",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#writing-unit-tests",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsx(e.p,{children:"It is best practise to include unit tests in the same file as the Model/System you are writing."}),`
`,n.jsxs(e.p,{children:["Lets show a ",n.jsx(e.code,{children:"model"})," test example from the ",n.jsx(e.a,{href:"https://github.com/dojoengine/dojo-starter",children:"dojo-starter"}),":"]}),`
`,n.jsx(e.p,{children:n.jsx(e.code,{children:"models.cairo"})}),`
`,n.jsx(e.figure,{"data-rehype-pretty-code-figure":"",children:n.jsx(e.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:n.jsxs(e.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"...//rest of code"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"#[cfg(test)]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"mod tests {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    use super::{Position, Vec2, Vec2Trait};"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    #[test]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    #[available_gas(100000)]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    fn test_vec_is_zero() {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        assert(Vec2Trait::is_zero(Vec2 { x: 0, y: 0 }), 'not zero');"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    }"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    #[test]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    #[available_gas(100000)]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    fn test_vec_is_equal() {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        let position = Vec2 { x: 420, y: 0 };"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        assert(position.is_equal(Vec2 { x: 420, y: 0 }), 'not equal');"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    }"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"}"})})]})})}),`
`,n.jsxs(e.p,{children:["In this test we are testing the ",n.jsx(e.code,{children:"is_zero"})," and ",n.jsx(e.code,{children:"is_equal"})," functions of the ",n.jsx(e.code,{children:"Position"})," model. It is good practise to test all functions of your models."]}),`
`,n.jsxs(e.h3,{id:"writing-integration-tests",children:["Writing Integration Tests",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#writing-integration-tests",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(e.p,{children:["Integration tests are e2e tests that test the entire system. You can write integration tests for your world by creating a ",n.jsx(e.code,{children:"tests"})," directory in your project root. Then create a file for each integration test you want to write."]}),`
`,n.jsxs(e.p,{children:["This is the example from the ",n.jsx(e.a,{href:"https://github.com/dojoengine/dojo-starter",children:"dojo-starter"}),":"]}),`
`,n.jsx(e.p,{children:n.jsx(e.code,{children:"move.cairo"})}),`
`,n.jsx(e.figure,{"data-rehype-pretty-code-figure":"",children:n.jsx(e.pre,{tabIndex:"0","data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",children:n.jsxs(e.code,{"data-language":"rust,ignore","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"#[cfg(test)]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"mod tests {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    use dojo::world::{IWorldDispatcherTrait, IWorldDispatcher};"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    use dojo::test_utils::{spawn_test_world, deploy_contract};"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    use dojo_examples::models::{position, moves};"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    use dojo_examples::models::{Position, Moves, Direction};"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    use super::{actions, IActionsDispatcher, IActionsDispatcherTrait};"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    // helper setup function"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    // reusable function for tests"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    fn setup_world() -> IActionsDispatcher {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        // components"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        let mut models = array![position::TEST_CLASS_HASH, moves::TEST_CLASS_HASH];"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"         // deploy world with models"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        let world = spawn_test_world(models);"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        // deploy systems contract"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        let contract_address = world"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"            .deploy_contract('salt', actions::TEST_CLASS_HASH.try_into().unwrap());"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        let actions_system = IActionsDispatcher { contract_address };"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        actions_system"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    }"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    #[test]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    #[available_gas(30000000)]"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    fn test_move() {"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        // caller"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        let caller = starknet::contract_address_const::<0x0>();"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        let actions_system = setup_world();"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"         // System calls"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        actions_system.spawn();"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        actions_system.move(Direction::Right(()));"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        // check moves"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        let moves = get!(world, caller, (Moves));"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        assert(moves.remaining == 99, 'moves is wrong');"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        // get new_position"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        let new_position = get!(world, caller, Position);"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        // check new position x"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        assert(new_position.vec.x == 11, 'position x is wrong');"})}),`
`,n.jsx(e.span,{"data-line":"",children:" "}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        // check new position y"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"        assert(new_position.vec.y == 10, 'position y is wrong');"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"    }"})}),`
`,n.jsx(e.span,{"data-line":"",children:n.jsx(e.span,{children:"}"})})]})})}),`
`,n.jsxs(e.h4,{id:"useful-dojo-test-functions",children:["Useful Dojo Test Functions",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#useful-dojo-test-functions",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"spawn_test_world(models)"})," - This function will create a test world with the models and systems you pass in. It will also deploy the world and register the models and systems."]})]})}function r(s={}){const{wrapper:e}={...i(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(a,{...s})}):a(s)}export{r as default,d as frontmatter};
