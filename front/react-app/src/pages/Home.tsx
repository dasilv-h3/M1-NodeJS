import Navbar from "../components/Navbar";
import Presentation from "../assets/video/presentation.mp4";
// import Footer from "../components/Footer";

const Home = () => {
    return (
        <>
            <Navbar />
            <section className="relative w-full h-screen overflow-hidden">
                {/* Vidéo en plein écran */}
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover -z-10"
                    autoPlay
                    muted
                    loop
                >
                    <source src={Presentation} type="video/mp4" />
                    Votre navigateur ne supporte pas la balise vidéo.
                </video>

                {/* Bannière de bienvenue centrée */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white bg-opacity-80 text-black p-8 rounded-lg">
                        <h1 className="text-4xl font-bold">Bienvenue sur notre site</h1>
                        <p className="text-lg mt-4">Découvrez notre contenu passionnant !</p>
                    </div>
                </div>
            </section>
            <section className="text-center my-20 mx-10">
                <h1>Notre club</h1>
                <p className="pt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate numquam eligendi repellendus dolorum iusto nihil veniam unde aliquid? Voluptates repellat, quasi quibusdam impedit id doloremque similique eius dolorem officia alias.
                Neque totam culpa tempora, cumque reiciendis vero officia aliquid accusamus, ipsa doloremque facere, vel nesciunt recusandae veniam inventore nulla fugit deserunt omnis velit dignissimos consequuntur? Ipsam doloribus natus impedit quibusdam.
                Necessitatibus tenetur beatae odio, cum animi recusandae, in corporis obcaecati quod itaque nisi nulla perferendis. Officiis quidem provident nulla architecto similique enim modi. Laudantium fugiat ut excepturi, voluptatum aut alias?</p>
            </section>
        </>
    );
};

export default Home;
