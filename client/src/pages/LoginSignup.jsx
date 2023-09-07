import { useState } from 'react';
import '../assets/css/LoginSignup.css'
import MoonAnimation from '../components/MoonAnimation.jsx'
import axios from 'axios'

function LoginSignup() {
    const [email, setEmail] = useState("");    //para login
    const [password, setPassword] = useState("");   //para login

    async function login(){ //funcion para el login
        const loginInfo = {email: email, password: password};

        //CON AXIOS
        const config = 
        {
            method: "POST",
            url: "/api/v1/users/auth", //url de la api
            headers:{"Content-Type": "aplication/json"},
            body:JSON.stringify({loginInfo})
        }

        // console.log("email" + email);
        // console.log("contrasena" + password);

        const response = await axios(config);

        //CON METODO FETCH
        // const config = 
        // {
        //     method: "POST",
        //     headers:{"Content-Type": "aplication/json"},
        //     body:JSON.stringify({loginInfo})
        // }

        // // console.log("email" + email);
        // // console.log("contrasena" + password);

        // const response = await fetch ("http://localhost:5173/login", config);
    }

    return (
      <>
        <MoonAnimation/>
        <div className="main col-4">
            <input type="checkbox" id="chk" aria-hidden="true"></input>
            <div className="login">
                <form>
                    <label htmlFor="chk" aria-hidden="true">Inicia sesión</label>
                    <input type="email" name="email" placeholder="Email" required onChange={()=>{setEmail(event.target.value)}}></input>
                    {/* Checar porque la palabra event esta tachada. "Event is decrepated"*/}
                    <input type="password" name="password" placeholder="Password" required onChange={()=>{setPassword(event.target.value)}}></input>
                    <button onClick={login()}>Acceder</button> {/*Llamamos a la funcion login*/}
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