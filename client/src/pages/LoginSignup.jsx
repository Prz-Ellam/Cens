import { useState } from 'react';
import '../assets/css/LoginSignup.css'
import MoonAnimation from '../components/MoonAnimation.jsx'
import axios from 'axios'

function LoginSignup() {
    const [email, setEmail] = useState("");    //para login
    const [password, setPassword] = useState("");   //para login

    async function login() { //funcion para el login
        const loginInfo = { email: email, password: password };

        // Configuración de axios para la solicitud POST
        const config = {
            method: "POST",
            url: "/api/v1/auth", // URL de la API
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify(loginInfo), // En lugar de { loginInfo }
        };

        try {
            const response = await axios(config);
            // Manejar la respuesta exitosa aquí
            console.log(response.data);
        } catch (error) {
            // Manejar errores aquí
            console.error(error);
        }


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
            <MoonAnimation />
            <div className="main col-4">
                <input type="checkbox" id="chk" aria-hidden="true"></input>
                <div className="login">
                    <form>
                        <label htmlFor="chk" aria-hidden="true">Inicia sesión</label>
                        <input type="email" name="email" placeholder="Email" required onChange={(event) => { setEmail(event.target.value) }}></input>
                        <input type="password" name="password" placeholder="Password" required onChange={(event) => { setPassword(event.target.value) }}></input>
                        <button type="button" onClick={() => { login() }}>Acceder</button> {/*Llamamos a la funcion login*/}
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