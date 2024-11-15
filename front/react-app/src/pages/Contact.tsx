import logo from "../assets/img/logo3.png"
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
const Contact = () =>{

    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        message: ''
      });
      const [success] = useState(false);
      const [error] = useState(false);
    //   const navigate = useNavigate();
      const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      const handleSubmit = async (e: any) => {
        e.preventDefault();
    
    //     try {
    //       const response = await fetch('https://localhost:3000/api/contact', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(formData),
    //       });
    
    //       if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //       }
    
    //       const data = await response.json();
    //       setSuccess(true);
    //       console.log('Success:', data);
    //       setFormData({
    //         nom: '',
    //         prenom: '',
    //         email: '',
    //         message: ''
    //       });
    //       setTimeout(() => {
    //         setSuccess(false);
           
    //       }, 5000);
          
    //       // Gérez le succès, par exemple, afficher un message de confirmation
    //     } catch (error) {
    //       console.error('Error:', error);
    //       setError(true);
    //       setTimeout(() => {
    //         setError(false);
    //       }, 5000);
    //       // Gérez l'erreur, par exemple, afficher un message d'erreur
    //     }

    //     navigate('/contact'); // Redirection vers la page de confirmation de contact

      };
    
      return (
        <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <fieldset className="contents">
            <legend className="flex justify-center mb-4">
                <a href="/">
                    <img src={logo} alt="Logo" className="flex items-center w-24 h-24" />
                </a>
            </legend>
            <div className="flex flex-col gap-4 mb-4">
              <div>
                <label htmlFor="nom" className="block text-white">Nom</label>
                <input
                  type="text"
                  name="nom"
                  id="nom"
                  placeholder="Jones"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.nom}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="prenom" className="block text-white">Prénom</label>
                <input
                  type="text"
                  name="prenom"
                  id="prenom"
                  placeholder="John"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.prenom}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 mb-4">
              <div>
                <label htmlFor="email" className="block text-white">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="exemple@xyz.fr"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-white">Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  placeholder="Message....."
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Envoyer
            </button>
            {success && (
              <div className="w-full mt-3 text-green-600 bg-green-100 border border-green-400 rounded p-2 text-center">
                Votre message a bien été envoyé
              </div>
            )}
            {error && (
              <div className="w-full mt-3 text-red-600 bg-red-100 border border-red-400 rounded p-2 text-center">
                Echec d'envoi du message
              </div>
            )}
          </fieldset>
        </form>
      </div>      
      );}

export default Contact;