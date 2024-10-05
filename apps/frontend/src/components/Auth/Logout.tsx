import { useAuth } from '../../auth/auth';

const LogoutButton = () => {
  const { logout } = useAuth();

  return <button onClick={logout}>Log Out</button>;
};

export default LogoutButton;
