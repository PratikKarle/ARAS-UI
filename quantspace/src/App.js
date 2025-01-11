import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/Home/HomePage";
import Loginform from "./components/Form/Loginform";
import ItemTypeForm from "./components/Form/ItemTypeForm";
import LifeCycleForm from "./components/Form/LifeCycleForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginform />} />
        <Route path="/home" element={<SplashScreen />} />
        <Route path="/itemtypes" element={<ItemTypeForm />} />
        <Route path="/lifecycles" element={<LifeCycleForm />} />
        {/* <Route path="/users" element={<UserForm />} />
        <Route path="/identities" element={<IdentityForm />} /> */}
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;