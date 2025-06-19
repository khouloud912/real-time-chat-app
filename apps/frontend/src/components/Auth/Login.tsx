import { useAuth } from '../../contexts/authContext.tsx';

const Login = () => {
  const { login } = useAuth();
  return (
    <button className="button__login" onClick={login}>
      Log In
    </button>
  );
};
export default Login;
