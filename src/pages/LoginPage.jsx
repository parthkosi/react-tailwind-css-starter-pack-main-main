import React from "react";
import Navbar from "../components/Navbar";
import Form from "../components/Form";

function LoginPage() {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Form />
      </div>
    </div>
  );
}
export default LoginPage;
