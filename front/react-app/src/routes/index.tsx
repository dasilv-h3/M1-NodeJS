import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Masculinprojunior from "../pages/Masculinprojunior";
import Masculinprosenior from "../pages/Masculinprosenior";
import Femininprojunior from "../pages/Femininprojunior";
import Femininprosenior from "../pages/Femininprosenior";
import Actualite from "../pages/Actualite";
import Contact from "../pages/Contact";
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
import ProtectedRoute from "../components/ProtectedRoute";


const router = createBrowserRouter([
    {
		path: "/",
		element: <Home />,
		// errorElement: <NotFoundPage />,
	},
    {
		path: "/admin",
		element: 
		(
			<ProtectedRoute >
				<AdminDashboard />
			</ProtectedRoute>	
		),
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
		path: "/connexion",
		element: <Connexion />,
	},
	{
		path: "/inscription",
		element: <Inscription />,
	},
    {
		path: "/admin/edit-club",
		element: (
			<ProtectedRoute>	
				<EditClub />
			</ProtectedRoute>	
		),
		// errorElement: <NotFoundPage />,
	},
    {
		path: "/admin/presentation",
		// element: < />,
		// errorElement: <NotFoundPage />,
	},
    {
		path: "/admin/sponsors",
		element: 
		(<ProtectedRoute>
			<ManageSponsors />,
		</ProtectedRoute>)
		// errorElement: <NotFoundPage />,
	},
    {
		path: "/admin/sponsors/add-sponsor",
		element: (
		<ProtectedRoute>
			<AddSponsor />
		</ProtectedRoute>
		),
		// errorElement: <NotFoundPage />,
	},
    {
		path: "/admin/sponsors/edit-sponsor/:id",
		element: (
			<ProtectedRoute>
				<EditSponsor />
			</ProtectedRoute>
		),
		// errorElement: <NotFoundPage />,
	},
    {
		path: "/admin/manage-matches",
		element: (
		<ProtectedRoute>
			<ManageMatches />
		</ProtectedRoute>
		),
		// errorElement: <NotFoundPage />,
	},
    {
		path: "/admin/matches/add-match",
		element: (
			<ProtectedRoute>
				<AddMatch />
			</ProtectedRoute>
		),
		// errorElement: <NotFoundPage />,
	},
    {
		path: "/admin/matches/edit-match/:id",
		element: (
			<ProtectedRoute>
				<EditMatch />
			</ProtectedRoute>
		),
		// errorElement: <NotFoundPage />,
	},
    {
		path: "/admin/activate-account",
		// element: < />,
		// errorElement: <NotFoundPage />,
	},
])

export default router