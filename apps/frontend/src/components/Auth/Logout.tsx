import { useAuth } from '../../auth/authContext';

const LogoutButton = () => {
  const { logout } = useAuth();

  return <button onClick={logout}>Log Out</button>;
};

export default LogoutButton;
