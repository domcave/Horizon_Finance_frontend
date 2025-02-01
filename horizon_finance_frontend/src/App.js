import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./SignUpForm.js";
import Dashboard from "./Dashboard.js";
import WhatIf from "./WhatIf.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/what-if" element={<WhatIf />} />
      </Routes>
    </Router>
  );
}
export default App;