import { useState, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, TextInput, PasswordInput, Stack } from '@mantine/core';
import '@mantine/core/styles.css';
import axios from "axios";
import { useSnackbar } from "notistack";
import { storeToken, getToken, removeToken } from '../Services/Services/LocalStorageServices';

function Login() {
  const [opened, { open, close }] = useDisclosure(false);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });

  useEffect(() => {
    const { access_token } = getToken();
    if (access_token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/v1/user/login', formData);
      if (response.status === 200) {
        // Store token with the correct structure
        storeToken({
          generatedaccessToken: JSON.stringify(response.data.message),
          generatedrefreshToken: JSON.stringify(response.data.message),
          user: JSON.stringify(response.data)
        });

        setFormData({
          email: '',
          password: '',
          username: '',
        });
        close();
        enqueueSnackbar(response.data.data, { variant: "success" });
        setIsLoggedIn(true);

        // Trigger storage event for other components
        window.dispatchEvent(new Event('storage'));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          enqueueSnackbar('Please Register First', { variant: "error" });
        } else {
          enqueueSnackbar(error.response.statusText, { variant: "error" });
        }
      } else {
        enqueueSnackbar('An error occurred', { variant: "error" });
      }
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/v1/user/logout');
      if (response.status === 200) {
        removeToken();
        localStorage.removeItem('user');
        enqueueSnackbar(response.data.data, { variant: "success" });
        setIsLoggedIn(false);

        // Trigger storage event for other components
        window.dispatchEvent(new Event('storage'));
      }
    } catch (error) {
      if (error.response) {
        enqueueSnackbar(error.response.statusText, { variant: "error" });
      } else {
        enqueueSnackbar('An error occurred', { variant: "error" });
      }
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      {isLoggedIn ? (
        <Button variant="subtle" onClick={handleLogout} className="text-gray-400 hover:text-blue-400">
          Logout
        </Button>
      ) : (
        <>
          <Modal opened={opened} onClose={close} title="Login" centered size="md">
            <form onSubmit={handleSubmit}>
              <Stack spacing="md">
                <TextInput
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  required
                />
                <TextInput
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
                <PasswordInput
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Your password"
                  required
                />
                <Button type="submit" fullWidth>
                  Login
                </Button>
              </Stack>
            </form>
          </Modal>

          <Button variant="subtle" onClick={open} className="text-gray-400 hover:text-blue-400">
            Login
          </Button>
        </>
      )}
    </>
  );
}

export default Login;