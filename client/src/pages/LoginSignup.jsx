import { useState } from 'react';
import '../assets/css/LoginSignup.css'
import MoonAnimation from '../components/MoonAnimation.jsx'

function LoginSignup() {
    return (
      <>
        <MoonAnimation/>
        <div className="main col-4">
            <input type="checkbox" id="chk" aria-hidden="true"></input>
            <div className="login">
                <form>
                    <label htmlFor="chk" aria-hidden="true">Inicia sesión</label>
                    <input type="email" name="email" placeholder="Email" required></input>
                    <input type="password" name="password" placeholder="Password" required></input>
                    <button>Acceder</button>
                </form>
            </div>
            <div className="signup">
                <form>
                    <label htmlFor="chk" aria-hidden="true">Regístrate</label>
                    <input type="text" id="newUsername" name="newUsername" placeholder="Username" required></input>
                    <input type="email" id="newEmail" name="newEmail" placeholder="Email" required></input>
                    <input type="password" id="newPassword" name="newPassword" placeholder="Password" required></input>
                    <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" required></input>
                    <button>Hecho</button>
                </form>
            </div>
        </div>
      </>
    )
}

export default LoginSignup