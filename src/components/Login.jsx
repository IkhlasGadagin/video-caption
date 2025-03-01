import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, TextInput, PasswordInput, Stack } from '@mantine/core';
import '@mantine/core/styles.css';
import axios from "axios";
import { useSnackbar } from "notistack";

function Login() {
  const [opened, { open, close }] = useDisclosure(false);
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/v1/user/login', formData);
      console.log(response.data);
      
      if (response.status === 200) {
        setFormData({
          email: '',
          password: '',
          username: '',
        });
        close();
        enqueueSnackbar(response.data.data, { variant: "success" });
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

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
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
  );
}

export default Login;