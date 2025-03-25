import { useState, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, TextInput, PasswordInput, Stack } from '@mantine/core';
import '@mantine/core/styles.css';
import axios from "axios";
import { useSnackbar } from "notistack";
import { storeToken, getToken, removeToken } from '../Services/Services/LocalStorageServices';
import { useAuth0 } from "@auth0/auth0-react";

function Login() {
  const { access_token} = getToken();
  const [opened, { open, close }] = useDisclosure(false);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [loading, setLoading] = useState(false);
  const { loginWithRedirect, isAuthenticated, user, logout, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (access_token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently();
        console.log(accessToken,user);
        
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_APP_URL}/user/auth0`, user, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response);
        
        if (response.status === 200) {
          storeToken({
            generatedaccessToken: JSON.stringify(response.data.message.generatedaccessToken),
            generatedrefreshToken: JSON.stringify(response.data.message.generatedrefreshToken),
            user: JSON.stringify(response.data),
          });

          setIsLoggedIn(true);

          // Trigger storage event for other components
          window.dispatchEvent(new Event('storage'));
        }
      }
    };
    getUserData();
  }, [isAuthenticated, user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_APP_URL}/user/login`, formData);
      if (response.status === 200) {
        // Store token with the correct structure
        storeToken({
          generatedaccessToken: JSON.stringify(response.data.message.generatedaccessToken),
          generatedrefreshToken: JSON.stringify(response.data.message.generatedrefreshToken),
          user: JSON.stringify(response.data),
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
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_APP_URL}/user/logout`
        // , {
        // headers: {
        //   Authorization: `Bearer ${access_token}`,
        // },
      // }
    );
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
    } finally {
      setLoading(false);
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
      {isLoggedIn || isAuthenticated ? (
        <div className="flex gap-2">
          {isAuthenticated && <span>Welcome, {user?.name}</span>}
          <Button 
            variant="subtle" 
            onClick={isAuthenticated ? () => logout() : handleLogout} 
            className="text-gray-400 hover:text-blue-400"
          >
            {loading ? "Loading..." : "Logout"}
          </Button>
        </div>
      ) : (
        <>
          <div className="flex gap-2">
            <Button variant="subtle" onClick={open} className="text-gray-400 hover:text-blue-400">
              Login
            </Button>
            <Button 
              variant="subtle" 
              onClick={() => loginWithRedirect()} 
              className="text-gray-400 hover:text-blue-400"
            >
              Login with Auth0
            </Button>
          </div>
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
        </>
      )}
    </>
  );
}

export default Login;