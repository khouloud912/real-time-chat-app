import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  return (
    <button className="button__login" onClick={login}>
      Log In
    </button>
  );
};
export default Login;
