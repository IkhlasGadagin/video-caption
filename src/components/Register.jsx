import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, TextInput, PasswordInput, Stack } from '@mantine/core';
import '@mantine/core/styles.css';

function Register() {
  const [opened, { open, close }] = useDisclosure(false);
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    password: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      close();
    } else {
      console.error('Error registering user:', response.statusText);
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
      <Modal opened={opened} onClose={close} title="Register" centered size="md">
        <form onSubmit={handleSubmit}>
          <Stack spacing="md">
            <TextInput
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
            <TextInput
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
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
              Register
            </Button>
          </Stack>
        </form>
      </Modal>

      <Button variant="subtle" onClick={open} className="text-gray-400 hover:text-blue-400">
        Register
      </Button>
    </>
  );
}

export default Register;
