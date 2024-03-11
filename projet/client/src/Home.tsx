import { motion } from "framer-motion";
import {useState} from "react";
import SignUp from "./components/popup/SignUp";
import SignIn from "./components/popup/SignIn";

function Home(){

    const [showPopupSignUp, setShowPopupSignUp] = useState(false);
    const [showPopupSignIn, setShowPopupSignIn] = useState(false);

    function togglePopupSignUp() {
        setShowPopupSignUp(!showPopupSignUp);
    }
    function togglePopupSignIn() {
        setShowPopupSignIn(!showPopupSignIn);
    }

    return(
        <>
            <div className="h-screen flex justify-center items-center" style={{backgroundImage: `url('/151/client/bg.svg')`}}>
            <div className="h-3/4 w-3/4 grid grid-cols-2">
                <div className="flex flex-col space-y-12">
                    <div className="">
                        <h1 className="font-bold text-9xl pb-3">PEC</h1>
                        <h2 className="font-medium text-2xl">Create your project or event and improve it through collaboration</h2>
                    </div>
                    <div className="flex flex-row space-x-5">
                        <motion.button
                            className="bg-black px-12 py-3 text-white rounded-xl"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            onClick={togglePopupSignUp}
                        >
                            Sign Up
                        </motion.button>
                        <motion.button
                            className="bg-white px-12 py-3 rounded-xl border-2 border-black"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            onClick={togglePopupSignIn}
                        >
                            Sign In
                        </motion.button>
                    </div>
                </div>

                <div className="flex justify-center items-center">
                    <motion.img
                        src="/151/client/3dPc.svg"
                        alt="PC en 3d"
                        className="w-80 h-80"
                        drag
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        dragTransition={{ bounceStiffness: 500, bounceDamping: 20, }}
                        dragElastic={1}
                    />
                </div>
            </div>
            </div>
            {showPopupSignUp && <SignUp onClose={() => setShowPopupSignUp(false)} />}
            {showPopupSignIn && <SignIn onClose={() => setShowPopupSignIn(false)} />}
        </>
    );
}
export default Home