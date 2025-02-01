import React from 'react';
import InputField from './InputField';
import { useNavigate } from 'react-router-dom';
import './SignUpForm.css'; // Import the CSS for styling the form

const SignUpForm = () => {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you can handle form submission, e.g., send data to a server.

        // Ensure form validation
        // Get form data
        const formData = new FormData(event.target);
        const email = formData.get("email");
        const name = formData.get("name");
        const username = formData.get("username");
        const passcord = formData.get("passcord");

        // Validate form fields
        if (!email || !name || !username || !passcord) {
            alert("Please fill out all fields.");
            return;
        }

        console.log("Form submitted successfully:", { email, name, username });



        console.log('Form submitted');
        navigate("/Dashboard");
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
