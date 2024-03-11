import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/Table";
import {useState} from "react";
import ConfirmDelete from "@/components/popup/ConfirmDelete";

export const TableTasks = ({
                                  tasks,
                              }: {
    tasks: {
        pk: number;
        state: number;
        title: string;
        fk_project: number;
    }[];
}) => {

    const [showPopupConfirmDelete, setshowPopupConfirmDelete] = useState(false);

    function togglePopupConfirmDelete() {
        setshowPopupConfirmDelete(!showPopupConfirmDelete);
    }

    const handleCellClick = () => {

    };

    return(
        <>
            <Table>
                <TableBody>
                    {tasks.map((tasks, idx: number) => (
                        <TableRow key={`tasks-${idx}`} className="flex flex-row items-center rounded-xl">
                            <TableCell className="basis-3/12">
                                <div className={`py-1 px-5 text-sm rounded-lg flex justify-center ${
                                    tasks.state === 1 ? "bg-red-200 text-red-500" :
                                        tasks.state === 2 ? "bg-orange-200 text-orange-500" :
                                            "bg-green-200 text-green-500"
                                }`}>
                                    {tasks.state === 1 ? "A faire" : tasks.state === 2 ? "En cours" : "Terminé"}
                                </div>
                            </TableCell>

                            <TableCell className="rounded-l-xl basis-6/12" onClick={handleCellClick}>
                                <div className="flex flex-col">
                                    <p className="font-medium">{tasks.title}</p>
                                </div>
                            </TableCell>
                                <TableCell className="rounded-r-xl text-right basis-3/12">
                                    <button onClick={togglePopupConfirmDelete}>
                                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ff2424"><path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" stroke="#ff2424"></path><path d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6" stroke="#ff2424" ></path></svg>
                                    </button>
                                </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {showPopupConfirmDelete && <ConfirmDelete onClose={() => setshowPopupConfirmDelete(false)} />}
        </>
    );
};