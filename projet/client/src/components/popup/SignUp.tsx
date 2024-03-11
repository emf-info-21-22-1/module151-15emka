import { motion } from "framer-motion";
import {useState} from "react";
import {createAccount} from "@/httpServices.ts";

const SignUp: React.FC<{ onClose: () => void }> = ({ onClose }) => {

    // Définir les états pour les valeurs du formulaire
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirm_password, setConfirmPassword] = useState<string>('');

    // Gérer la soumission du formulaire
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
            if (!username || !email || !password || !confirm_password){
                alert('Veuillez remplir tous les champs.');
            } else {
                if (password != confirm_password) {
                    alert('Veuillez entrer deux fois le même mot de passe.');
                    setConfirmPassword('');
                } else {
                    try {
                        const accountCreate = await createAccount(username, email, password);
                        if (accountCreate){
                            alert('Compte créé !');
                            window.location.reload();
                        } else {
                            alert('Un problème est survenu lors de la création du compte.');
                        }
                        // Réinitialiser les champs du formulaire après la soumission
                        setUsername('');
                        setEmail('');
                        setPassword('');
                        setConfirmPassword('');
                    } catch (error) {
                        console.error("Erreur lors de la tantive de création d'un compte :", error);
                        alert('Une erreur est survenue lors de la création du compte. Veuillez réessayer.');
                    }
                }
            }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-30 backdrop-blur-md">
            <motion.div
                className="bg-white border-2 border-black h-3/4 w-2/6 rounded-lg shadow-lg flex flex-col justify-center p-8 relative"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
            >
                    <div className="absolute top-0 right-0 m-2">
                        <button
                            className="bg-white hover:bg-gray-100 text-white font-bold py-2 px-4 rounded-lg"
                            onClick={onClose}
                        >
                            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="#000000"></path></svg>
                        </button>
                    </div>
                    <div className="flex flex-col space-y-12">
                        <h1 className="text-4xl font-medium">Sign Up</h1>
                            <form onSubmit={handleSubmit} className="space-y-3">
                                <div>

                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Username"
                                            className="border-2 border-gray-400 rounded-lg p-2 w-full focus:outline-none focus:border-black"
                                        />

                                </div>
                                <div>

                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email"
                                            className="border-2 border-gray-400 rounded-lg p-2 w-full focus:outline-none focus:border-black"
                                        />

                                </div>
                                <div>

                                        <input
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password"
                                            className="border-2 border-gray-400 rounded-lg p-2 w-full focus:outline-none focus:border-black"
                                        />

                                </div>
                                <div>

                                        <input
                                            value={confirm_password}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirm password"
                                            className="border-2 border-gray-400 rounded-lg p-2 w-full focus:outline-none focus:border-black"
                                        />

                                </div>
                            </form>
                        <div className="flex justify-end">
                            <motion.button
                                className="bg-black px-12 py-3 w-2/5 text-white rounded-xl"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                onClick={handleSubmit}
                            >
                                Sign Up
                            </motion.button>
                        </div>
                    </div>
            </motion.div>
        </div>
    );
};

export default SignUp;
