import React, { useState } from "react";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f9;
`;

const LoginBox = styled.div`
    background: white;
    padding: 20px 40px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
`;

const Title = styled.h1`
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #45a049;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
`;

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate inputs
        if (!username || !password) {
            setError("Both fields are required!");
            return;
        }

        setError("");
        console.log("Username:", username);
        console.log("Password:", password);
        // Here, you can handle login logic, like sending data to an API.
    };

    return (
        <Container>
            <LoginBox>
                <Title>Login</Title>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit">Login</Button>
                </form>
            </LoginBox>
        </Container>
    );
}
