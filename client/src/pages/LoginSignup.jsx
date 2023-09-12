import { useState } from 'react';
import '../assets/css/LoginSignup.css'
import MoonAnimation from '../components/MoonAnimation.jsx'
import axios from 'axios'
import { z } from "zod"
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';

function LoginSignup() {
    const [email, setEmail] = useState("");    //para login
    const [password, setPassword] = useState("");   //para login
    const [errors, setErrors] = useState({});


    const loginValidator = z.object({
        email: z
            .string()
            .trim()
            .min(1, { message: 'El campo email debe tener al menos 1 caracter.' })
            .max(255, { message: 'El campo email no debe tener más de 255 caracteres.' }),
        password: z
            .string()
            .trim()
            .min(1, { message: 'El campo password debe tener al menos 1 caracter.' })
            .max(255, { message: 'El campo password no debe tener más de 255 caracteres.' }),
    });


    async function login() { //funcion para el login
        const loginInfo = { email: email, password: password };

        // Validar los datos utilizando Zod
        const validationResult = loginValidator.safeParse(loginInfo);

        if (!validationResult.success) {
            // Manejar errores de validación aquí
            const validationErrors = {};

            validationResult.error.issues.forEach((issue) => {
                validationErrors[issue.path.join('.')] = issue.message;
            });

            setErrors(validationErrors);
            // console.log("Aquí hupo algo")
            // console.error(validationResult.error);
            return;
        }
        // Restablece los errores si la validación es exitosa
        setErrors({});

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
            // console.log(response.data.message);

            Swal.fire({
                icon: "success",
                title: response.data.message,
                confirmButtonText: 'Continuar',
            })

        } catch (error) {
            // Manejar errores aquí
            // console.error(error.response.data.message);

            Swal.fire({
                icon: "error",
                title: error.response.data.message,
                confirmButtonText: 'Aceptar',
            })
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
            <div className='row mybody-loginsignup'>
                <MoonAnimation />
                <div className="main col-4">
                    <button className="btnBack" type="button"><Link to="/" className='link-style'>X</Link></button>
                    <input type="checkbox" id="chk" aria-hidden="true"></input>
                    <div className="login">
                        <form>
                            <label htmlFor="chk" aria-hidden="true">Inicia sesión</label>
                            <div className="input-container">
                                <input type="email" name="email" placeholder="Email" required onChange={(event) => { setEmail(event.target.value) }}></input>
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>
                            <div className="input-container">
                                <input type="password" name="password" placeholder="Password" required onChange={(event) => { setPassword(event.target.value) }}></input>
                                {errors.password && <span className="error-message">{errors.password}</span>}
                            </div>
                            <button type="button" className="loginBtn" onClick={() => { login() }}>Acceder</button> {/*Llamamos a la funcion login*/}
                        </form>
                    </div>
                    <div className="signup">
                        <form>
                            <label htmlFor="chk" aria-hidden="true">Regístrate</label>
                            <input type="text" id="newUsername" name="newUsername" placeholder="Username" required></input>
                            <input type="email" id="newEmail" name="newEmail" placeholder="Email" required></input>
                            <input type="password" id="newPassword" name="newPassword" placeholder="Password" required></input>
                            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" required></input>
                            <button type="button" className="registerBtn">Hecho</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginSignup