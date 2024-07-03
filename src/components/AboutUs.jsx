import Footer from './Footer';
import Navbar from './Navbar';
import pic1 from '../assets/manhajjj.png';
import pic2 from '../assets/manhajjj2.png';
import { Link } from 'react-router-dom';

export default function AboutUs() {
    return (
        <>
            <Navbar />
            <div className="bg-background text-foreground p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col justify-center">
                        <h2 className="text-secondary text-lg">Découvrez notre plateforme éducative</h2>
                        <h1 className="text-4xl font-bold mb-4">Manhaj : Votre guide vers l'excellence académique</h1>
                        <p className="text-muted-foreground mb-4">Manhaj représente bien plus qu'une simple plateforme d'e-learning. C'est un environnement conçu pour faciliter l'apprentissage des étudiants marocains, en offrant des ressources pédagogiques de qualité et un soutien personnalisé à chaque étape de leur parcours éducatif.</p>
                        <p className="text-muted-foreground">Notre mission est d'accompagner chaque étudiant dans son développement académique, en cultivant un environnement favorable à l'apprentissage continu et à l'épanouissement personnel.</p>
                    </div>
                    <div>
                        <img src={pic1} alt="Illustration de Manhaj" className="rounded-lg shadow-lg" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                    <div>
                        <img src={pic2} alt="Illustration de confort et de relaxation" className="rounded-lg shadow-lg" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="text-4xl font-bold mb-4">Confort et apprentissage sans stress</h1>
                        <p className="text-muted-foreground mb-4">Chez Manhaj, nous croyons que l'apprentissage efficace va de pair avec le confort et la tranquillité d'esprit. C'est pourquoi nous mettons tout en œuvre pour créer un environnement d'étude où chaque étudiant peut se concentrer pleinement sur ses objectifs académiques, tout en profitant d'une expérience d'apprentissage enrichissante et sans stress.</p>
                        <Link to="/Cours" className="block max-w-[780px] w-full mx-auto">DÉCOUVRIR NOS COURS</Link>
                        </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
