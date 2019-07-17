import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./Home/HomePage";
import AboutPage from "./About/AboutPage";
import PageNotFound from "./PageNotFound";
import LotofacilPage from "./Loteria/Lotofacil/LotofacilPage";
import Header from "./_common/Header";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/lotofacil" component={LotofacilPage} />
        <Route component={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;
