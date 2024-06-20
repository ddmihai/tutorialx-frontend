import { useEffect, useState } from "react";
import { axiosInstance } from "../../../axiosInstance/axiosInstance";
import { Link, useNavigate } from "react-router-dom";



export interface ITutorial {
    author: string;
    createdDate: Date;
    description: string;
    subtitle: string;
    title: string;
    _id: string;
}




const LatestCreatedTutorials = () => {

    const [tutorialsByUser, setTutorialsByUser] = useState<ITutorial[] | null>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();



    const getTutorialList = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/tutorial/tutorials-by-author');
            if (response.status === 200) {
                setTutorialsByUser(response.data.tutorials);
                setLoading(false);
            }
        }
        catch (error) {
            setLoading(false);
            if (error instanceof Error) {
                alert('Something went wrong. Please try again');
                console.log(error.message);
            }
        }
    }


    const shareTutorial = async (tutorialId: string) => {
        const currentUrl = `${window.location.origin.split('/dashboard')[0]}/tutorial-learn/${tutorialId}`;
        alert(currentUrl);
    }



    const handleDeleteTutorial = async (tutorialId: string) => {
        try {
            const response = await axiosInstance.delete(`/tutorial/delete/${tutorialId}`);
            if (response.status === 200) {
                getTutorialList();
            }
        }
        catch (error) {
            if (error instanceof Error) {
                alert('Something went wrong. Please try again');
                console.log(error.message);
            }
        }
    }









    useEffect(() => {
        getTutorialList();
    }, [])

    return (
        <section className="max-w-[1300px] mx-auto px-5 py-10">
            <h2 className="text-2xl text-indigo-600">Your created tutorials</h2>
            <p className="text-slate-500">Manage your created tutorials in a nutshell</p>

            <div className="max-h-[400px] overflow-hidden border border-slate-300 rounded-xl p-2 mt-4">
                {loading && <h2 className="h-full bg-slate-50 text-indigo-500 text-2xl px-2 py-6">Loading...</h2>}
                {(!loading && !tutorialsByUser?.length) && <h2 className="h-full bg-slate-50 text-indigo-500 text-2xl px-2 py-6">No tutorials created so far.</h2>}

                {
                    tutorialsByUser?.map((element: ITutorial) => (
                        <figure key={element._id} className="flex items-center flex-wrap justify-between my-5 bg-slate-50 rounded-xl p-5">
                            <div>
                                <Link to={'#'} className="text-indigo-600 text-2xl">
                                    {element.title}
                                </Link>
                                <p className="text-slate-500">{element.subtitle}</p>
                            </div>
                            <div className="flex flex-wrap gap-3 mt-5 sm:mt-0">
                                <button
                                    onClick={() => shareTutorial(element._id)}
                                    className="border border-indigo-500 rounded-lg py-1 px-3 text-indigo-500" > Share</button>
                                <button
                                    onClick={() => navigate('/tutorial-view', { state: element })}
                                    className="border border-indigo-500 rounded-lg py-1 px-3 text-indigo-500">Edit</button>
                                <button onClick={() => handleDeleteTutorial(element._id)} className="border border-red-500 rounded-lg py-1 px-3 text-red-500">Delete</button>
                            </div>
                        </figure>
                    ))
                }
            </div>
        </section >
    )
}

export default LatestCreatedTutorials
