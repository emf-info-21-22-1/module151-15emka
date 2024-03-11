import { motion } from "framer-motion";
import {useState} from "react";
import {Switch} from "@/components/ui/Switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select";


const NewPost: React.FC<{ onClose: () => void }> = ({ onClose }) => {

    // Définir les états pour les valeurs du formulaire
    const [title, setTitle] = useState<string>('');
    const [comments, setComments] = useState<string>('');
    const [selectedTask, setSelectedTask] = useState<string>('');

    // Gérer la soumission du formulaire
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Vous pouvez ajouter ici la logique pour envoyer les données du formulaire
        console.log('Formulaire soumis :', { title, comments, selectedTask });
        // Réinitialiser les champs du formulaire après la soumission
        setTitle('');
        setComments('');
        setSelectedTask('');
        onClose();
    };

    const [isChecked, setChecked] = useState(false)

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
                <div className="flex flex-col space-y-8">
                    <h1 className="text-4xl font-medium pb-4">New Post</h1>
                    <div className="flex items-center space-x-2 h-12">
                        <Switch id="affect-task" checked={isChecked} onCheckedChange={setChecked}/>
                        <label htmlFor="affect-task">Affect to task</label>
                        {isChecked && (
                            <Select>
                                <SelectTrigger className="w-[230px]">
                                    <SelectValue placeholder="Tasks" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem
                                        value='Task1'
                                        onSelect={() => setSelectedTask('Task1')}
                                    >Tâche 1</SelectItem>
                                    <SelectItem
                                        value='Task2'
                                        onSelect={() => setSelectedTask('Task2')}
                                    >Tâche 2</SelectItem>
                                    <SelectItem
                                        value='Task3'
                                        onSelect={() => setSelectedTask('Task3')}
                                    >Tâche 3</SelectItem>
                                </SelectContent>
                            </Select>

                        )}
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div>

                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Title"
                                className="border-2 border-gray-400 rounded-lg p-2 w-full focus:outline-none focus:border-black"
                            />

                        </div>
                        <div className="h-[180px]">

                            <textarea
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                placeholder="Comments"
                                className="border-2 border-gray-400 rounded-lg p-2 h-full w-full focus:outline-none focus:border-black"
                                style={{ resize: 'none' }}
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

export default NewPost;
