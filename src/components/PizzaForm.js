import React, {useState, useEffect} from "react";
import * as Yup from "yup";
import axios from "axios";

const formSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name should be a minimun of two letters")
    .required("Name is a required field"),
  size: Yup.mixed().oneOf(["Small", "Medium", "Large"]),
  sauce: Yup.mixed().oneOf(["Original", "Garlic", "BBQ", "Alfredo"]),
  Pepperoni: Yup.boolean(),
  Sausage: Yup.boolean(),
  Bacon: Yup.boolean(),
  Chicken: Yup.boolean(),
  Onions: Yup.boolean(),
  Pepper: Yup.boolean(),
  Tomato: Yup.boolean(),
  Olives: Yup.boolean(),
  Garlic: Yup.boolean(),
  Pineapple: Yup.boolean(),
  glutenSubstitute: Yup.boolean(),
  instructions: Yup.string(),
});

const PizzaForm = () => {
  const [pizzaFormState, setPizzaFormState] = useState([
    {
      name: "",
      size: "",
      sauce: "",
      Pepperoni: false,
      Sausage: false,
      Bacon: false,
      Chicken: false,
      Onions: false,
      Pepper: false,
      Tomato: false,
      Olives: false,
      Garlic: false,
      Pineapple: false,
      glutenSubstitute: false,
      instructions: "",
    },
  ]);

  const [errors, setErrors] = useState({
    name: "",
    size: "",
    sauce: "",
    Pepperoni: "",
    Sausage: "",
    Bacon: "",
    Chicken: "",
    Onions: "",
    Pepper: "",
    Tomato: "",
    Olives: "",
    Garlic: "",
    Pineapple: "",
    glutenSubstitute: "",
    instructions: "",
  });

  const [orders, setOrders] = useState([]);
  const [serverError, setServerError] = useState("");

  const sizes = ["Choose Pizza Size", "Small", "Medium", "Large"];
  const sauces = ["Choose Sauce", "Original", "Garlic", "BBQ", "Alfredo"];
  const toppings = [
    "Pepperoni",
    "Sausage",
    "Bacon",
    "Chicken",
    "Onions",
    "Pepper",
    "Tomato",
    "Olives",
    "Garlic",
    "Pineapple",
  ];

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    formSchema.isValid(pizzaFormState).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [pizzaFormState]);

  const validateChange = (event) => {
    Yup.reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [event.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [event.target.name]: err.errors[0],
        });
      });
  };

  const handleChange = (event) => {
    event.persist();
    setPizzaFormState({
      ...pizzaFormState,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    });
    validateChange(event);
  };

  const formSubmit = (event) => {
    event.preventDefault();

    axios
      .post("https://reqres.in/api/users", pizzaFormState)
      .then((res) => {
        setOrders([...orders, res.data]);

        setPizzaFormState({
          name: "",
          size: "",
          sauce: "",
          Pepperoni: false,
          Sausage: false,
          Bacon: false,
          Chicken: false,
          Onions: false,
          Pepper: false,
          Tomato: false,
          Olives: false,
          Garlic: false,
          Pineapple: false,
          glutenSubstitute: false,
          instructions: "",
        });
        setServerError(null);
      })
      .catch((err) => {
        setServerError("oops! something's not right!");
      });
  };

  return (
    <>
      <h3>Build Your Own Pizza</h3>
      <form onSubmit={formSubmit}>
        <label htmlFor="name">
          <h2>Customer Name</h2>
          <input
            id="name"
            name="name"
            data-cy="name"
            onChange={handleChange}
            value={pizzaFormState.name}
          />
          {errors.name.length > 0 ? <p>{errors.name}</p> : null}
        </label>
        <label htmlFor="size">
          <h2>Choice of Size</h2>
          <p>Required</p>
          <select
            id="size"
            name="size"
            data-cy="size"
            onChange={handleChange}
            value={pizzaFormState.size}
          >
            {sizes.map((size) => {
              return (
                <option value={size} key={size} onChange={handleChange}>
                  {size}
                </option>
              );
            })}
          </select>
        </label>

        <label htmlFor="sauce">
          <h2>Choice of Sauce</h2>
          <p>Required</p>
          <select
            id="sauce"
            name="sauce"
            data-cy="sauce"
            onChange={handleChange}
            value={pizzaFormState.sauce}
          >
            {sauces.map((sauce) => {
              return (
                <option value={sauce} key={sauce} onChange={handleChange}>
                  {sauce}
                </option>
              );
            })}
          </select>
        </label>

        <label htmlFor="toppings">
          <h2>Add Toppings</h2>
          <p>Choose up to 6</p>
          {toppings.map((topping) => {
            return (
              <label htmlFor={topping} key={topping}>
                <input
                  type="checkbox"
                  name={topping}
                  data-cy={topping}
                  // checked={}
                />
                {topping}
              </label>
            );
          })}
        </label>

        <label htmlFor="glutenSubstitute">
          <h2>Choice of Substitute</h2>
          <p>Choose up to 1</p>
          <input
            type="checkbox"
            name="glutenSubstitute"
            data-cy="glutenSubstitute"
            checked={pizzaFormState.glutenSubstitute}
            value={pizzaFormState.glutenSubstitute}
          />
          Gluten Free Crust (+ $1.00)
        </label>

        <label htmlFor="instructions">
          <h2>Special Instructions</h2>
          <textarea
            id="instructions"
            name="instructions"
            data-cy="instructions"
            onChange={handleChange}
            value={pizzaFormState.instructons}
          ></textarea>
        </label>
        <div>
          <button data-cy="submit" disabled={buttonDisabled}>
            Submit
          </button>
        </div>
        <p>{JSON.stringify(orders, null, 2)}</p>
      </form>
    </>
  );
};

export default PizzaForm;
