'use client'; // This component is a client component

import { useState } from 'react';

interface DashboardState {
  title: string;
  content: string;
  message: string;
  loading: boolean;
}

const Dashboard = () => {
  const [state, setState] = useState<DashboardState>({
    title: '',
    content: '',
    message: '',
    loading: false
  });

  const { title, content, message, loading } = state;

  const handleSubmit = async () => {
    setState(prev => ({ ...prev, message: '', loading: true }));

    const res = await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    });

    if (res.ok) {
      setState(prev => ({
        ...prev,
        message: 'Blog post published and GitHub issue created!',
        title: '',
        content: '',
        loading: false
      }));
    } else {
      setState(prev => ({
        ...prev,
        message: 'Error publishing blog post',
        loading: false
      }));
    }
  };

  const handleLogout = async () => {
    const res = await fetch('/api/auth/logout', {
      method: 'POST'
    });

    if (res.ok) {
      window.location.reload();
    }
  };

  return (
    <section>
      <h1>Dashboard</h1>
    </section>
    // <Stack>
    //   <Group justify="flex-end">
    //     <button onClick={handleLogout} color="red">
    //       Logout
    //     </button>
    //   </Group>

    //   <TextInput
    //     label="Title"
    //     placeholder="Enter blog title"
    //     value={title}
    //     onChange={({ target }) => setState(prev => ({ ...prev, title: target.value }))}
    //     mt="md"
    //   />
    //   <Textarea
    //     label="Content"
    //     placeholder="Enter blog content"
    //     value={content}
    //     onChange={({ target }) => setState(prev => ({ ...prev, content: target.value }))}
    //     mt="md"
    //     minRows={4}
    //   />
    //   <Group mt="md">
    //     <Button onClick={handleSubmit} loading={loading} disabled={loading}>
    //       Publish
    //     </Button>
    //   </Group>
    //   {message && (
    //     <Text mt="md" c={message.includes('Error') ? 'red' : 'green'}>
    //       {message}
    //     </Text>
    //   )}
    // </Stack>
  );
};

export default Dashboard;
