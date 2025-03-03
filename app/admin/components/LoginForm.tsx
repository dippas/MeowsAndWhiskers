'use client';

import { useState } from 'react';
import CryptoJS from 'crypto-js';

interface LoginState {
  username: string;
  password: string;
  error: string;
  loading: boolean;
}

const LoginForm = () => {
  const [loginState, setLoginState] = useState<LoginState>({
    username: '',
    password: '',
    error: '',
    loading: false
  });

  const { username, password, error, loading } = loginState;

  const handleLogin = async () => {
    setLoginState(prev => ({ ...prev, error: '', loading: true }));

    if (!username || !password) {
      setLoginState(prev => ({
        ...prev,
        error: 'Please enter both username and password.',
        loading: false
      }));
      return;
    }

    // Create a hash of the password
    const hashedPassword = CryptoJS.SHA256(password).toString();

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          hashedPassword
        })
      });

      if (res.ok) {
        window.location.reload();
      } else {
        setLoginState(prev => ({ ...prev, error: 'Invalid credentials', loading: false }));
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginState(prev => ({
        ...prev,
        error: 'An error occurred during login',
        loading: false
      }));
    }
  };

  return (
    <>
      {/* <TextInput
        label="Username"
        placeholder="Enter your username"
        value={username}
        onChange={({ target }) => setLoginState(prev => ({ ...prev, username: target.value }))}
        mt="md"
      />
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={({ target }) => setLoginState(prev => ({ ...prev, password: target.value }))}
        mt="md"
      />
      {error && (
        <Text c="red" mt="md">
          {error}
        </Text>
      )}
      <Button onClick={handleLogin} mt="md" loading={loading} disabled={loading}>
        Login
      </Button> */}
    </>
  );
};

export default LoginForm;
