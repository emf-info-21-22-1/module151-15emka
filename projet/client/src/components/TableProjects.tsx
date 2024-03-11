import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/Table";
import {useState} from "react";
import ConfirmDelete from "@/components/popup/ConfirmDelete";
import { useNavigate } from "react-router-dom";

export const TableProjects = ({
                                  projects,
                                  owner,
                              }: {
    projects: {
        pk: number;
        title: string;
        description: string;
    }[];
    owner: boolean;
}) => {

    const [showPopupConfirmDelete, setshowPopupConfirmDelete] = useState(false);
    const navigate = useNavigate();

    function togglePopupConfirmDelete() {
        setshowPopupConfirmDelete(!showPopupConfirmDelete);
    }

    const handleCellClick = (idProject: number) => {
        navigate(`/Project/${idProject}`);
    };

    return(
        <>
                <Table>
                    <TableBody>
                        {projects.map((projects, idx: number) => (
                        <TableRow key={`projects-${idx}`} className="flex flex-row rounded-xl items-center">
                            <TableCell className="basis-3/4" onClick={() => handleCellClick(projects.pk)}>
                                <div className="flex flex-col">
                                    <p className="font-medium">{projects.title}</p>
                                    <p className="text-gray-500">{projects.description}</p>
                                </div>
                            </TableCell>
                            {owner &&(
                                <TableCell className="text-right basis-1/4">
                                    <button onClick={togglePopupConfirmDelete}>
                                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ff2424"><path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" stroke="#ff2424"></path><path d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6" stroke="#ff2424" ></path></svg>
                                    </button>
                                </TableCell>
                            )}
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            {showPopupConfirmDelete && <ConfirmDelete onClose={() => setshowPopupConfirmDelete(false)} />}
        </>
    );
};