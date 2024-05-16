import { useRef, useState } from "react";
import client from "../Utils/client";
import { sessionId, sessionName, sessionToken } from "../Constants/localStorage";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {

    const inputId = useRef();
    const inputPass = useRef();

    const nav = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');

    const login = (event) => {
        event.preventDefault();

        let body = {
            id_card_number: inputId.current.value,
            password: inputPass.current.value,
        }

        client.post('v1/auth/login', body).then(({data}) => {
            console.log(data);

            localStorage.setItem(sessionId, data.data.id);
            localStorage.setItem(sessionName, data.data.name);
            localStorage.setItem(sessionToken, data.data.login_tokens);
            localStorage.setItem('Regional', data.data.regional.district);

            nav('/dashboard');            
        }).catch((error) => {
            console.log(error);

            setErrorMessage(error.response.data.message);
        })
    }

    return (
        <main>
    <header class="jumbotron">
        <div class="container text-center">
            <h1 class="display-4">Vaccination Platform</h1>
        </div>
    </header>

    <div class="container">
        <div class="row justify-content-center">


            <div class="col-md-6">
            {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
            )}
                <form class="card card-default">
                    <div class="card-header">
                        <h4 class="mb-0">Login</h4>
                    </div>
                    <div class="card-body">
                        <div class="form-group row align-items-center">
                            <div class="col-4 text-right">ID Card Number</div>
                            <div class="col-8"><input type="text" ref={inputId} class="form-control" /></div>
                        </div>
                        <div class="form-group row align-items-center">
                            <div class="col-4 text-right">Password</div>
                            <div class="col-8"><input type="password" ref={inputPass} class="form-control" /></div>
                        </div>
                        <div class="form-group row align-items-center mt-4">
                            <div class="col-4"></div>
                            <div class="col-8"><button class="btn btn-primary" onClick={login}>Login</button></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</main>
    )
}