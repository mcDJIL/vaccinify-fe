import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import client from "../Utils/client";

export const VaccinationSpotPage = () => {

    const district = localStorage.getItem('Regional');

    const [spots, setSpots] = useState([]);

    const token = useParams();

    const vaccines = ['Sinovac', 'AstraZeneca', 'Pfizer', 'Moderna', 'Sinnopharm'];

    const [vaccinations1, setVaccinations1] = useState([]);
    const [vaccinations2, setVaccinations2] = useState([]);

    useEffect(() => {
        client.get('v1/spots', { token }).then(({data}) => {
            console.log(data.spots);
            setSpots(data.spots)
        })
    }, [token])

    useEffect(() => {
        client.get('v1/vaccinations', { token }).then(({data}) => {
            console.log(data[0].vaccinations.first);

            setVaccinations1(data[0].vaccinations.first);
            setVaccinations2(data[0].vaccinations.second);
        })
    }, [token]);

    return (
        <main>

        {vaccinations1?.vaccine?.name != null ? (

            <header class="jumbotron">
                <div class="container">
                    <h1 class="display-4">Second Vaccination</h1>
                </div>
            </header>
        ) : (
            <header class="jumbotron">
                <div class="container">
                    <h1 class="display-4">First Vaccination</h1>
                </div>
            </header>
        )}


    <div class="container mb-5">

        <div class="section-header mb-4">
            <h4 class="section-title text-muted font-weight-normal">List Vaccination Spots in {district}</h4>
        </div>

        <div class="section-body">

        {spots.map((spot) => (

                <a href={`/vaccination-spots/detail/${spot.id}`} style={spot.serve === 1 || vaccinations1?.vaccine?.name != null ? {pointerEvents: 'auto'} : spot.serve === 2 && vaccinations1?.vaccine?.name == null ? {pointerEvents: 'none'} : {pointerEvents: "auto"} }>
                    <article class={spot.serve === 1 || vaccinations1?.vaccine?.name != null ? 'spot' : spot.serve === 2 && vaccinations1?.vaccine?.name == null ? 'spot unavailable' : 'spot'} key={spot.id}>
                    <div class="row">
                        <div class="col-5">
                            <h5 class="text-primary">{spot.name}</h5>
                            <span class="text-muted">{spot.address}</span>
                        </div>
                        <div class="col-4">
                            <h5>Available vaccines</h5>
                            <span class="text-muted">{vaccines.filter((vaccine, index) => {
                                if (spot.available_vaccines[vaccine]) return vaccine;
                            }).join(', ')}</span>
                        </div>
                        <div class="col-3">
                            <h5>Serve</h5>
                            <span class="text-muted">
                            {spot.serve === 1 ? 'Only first vaccination' : spot.serve === 2 ? 'Only second vaccination' : 'Both Vaccination'}
                        </span>
                        </div>
                    </div>
                </article></a>
        ))}

        </div>

    </div>

</main>
    )
}