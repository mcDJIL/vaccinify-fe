import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import client from "../Utils/client";

export const DashboardPage = () => {

    const token = useParams();

    const [consultations, setConsultations] = useState([]);
    const [vaccinations1, setVaccinations1] = useState([]);
    const [vaccinations2, setVaccinations2] = useState([]);

    useEffect(() => {
        client.get('v1/consultations', { token }).then(({data}) => {
            console.log(data.consultations);
            setConsultations(data.consultations);
        }).catch((error) => {
            console.error(error);
        })
    }, [token]);

    useEffect(() => {
        client.get('v1/vaccinations', { token }).then(({data}) => {
            console.log(data[0].vaccinations.first);

            setVaccinations1(data[0].vaccinations.first);
            setVaccinations2(data[0].vaccinations.second);
        })
    }, [token]);

    return (
        <main>
    <header class="jumbotron">
        <div class="container">
            <h1 class="display-4">Dashboard</h1>
        </div>
    </header>

    <div class="container">

        <section class="consultation-section mb-5">
            <div class="section-header mb-3">
                <h4 class="section-title text-muted">My Consultation</h4>
            </div>
            <div class="row">

                {consultations.length <= 0 ? (

                    <div class="col-md-4">
                        <div class="card card-default">
                            <div class="card-header">
                                <h5 class="mb-0">Consultation</h5>
                            </div>
                            <div class="card-body">
                                <a href={'/consultations'}>+ Request consultation</a>
                            </div>
                        </div>
                    </div>
                ) : null}

                        {consultations.length > 0 ? (
                            consultations.map((consultations) => (

                                <div class="col-md-4">
                                    <div class="card card-default">
                                        <div class="card-header border-0">
                                            <h5 class="mb-0">Consultation</h5>
                                        </div>
                                        <div class="card-body p-0">
                                            <table class="table table-striped mb-0">
                                                <tr>
                                                    <th>Status</th>
                                                    <td>
                                                        {consultations.status === 'accepted' ? (
                                                            <span class="badge badge-success">{consultations.status}</span>
                                                        ) : consultations.status === 'declined' ? (
                                                            <span class="badge badge-danger">{consultations.status}</span>
                                                        ) : (
                                                            <span class="badge badge-info">{consultations.status}</span>
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Disease History</th>
                                                    <td class="text-muted">{consultations.disease_history}</td>
                                                </tr>
                                                <tr>
                                                    <th>Current Symptoms</th>
                                                    <td class="text-muted">{consultations.current_symptoms}</td>
                                                </tr>
                                                <tr>
                                                    <th>Doctor Name</th>
                                                    <td class="text-muted">{consultations?.doctor?.name ?? '-'}</td>
                                                </tr>
                                                <tr>
                                                    <th>Doctor Notes</th>
                                                    <td class="text-muted">{consultations?.doctor_notes ?? '-'}</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : null}

            </div>
        </section>

        <section class="consultation-section mb-5">
            <div class="section-header mb-3">
                <h4 class="section-title text-muted">My Vaccinations</h4>
            </div>
            <div class="section-body">
                <div class="row mb-4">

                    {consultations.map((consultation) => (
                        consultation.status === undefined ? (

                        <div class="col-md-12">
                            <div class="alert alert-warning">
                                Your consultation must be approved by doctor to get the vaccine.
                            </div>
                        </div>
                        ) : consultation.status === 'pending' ? (
                            <div class="col-md-12">
                            <div class="alert alert-warning">
                                Your consultation must be approved by doctor to get the vaccine.
                            </div>
                        </div>
                        ) : consultation.status === 'declined' ? (
                            <div class="col-md-12">
                            <div class="alert alert-warning">
                                Your consultation must be approved by doctor to get the vaccine.
                            </div>
                        </div>
                        ) : null
                    ))}

                    {consultations.map((consul) => (
                            consul.status === 'accepted' ? (
                                vaccinations1 === null ? (
                                    <div class="col-md-4">
                                    <div class="card card-default">
                                        <div class="card-header border-0">
                                            <h5 class="mb-0">First Vaccination</h5>
                                        </div>
                                        <div class="card-body">
                                            <a href={'/vaccination-spots'}>+ Register vaccination</a>
                                        </div>
                                    </div>
                                </div> 
                                ) : null
                            ) : null
                        ))
                    }

                    {vaccinations1?.date != null ? (

                        <div class="col-md-4">
                            <div class="card card-default">
                                <div class="card-header border-0">
                                    <h5 class="mb-0">First Vaccination</h5>
                                </div>
                                <div class="card-body p-0">
                                    <table class="table table-striped mb-0">
                                        <tr>
                                            <th>Status</th>
                                            <td class="text-muted">

                                                {vaccinations1?.vaccine?.name != null ? (
                                                    <span class="badge badge-success">Done</span>
                                                ) : (
                                                    <span class="badge badge-info">Registered</span>
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Date</th>
                                            <td class="text-muted">{vaccinations1?.date}</td>
                                        </tr>
                                        <tr>
                                            <th>Spot</th>
                                            <td class="text-muted">{vaccinations1?.spot?.name}</td>
                                        </tr>
                                        <tr>
                                            <th>Vaccine</th>
                                            <td class="text-muted">{vaccinations1?.vaccine?.name ?? '-'}</td>
                                        </tr>
                                        <tr>
                                            <th>Vaccinator</th>
                                            <td class="text-muted">{vaccinations1?.vaccinator?.name ?? '-'}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ) : null}

                </div>

                <div class="row">

                    {vaccinations1?.vaccine?.name != null ? (
                        vaccinations2?.date == null ? (
                            <div class="col-md-4">
                                <div class="card card-default">
                                    <div class="card-header border-0">
                                        <h5 class="mb-0">Second Vaccination</h5>
                                    </div>
                                    <div class="card-body">
                                        <a href={'/vaccination-spots'}>+ Register vaccination</a>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    ) : null}

                    {vaccinations2?.date != null ? (

                        <div class="col-md-4">
                            <div class="card card-default">
                                <div class="card-header border-0">
                                    <h5 class="mb-0">Second Vaccination</h5>
                                </div>
                                <div class="card-body p-0">
                                    <table class="table table-striped mb-0">
                                        <tr>
                                            <th>Status</th>
                                            <td class="text-muted">
                                                {vaccinations2?.vaccine?.name != null ? (
                                                    <span class="badge badge-success">Done</span>
                                                ) : (
                                                    <span class="badge badge-info">Registered</span>
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Date</th>
                                            <td class="text-muted">{vaccinations2?.date}</td>
                                        </tr>
                                        <tr>
                                            <th>Spot</th>
                                            <td class="text-muted">{vaccinations2?.spot?.name ?? '-'}</td>
                                        </tr>
                                        <tr>
                                            <th>Vaccine</th>
                                            <td class="text-muted">{vaccinations2?.vaccine?.name ?? '-'}</td>
                                        </tr>
                                        <tr>
                                            <th>Vaccinator</th>
                                            <td class="text-muted">{vaccinations2?.vaccinator?.name ?? '-'}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        
                    ) : null}

                </div>

            </div>
        </section>

    </div>

</main>
    )
}