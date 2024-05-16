import { useEffect, useRef, useState } from "react"
import client from "../Utils/client"
import { useNavigate, useParams } from "react-router-dom"

export const SpotDetailPage = () => {

    const { id } = useParams();
    const nav = useNavigate();
    const token = useParams();

    const [details, setDetails] = useState({});

    const [successMessage, setSuccessMessage] = useState();
    const [errorMessage, setErrorMessage] = useState();

    const inputDate = useRef(); 

    useEffect(() => {
        client.get(`v1/spots/${id}`, { token }).then(({data}) => {
            console.log(data.spot);
            setDetails(data.spot);
        }).catch((error) => {
            console.error(error);
        })
    }, [id, token]);

    const register = (e) => {
        e.preventDefault();

        let body = {
            date: inputDate.current.value,
            spot_id: details.id
        };

        client.post(`v1/vaccinations?token=${token}`, body).then(({data}) => {
            console.log(data);

            setSuccessMessage(data.message);

            setInterval(() => {
                nav('/dashboard')
            }, 2000)
        }).catch((error) => {
            console.error(error);

            setErrorMessage(error.response.data.message);
        })
    }

    return (
        <main>
    <header class="jumbotron">
        <div class="container d-flex justify-content-between align-items-center">
            <div>
                <h1 class="display-4">{details.name}</h1>
                <span class="text-muted">{details.address}</span>
            </div>
            <a onClick={register} href="" class="btn btn-primary">Register vaccination</a>
        </div>
    </header>

    <div class="container">

        <div class="row mb-3">
            <div class="col-md-3">

                {successMessage && (
                    <div className="alert alert-success">{successMessage}</div>
                )}

                {errorMessage && (
                    <div className="alert alert-danger">{errorMessage}</div>
                )}

                <div class="form-group">
                    <label for="vaccination-date">Select vaccination date</label>
                    <input ref={inputDate} type="date" class="form-control" id="vaccination-date" />
                </div>
            </div>
        </div>

    </div>

</main>
    )
}