import React from "react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import Title from "./title";
import Sportstable from "./smanagement";
import { Router } from "react-router-dom";

function Sports() {
  return (
    <Provider store={store}>
      <div>
        <Router>
          <Title />
          {/* <AddTask /> */}
          <Sportstable />
        </Router>
      </div>
    </Provider>
  );
}

export default Sports;
