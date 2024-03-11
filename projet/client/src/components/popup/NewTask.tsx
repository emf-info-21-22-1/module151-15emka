import { motion } from "framer-motion";
import {useState} from "react";
import {createTask} from "@/httpServices.ts";
import {useParams} from "react-router-dom";

const NewTask: React.FC<{ onClose: () => void }> = ({ onClose }) => {

    const { id } = useParams<{ id: string }>();

    // Définir les états pour les valeurs du formulaire
    const [title, setTitle] = useState<string>('');

    // Gérer la soumission du formulaire
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!title){
            alert('Veuillez remplir un titre pour votre projet');
        } else {
            try {
                const taskCreate = await createTask(title, id);
                if (taskCreate){
                    alert('Votre tâche à été créée.');
                    window.location.reload();
                } else {
                    alert('Un problème est survenu lors de la création de la tâche. Veuillez réessayer.');
                }
            } catch (error) {
                console.error('Erreur lors de la création de la tâche : ', error);
                alert('Un problème est survenu lors de la création de la tâche (try). Veuillez réessayer.');
            }
            // Réinitialiser les champs du formulaire après la soumission
            setTitle('');
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-30 backdrop-blur-md">
            <motion.div
                className="bg-white border-2 border-black h-2/4 w-2/6 rounded-lg shadow-lg flex flex-col justify-center p-8 relative"
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
                    <h1 className="text-4xl font-medium">New Task</h1>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div>

                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Title"
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
                            Create
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default NewTask;
