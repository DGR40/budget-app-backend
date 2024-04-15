import "./SettingsForm.css";
import React, { useEffect, useState } from "react";
import expensesStore from "../Store/expensesStore";
import authStore from "../Store/authStore";
import SettingsControl from "./SettingsControl";
import { useNavigate } from "react-router-dom";
import {
  faTrash,
  faCheck,
  faArrowUp,
  faArrowLeft,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SettingsForm({}) {
  const navigate = useNavigate();
  const [usernameValid, setUsernameValid] = useState(true);
  const [foodAndDrinkValid, setFoodAndDrinkValid] = useState(true);
  const [shoppingValid, setShoppingValid] = useState(true);
  const [entertainmentValid, setEntertainmentValid] = useState(true);
  const [rentValid, setRentValid] = useState(true);
  const [miscValid, setMiscValid] = useState(true);

  const isNotEmpty = (value) => value.trim() !== "";
  const isTooLong = (value) => value.length >= 30;

  const eStore = expensesStore();
  const aStore = authStore();
  const {
    name,
    foodAndDrink,
    shopping,
    entertainment,
    rent,
    subscriptions,
    misc,
  } = authStore().userForm;

  console.log("user", aStore.user);

  // init form values
  useEffect(() => {
    console.log("initializing user form", aStore.user);
    aStore.initUpdateUserForm(aStore.user);
  }, []);

  async function submitHandler(e) {
    e.preventDefault();
    let formValid = true;

    if (!name || isTooLong(name)) {
      console.log("title blank!");
      setUsernameValid(false);
      formValid = false;
    } else {
      setUsernameValid(true);
    }

    if (!foodAndDrink) {
      setFoodAndDrinkValid(false);
      formValid = false;
    }

    if (!shopping) {
      setShoppingValid(false);
      formValid = false;
    }

    if (!entertainment) {
      setEntertainmentValid(false);
      formValid = false;
    }

    if (!rent) {
      setRentValid(false);
      formValid = false;
    }

    if (!misc) {
      setMiscValid(false);
      formValid = false;
    }

    if (formValid) {
      await aStore.updateUser();
      navigate("/");
    }
  }

  return (
    <form onSubmit={submitHandler} className="settings-form">
      <h1>Settings</h1>
      <div className="new-expense__controls settings__controls">
        <SettingsControl
          label="Name"
          type="text"
          name="name"
          value={aStore.userForm.name}
          fieldValid={usernameValid}
          errorMessage={"Username cannot be blank"}
        />
        <SettingsControl
          label="Monthly Food and Drink Budget"
          type="Number"
          name="foodAndDrink"
          value={aStore.userForm.foodAndDrink}
          fieldValid={foodAndDrinkValid}
          errorMessage={"Please enter a non-negative dollar amount"}
        />
        <SettingsControl
          label="Monthly Shopping Budget"
          type="Number"
          name="shopping"
          value={aStore.userForm.shopping}
          fieldValid={shoppingValid}
          errorMessage={"Please enter a non-negative dollar amount"}
        />
        <SettingsControl
          label="Monthly Entertainment Budget"
          type="Number"
          name="entertainment"
          value={aStore.userForm.entertainment}
          fieldValid={entertainmentValid}
          errorMessage={""}
        />
        <SettingsControl
          label="Monthly Rent Budget"
          type="Number"
          name="rent"
          value={aStore.userForm.rent}
          fieldValid={rentValid}
          errorMessage={"Please enter a non-negative dollar amount"}
        />
        <SettingsControl
          label="Monthly Other Budget"
          type="Number"
          name="misc"
          value={aStore.userForm.misc}
          fieldValid={miscValid}
          errorMessage={"Please enter a non-negative dollar amount"}
        />
      </div>
      <div className={"new-expense__actions_edit"}>
        <button type="submit" className="settings-confirm-button">
          Save
        </button>
      </div>
    </form>
  );
}

export default SettingsForm;
