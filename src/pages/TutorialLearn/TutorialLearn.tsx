import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { axiosInstance } from "../../axiosInstance/axiosInstance";
import { AxiosError } from "axios";
import { TutorialChapters } from "./components/ChapterList";
import Loading from "../../components/Loading/Loading";


export interface Chapter {
    _id: string;
    title: string;
    description: string;
    content: string;
    attachments: any[];  // Replace 'any' with a more specific type if known
    tutorial: string;
    __v: number;
}

export interface Tutorial {
    _id: string;
    title: string;
    subtitle: string;
    description: string;
    author: string;
    createdDate: Date;
    __v: number;
}

interface TutorialResponse {
    tutorial: Tutorial;
    chapterLists: Chapter[];
}



const TutorialLearn = () => {

    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [tutorial, setTutorial] = useState<TutorialResponse | null>(null);
    const navigate = useNavigate();


    const getTutorial = async (tutorialId: string) => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/tutorial/get-tutorial/${tutorialId}`);
            if (response.status === 200) {
                setTutorial(response.data);
                setLoading(false);
            }
        }
        catch (error) {
            console.error(error);
            setLoading(false);
            if (error instanceof AxiosError) {
                if (error.response?.status === 404) {
                    alert("Tutorial not found");
                    return navigate('/');
                };

                alert(error.response?.data.message);
                return;
            }
            alert("Something went wrong");
        }
    }


    useEffect(() => {
        if (id) {
            getTutorial(id);
        }
    }, []);




    if (loading) return <Loading title="Your tutorial is loading" subtitle="Please wait while we get your chapters" />

    return (
        <main>
            <div className="bg-white py-6 sm:py-8 lg:py-12">
                <div className="mx-auto max-w-screen-xl px-4 md:px-8 mt-20">
                    <p className="mb-2 font-semibold text-indigo-500 md:mb-3 lg:text-lg">Created on {tutorial && tutorial.tutorial.createdDate
                        ? new Date(tutorial.tutorial.createdDate).toLocaleDateString()
                        : 'Invalid Date'}</p>

                    <h2 className="mb-4 text-2xl font-bold text-gray-800 md:mb-2 lg:text-3xl">
                        {tutorial?.tutorial.title}
                    </h2>

                    <p className="max-w-screen-md text-xl text-gray-500 md:text-2xl mb-6">
                        {tutorial?.tutorial.subtitle}
                    </p>

                    <p className="max-w-screen-md text-gray-500 md:text-lg">
                        {tutorial?.tutorial.description}
                    </p>
                </div>
            </div>


            {tutorial && <TutorialChapters chapterLists={tutorial?.chapterLists} />}
        </main>
    )
}

export default TutorialLearn
