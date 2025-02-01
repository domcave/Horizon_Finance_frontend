import React from 'react';
import InputField from './InputField';
import './SignUpForm.css'; // Import the CSS for styling the form

const SignUpForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle form submission, e.g., send data to a server.
    console.log('Form submitted');
  };

  return (
    <div className="signup-container">
      <h2>Create Your Account</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          id="email"
          type="email"
          name="email"
          placeholder="you@example.com"
          label="Email"
        />
        <InputField
          id="name"
          type="text"
          name="name"
          placeholder="John Doe"
          label="Full Name"
        />
        <InputField
          id="username"
          type="text"
          name="username"
          placeholder="johndoe"
          label="Username"
        />
        <InputField
          id="passcord"
          type="password"
          name="passcord"
          placeholder="Enter your passcord"
          label="Passcord"
        />
        <button type="submit" className="submit-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
