import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

const authSecret = process.env.AUTH_SECRET;

const AdminPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  let isAuthenticated = false;

  if (token) {
    try {
      verify(token, authSecret);
      isAuthenticated = true;
    } catch (error) {
      console.error(error);
      isAuthenticated = false;
    }
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {!isAuthenticated ? <LoginForm /> : <Dashboard />}
    </div>
  );
};

export default AdminPage;
