import { createBrowserRouter } from 'react-router-dom';
import { GuestSkin } from '../Skins/guestSkin';
import { LoginPage } from '../Pages/loginPage';
import { GuardSkin } from '../Skins/guardSkin';
import { DashboardPage } from '../Pages/dashboardPage';
import { ConsultationsPage } from '../Pages/consultationsPage';
import { VaccinationSpotPage } from '../Pages/vaccinationSpotPage';
import { SpotDetailPage } from '../Pages/spotDetailPage';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <GuestSkin />,
        children: [
            {
                path: '/',
                element: <LoginPage />
            }
        ]
    },
    {
        path: '/',
        element: <GuardSkin />,
        children: [
            {
                path: '/dashboard',
                element: <DashboardPage />
            },
            {
                path: '/consultations',
                element: <ConsultationsPage />
            },
            {
                path: '/vaccination-spots',
                element: <VaccinationSpotPage />
            },
            {
                path: '/vaccination-spots/detail/:id',
                element: <SpotDetailPage />
            },
        ]
    }
])

export default routes;