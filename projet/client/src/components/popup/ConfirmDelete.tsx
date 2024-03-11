import { motion } from "framer-motion";

const ConfirmDelete: React.FC<{ onClose: () => void }> = ({ onClose }) => {

    // Gérer la soumission du formulaire
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        window.location.reload();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-30 backdrop-blur-md">
            <motion.div
                className="bg-white border-2 border-black h-3/4 w-3/6 rounded-lg shadow-lg flex flex-col justify-center p-8 relative"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
            >
                <div className="absolute top-0 right-0 m-2">
                </div>
                <div className="flex flex-col space-y-12">
                    <h1 className="text-4xl font-medium">Delete</h1>
                    <p>Are sure you want delete ?</p>
                    <div className="flex flex-row space-x-5">
                        <motion.button
                            className="bg-white border-2 border-black py-3 w-2/5 rounded-xl"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            onClick={onClose}
                        >
                            Cancel
                        </motion.button>
                        <motion.button
                            className="bg-black w-2/5 text-white rounded-xl"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            onClick={handleSubmit}
                        >
                            Delete
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ConfirmDelete;
