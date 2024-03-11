import {useEffect, useState} from "react";
import NewProject from "./components/popup/NewProject";
import {TableProjects} from "@/components/TableProjects";
import {getListProjects, logout} from "@/httpServices.ts";
import {useNavigate} from "react-router-dom";

function ProjectHome(){

    const [showPopupNewProject, setshowPopupNewProject] = useState(false);
    function togglePopupNewProject() {
        setshowPopupNewProject(!showPopupNewProject);
    }

    const [yourProjects, setyourProjects] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projects = await getListProjects();
                setyourProjects(projects);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchData();
    }, []);

    const otherProjects = [
        {
            pk: 1,
            title: "Projet 1",
            description: "Vous participer au projet 1"
        },
        {
            pk: 2,
            title: "Projet 2",
            description: "Vous participer au projet 2"
        },
        {
            pk: 3,
            title: "Projet 2",
            description: "Vous participer au projet 3"
        }
    ];
    const navigate = useNavigate();

    const handleClick = () => {
        const fetchData = async () => {
            try {
                const result = await logout();
                if (result.logoutOk) {
                    navigate('/');
                } else {
                    console.error("Le logout n'a pas pu se faire");
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchData();
    };

    return(
        <>
            <div className="flex justify-center h-full p-20 bg-white">
                <div className="flex flex-col items-center w-full space-y-12">
                    <div className="flex flex-row items-center w-2/3">
                        <h1 className="basis-1/2 text-2xl font-medium right-0">PEC</h1>
                        <div className="basis-1/2 text-right">
                            <button
                                className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-lg"
                                onClick={handleClick}
                            >
                                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M12 12H19M19 12L16 15M19 12L16 9" stroke="#000000"></path><path d="M19 6V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V18" stroke="#000000"></path></svg>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-3 w-2/3">
                    <div className="w-full bg-white drop-shadow-lg rounded-xl px-7 py-3 border-gray-50 border-2 flex flex-row">
                        <p className="font-medium">Your Projects</p>
                        <button className="bg-green-400 py-1 px-7 text-white text-sm rounded-lg absolute right-7" onClick={togglePopupNewProject}>
                            New Project
                        </button>
                    </div>
                    <div className="h-80 w-full rounded-xl p-5 drop-shadow-md bg-white overflow-auto">
                        <TableProjects projects={yourProjects} owner={true}/>
                    </div>
                    </div>

                    <div className="flex flex-col space-y-3 w-2/3">
                    <div className="w-full bg-white drop-shadow-lg rounded-xl px-7 py-3 border-gray-50 border-2">
                        <p className="font-medium">The projects you are part of</p>
                    </div>
                    <div className="h-80 w-full rounded-xl p-5 drop-shadow-md bg-white">
                        <TableProjects projects={otherProjects} owner={false}/>
                    </div>
                    </div>
                </div>
            </div>
            {showPopupNewProject && <NewProject onClose={() => setshowPopupNewProject(false)} />}
        </>
    );
}

export default ProjectHome;