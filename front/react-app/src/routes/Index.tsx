import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Masculinprojunior from "../pages/Masculinprojunior";
import Masculinprosenior from "../pages/Masculinprosenior";
import Femininprojunior from "../pages/Femininprojunior";
import Femininprosenior from "../pages/Femininprosenior";
import Actualite from "../pages/Actualite";
import Contact from "../pages/Contact";
import Administration from "../pages/Administration";
import Connexion from "../pages/Connexion";
import Inscription from "../pages/Inscription";
import AdminDashboard from "../pages/AdminDashboard/AdminDashBoard";
import EditClub from "../pages/AdminDashboard/Club/EditClub";
import ManageSponsors from "../pages/AdminDashboard/Sponsors/ManageSponsors";
import AddSponsor from "../pages/AdminDashboard/Sponsors/AddSponsor";
import EditSponsor from "../pages/AdminDashboard/Sponsors/EditSponsor";
import ManageMatches from "../pages/AdminDashboard/Match/ManageMatches";
import AddMatch from "../pages/AdminDashboard/Match/AddMatch";
import EditMatch from "../pages/AdminDashboard/Match/EditMatch";

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
		path: "/sms",
		element: <Masculinprosenior />,
	},
	{
		path: "/sfj",
		element: <Femininprojunior />,
	},
	{
		path: "/sfs",
		element: <Femininprosenior />,
	},
	{
		path: "/actualite",
		element: <Actualite />,
	},
	{
		path: "/contact",
		element: <Contact />,
	},
	{
		path: "/administration",
		element: <Administration />,
	},
	{
		path: "/connexion",
		element: <Connexion />,
	},
	{
		path: "/inscription",
		element: <Inscription />,
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
		path: "/admin/manage-matches",
		element: <ManageMatches />,
		// errorElement: <NotFoundPage />,
	},
    {
		path: "/admin/matches/add-match",
		element: <AddMatch />,
		// errorElement: <NotFoundPage />,
	},
    {
		path: "/admin/matches/edit-match/:id",
		element: <EditMatch />,
		// errorElement: <NotFoundPage />,
	},
    {
		path: "/admin/activate-account",
		// element: < />,
		// errorElement: <NotFoundPage />,
	},
])

export default router