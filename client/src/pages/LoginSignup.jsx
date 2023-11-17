import MoonAnimation from '@/components/MoonAnimation';
import { Link } from 'react-router-dom';
import Register from '@/components/Register';
import Login from '@/components/Login';

/**
 * Página del registro e inicio de sesión.
 *
 * @returns {JSX.Element} Página del registro e inicio de sesión.
 */
function LoginSignup() {
  return (
    <div className="row mybody-loginsignup">
      <MoonAnimation />
      <div className="flex justify-center items-center h-screen">
        <div className="login-register">
          <Link
            to="/"
            className="btnBack link-style text-decorations-none absolute top-0 right-0 bg-[#A94639] hover:bg-[#8b0000]"
          >
            X
          </Link>
          <input type="checkbox" id="chk" aria-hidden="true"></input>
          <div className="login px-10">
            <Login />
          </div>

          <div className="signup px-10">
            <Register />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
