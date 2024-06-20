import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { ITutorial } from "../Dashboard/components/LatestCreatedTutorials";
import { axiosInstance } from "../../axiosInstance/axiosInstance";
import { AxiosError } from "axios";
import Loading from "../../components/Loading/Loading";




const TutorialView = () => {

    // If the location have a tutorial, it means the user will enter this page in edit mode
    const location = useLocation();
    const navigate = useNavigate();

    const tutorial: ITutorial = location?.state;
    const [editMode, setEditMode] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);


    // State for tutorials and handleChange
    const [title, setTitle] = useState<string>('');
    const [subTitle, setSubTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    // Change state
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setTitle(e.target.value);
    const handleSubTitleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setSubTitle(e.target.value);
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);




    // Create tutorial submit form 
    const handleCreateTutorial = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            setLoading(true);
            const response = await axiosInstance.post('/tutorial/create', { title, subtitle: subTitle, description });
            if (response.status === 201) {
                alert('Tutorial created. You will now be redirected to create chapters!');
                navigate('/chapters-view', { state: response.data.tutorial });
                setTitle('');
                setSubTitle('');
                setDescription('');
                setLoading(false);
            }
        }
        catch (error) {
            if (error instanceof AxiosError) {
                setLoading(false);
                setTitle('');
                setSubTitle('');
                setDescription('');
                alert(error.response?.data.message);
            }
        }
    }










    const handleUpdateTutorial = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        alert('Tutorial updated successfully');
        navigate('/chapters-view', { state: tutorial });
    }








    // useeffect. if the location state will have a tutorial, the page will be load in edit mode
    useEffect(() => {
        if (tutorial) {
            setEditMode(true);
        }
    }, [])




    if (loading) return <Loading title="Your pages is loading" subtitle="Please wait while we create/modify your tutorial" />

    return (
        <main>
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8 my-28">
                <div className="mb-10 md:mb-16">
                    <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
                        {editMode ? "Edit Tutorial" : "Create Tutorial"}
                    </h2>

                    <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
                        This is a section of some simple filler text, also known as placeholder text. It shares some
                        characteristics of a real written text but is random or otherwise generated.
                    </p>
                </div>

                <form className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2" onSubmit={editMode ? handleUpdateTutorial : handleCreateTutorial}>
                    <div>
                        <label htmlFor="tutorialTitle" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Tutorial title*</label>
                        <input name="tutorialTitle"
                            value={editMode ? tutorial.title : title}
                            onChange={handleTitleChange}
                            required={!editMode}
                            className="
                                w-full
                                rounded
                                border
                                bg-gray-50
                                px-3
                                py-2
                                text-gray-800
                                outline-none
                                ring-indigo-300
                                transition
                                duration-100
                                focus:ring
                            " />
                    </div>

                    <div>
                        <label htmlFor="subTitle" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Subtitle *</label>
                        <input name="subTitle"
                            value={editMode ? tutorial.subtitle : subTitle}
                            onChange={handleSubTitleChange}
                            required={!editMode}
                            className="
                            w-full
                            rounded
                            border
                            bg-gray-50
                            px-3
                            py-2
                            text-gray-800
                            outline-none
                            ring-indigo-300
                            transition
                            duration-100
                            focus:ring
                        " />
                    </div>

                    <div className="sm:col-span-2"><label htmlFor="description" className="mb-2 inline-block text-sm text-gray-800 sm:text-base" >Description *</label><span >
                    </span><textarea name="description"
                        value={editMode ? tutorial.description : description}
                        onChange={handleDescriptionChange}
                        required={!editMode}
                        className="
                        h-64
                        w-full
                        rounded
                        border
                        bg-gray-50
                        px-3
                        py-2
                        text-gray-800
                        outline-none
                        ring-indigo-300
                        transition
                        duration-100
                        focus:ring
                    "></textarea></div>

                    <div className="flex items-center justify-between sm:col-span-2">
                        <button className="
                                    inline-block
                                    rounded-lg
                                    bg-indigo-500
                                    px-8
                                    py-3
                                    text-center text-sm
                                    font-semibold
                                    text-white
                                    outline-none
                                    ring-indigo-300
                                    transition
                                    duration-100
                                    hover:bg-indigo-600
                                    focus-visible:ring
                                    active:bg-indigo-700
                                    md:text-base
                                ">
                            {editMode ? 'Update tutorial' : 'Create tutorial'}</button>

                        <span className="text-sm text-gray-500">*Required</span>
                    </div>

                    <p className="text-xs text-gray-400">
                        By signing up to our newsletter you agree to our
                        <a href="#" className="underline transition duration-100 hover:text-indigo-500 active:text-indigo-600">Privacy Policy</a>.
                    </p>
                </form>
            </div>
        </main>
    )
}


export default TutorialView;
