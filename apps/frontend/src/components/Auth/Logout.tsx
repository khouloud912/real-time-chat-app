import { useAuth } from '../../contexts/authContext.tsx';

const LogoutButton = () => {
  const { logout } = useAuth();

  return <button onClick={logout}>Log Out</button>;
};

export default LogoutButton;
