import React from "react";
import {Route, NavLink, Link} from "react-router-dom";
import PizzaForm from "./components/PizzaForm";

const App = () => {
  return (
    <>
      <h1>Lambda Eats</h1>
      <NavLink to="/">Home</NavLink>

      <Route exact path="/">
        <Link to="/pizza">
          <button>Order Pizza</button>
        </Link>
      </Route>

      <Route exact path="/pizza">
        <PizzaForm />
      </Route>
    </>
  );
};
export default App;
