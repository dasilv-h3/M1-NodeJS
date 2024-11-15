// import { useAuth } from "../context/AuthContext";

// const ProtectedComponent: React.FC = () => {
//   const { token } = useAuth();

//   const fetchData = async () => {
//     const response = await fetch("http://localhost:3000/protected-route", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`, // Ajout du token dans les headers
//       },
//     });

//     const data = await response.json();
//     console.log(data);
//   };

//   // Appeler fetchData() lorsque vous en avez besoin dans le composant

//   return <div>Contenu Protégé</div>;
// };

// export default ProtectedComponent;