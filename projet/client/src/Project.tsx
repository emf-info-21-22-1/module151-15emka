import {TableTasks} from "@/components/TableTasks";
import {Post} from "@/components/Post";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import NewPost from "@/components/popup/NewPost";
import {getListTasks, getProject} from "@/httpServices.ts";
import NewTask from "@/components/popup/NewTask.tsx";

function Project(){

    const posts = [
        {
            username: "MichMich",
            datePub: "01.03.2024",
            comments: "Hey les dougs comment ça va à tous les petits bolides !"
        },
        {
            username: "Bernard",
            datePub: "01.03.2024",
            comments: "Hey les dougs comment ça va à tous les petits bolides !"
        },
        {
            username: "Romarin",
            datePub: "01.03.2024",
            comments: "Hey les dougs comment ça va à tous les petits bolides !"
        },
        {
            username: "Emka",
            datePub: "01.03.2024",
            comments: "Hey les dougs comment ça va à tous les petits bolides !"
        },
        {
            username: "Coco",
            datePub: "01.03.2024",
            comments: "Hey les dougs comment ça va à tous les petits bolides !"
        }
    ];

    interface ProjectData {
        pk_project: number;
        title: string;
        description: string;
    }

    const { id } = useParams<{ id: string }>();
    const [projectData, setProjectData] = useState<ProjectData | null>(null);
    const [listTasks, setlistTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const project = await getProject(id);
                if (project != null) {
                    setProjectData(project);
                    const tasks = await getListTasks(id);
                    if (tasks != null) {
                        setlistTasks(tasks);
                    } else {
                        console.error("Une erreur est survenue au chargement des tâches.");
                    }
                } else {
                    console.error("Une erreur est survenue au chargement du projet.");
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchData();
    }, []);

    const navigate = useNavigate();
    const handleCellClick = () => {
        navigate(`/ProjectHome`);
    };

    const [showPopupNewPost, setshowPopupNewPost] = useState(false);
    const [showPopupNewTask, setshowPopupNewTask] = useState(false);
    function togglePopupNewPost() {
        setshowPopupNewPost(!showPopupNewPost);
    }
    function togglePopupNewTask() {
        setshowPopupNewTask(!showPopupNewTask);
    }

    return(
        <>
            <div className="h-screen w-full flex justify-center py-12">
            <div className="flex flex-col h-[37rem] w-5/6">
                <div className="flex flex-row pb-8 items-center">
                    <h1 className="text-2xl font-medium right-0 basis-5/6">PEC</h1>
                    <div className="basis-1/6 text-right">
                    <button
                        className="bg-white hover:bg-gray-100 text-white font-bold py-2 px-4 rounded-lg"
                        onClick={handleCellClick}
                    >
                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="#000000"></path></svg>
                    </button>
                    </div>
                </div>
                <div className="flex flex-row w-full h-full">
                    <div className="flex flex-col basis-7/12 space-y-2 pr-4">
                        <h1 className="text-4xl font-medium">{projectData ? projectData.title : 'Chargement en cours...'}</h1>
                        <h2 className="text-xl">{projectData ? projectData.description : 'Chargement en cours...'}</h2>
                        <div className="pb-8">
                        <button className="bg-gray-400 py-1 px-7 w-1/5 text-white text-sm rounded-lg" onClick={togglePopupNewPost}>
                            New Post
                        </button>
                        </div>
                        <div className="w-full bg-white drop-shadow-lg rounded-xl px-5 py-1 border-gray-50 border-2 flex flex-row items-center">
                            <p className="font-medium">Your Tasks</p>
                            <button className="bg-green-400 py-1 px-5 text-white text-sm rounded-lg absolute right-1" onClick={togglePopupNewTask}>
                                New Tasks
                            </button>
                        </div>
                        <div className="h-full w-full rounded-xl p-5 drop-shadow-md bg-white overflow-auto">
                            {listTasks.length > 0 ? (
                                <TableTasks tasks={listTasks}/>
                            ) : (
                                <p>Aucune tâche à afficher</p>
                            )}
                        </div>
                    </div>
                    <div className="basis-5/12 pl-4 border-l-4 border-gray-400 overflow-auto">
                        <Post posts={posts}/>
                    </div>
                </div>
            </div>
            </div>
            {showPopupNewPost && <NewPost onClose={() => setshowPopupNewPost(false)} />}
            {showPopupNewTask && <NewTask onClose={() => setshowPopupNewTask(false)} />}
        </>
    );
}
export default Project;