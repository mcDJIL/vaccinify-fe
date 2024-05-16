import { useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import client from "../Utils/client";

export const ConsultationsPage = () => {

    const inputDisease = useRef();
    const inputSymptoms = useRef();

    const token = useParams();

    const nav = useNavigate();

    const [successMessage, setSuccessMessage] = useState('');

    const sendRequest = (event) => {
        
        event.preventDefault();

        let body = {
            disease_history: inputDisease.current.value,
            current_symptoms: inputSymptoms.current.value,
        }

        client.post(`v1/consultations?token=${token}`, body).then(({data}) => {
            console.log(data);

            setSuccessMessage(data.message);

            setTimeout(() => {
                nav('/dashboard');
            }, 2000);
        }).catch((error) => {
            console.error(error);
        })

    }

    const [value1, setValue1] = useState(false);
    
    const handleSelected1 = (event) => {
        setValue1(event.target.value);
    }

    const [value2, setValue2] = useState(false);
    
    const handleSelected2 = (event) => {
        setValue2(event.target.value);
    } 

    return (
        <main>
    <header class="jumbotron">
        <div class="container">
            <h1 class="display-4">Request Consultation</h1>
        </div>
    </header>

    <div class="container">

        <form action="">
            <div class="row mb-4">
                <div class="col-md-6">
                    {successMessage && (
                        <div className="alert alert-success">{successMessage}</div>
                    )}

                    <div class="form-group">
                        <div class="d-flex align-items-center mb-3">
                            <label for="disease-history" class="mr-3 mb-0">Do you have disease history ?</label>
                            <select class="form-control-sm" value={value1} onChange={handleSelected1}>
                                <option value="yes">Yes, I have</option>
                                <option value="no">No</option>
                            </select>
                        </div>

                        {value1 === 'no' ? null : (
                            <textarea ref={inputDisease} id="disease-history" class="form-control" cols="30" rows="10" placeholder="Describe your disease history"></textarea>
                        )}
                    </div>
                </div>
            </div>

            <div class="row mb-4">
                <div class="col-md-6">
                    <div class="form-group">
                        <div class="d-flex align-items-center mb-3">
                            <label for="current-symptoms" class="mr-3 mb-0">Do you have symptoms now ?</label>
                            <select class="form-control-sm" value={value2} onChange={handleSelected2}>
                                <option value="yes">Yes, I have</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        {value2 === 'no' ? null : (
                            <textarea ref={inputSymptoms} id="current-symptoms" class="form-control" cols="30" rows="10" placeholder="Describe your current symptoms"></textarea>
                        )}
                    </div>
                </div>
            </div>

            <button class="btn btn-primary" onClick={sendRequest}>Send Request</button>
        </form>

    </div>

</main>

    )
}