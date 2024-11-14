import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import AdminDashboard from "../pages/AdminDashboard/AdminDashBoard";
import EditClub from "../pages/AdminDashboard/Club/EditClub";
import Masculinprojunior from "../pages/Masculinprojunior";
import ManageSponsors from "../pages/AdminDashboard/Sponsors/ManageSponsors";
import AddSponsor from "../pages/AdminDashboard/Sponsors/AddSponsor";
import EditSponsor from "../pages/AdminDashboard/Sponsors/EditSponsor";

const router = createBrowserRouter([
    {
		path: "/",
		element: <Home />,
		// errorElement: <NotFoundPage />,
	},
    {
		path: "/admin",
		element: <AdminDashboard />,
		// errorElement: <NotFoundPage />,
	},
	{
		path: "/smj",
		element: <Masculinprojunior />,
	},
    {
		path: "/admin/edit-club",
		element: <EditClub />,
		// errorElement: <NotFoundPage />,
	},
    {
		path: "/admin/presentation",
		// element: < />,
		// errorElement: <NotFoundPage />,
	},
    {
		path: "/admin/actualites",
		// element: < />,
		// errorElement: <NotFoundPage />,
	},
    {
		path: "/admin/sponsors",
		element: <ManageSponsors />,
		// errorElement: <NotFoundPage />,
	},
    {
		path: "/admin/sponsors/add-sponsor",
		element: <AddSponsor />,
		// errorElement: <NotFoundPage />,
	},
    {
		path: "/admin/sponsors/edit-sponsor/:id",
		element: <EditSponsor />,
		// errorElement: <NotFoundPage />,
	},
    {
		path: "/admin/matches",
		// element: < />,
		// errorElement: <NotFoundPage />,
	},
    {
		path: "/admin/activate-account",
		// element: < />,
		// errorElement: <NotFoundPage />,
	},
])

export default router