import { Navigate, Outlet, useNavigate, useParams } from "react-router-dom"
import { sessionId, sessionName, sessionToken } from "../Constants/localStorage"
import client from "../Utils/client";

export const GuardSkin = () => {

    const name = localStorage.getItem(sessionName);
    
    const nav = useNavigate();

    const token = useParams();

    if (localStorage.getItem(sessionToken) == null) {
        return <Navigate to={'/'} />
    }

    const logout = () => {
        client.post('v1/auth/logout', { token }).then(({data}) => {
            console.log(data)

            localStorage.removeItem(sessionId);
            localStorage.removeItem(sessionName);
            localStorage.removeItem(sessionToken);

            nav('/');
        })
    }

    return (
        <div className="">
            <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
    <div class="container">
        <a class="navbar-brand" href="#">Vaccination Platform</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul class="navbar-nav ml-auto">
                <li>
                    <a class="nav-link" href="#">{name}</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" onClick={logout} href="#">Logout</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<Outlet />
        </div>
    )
}