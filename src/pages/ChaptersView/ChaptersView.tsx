import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { axiosInstance } from "../../axiosInstance/axiosInstance";
import Loading from "../../components/Loading/Loading";
import { AxiosError } from "axios";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';





export interface IChapter {
    _id: string;
    title: string;
    description: string;
    content: string;
    tutorial: string;
}











const ChaptersView = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const tutorial = location.state;





    const [loading, setLoading] = useState<boolean>();
    const [chapters, setChapters] = useState([]);
    const [editMode, setEditMode] = useState<boolean>(false);




    const getChalterListByTutorialId = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/chapter/get-chapters-by-tutorialId/${tutorial._id}`);
            setChapters(response.data);
            setLoading(false);

        }
        catch (error) {
            setLoading(false);
            console.log(error);
        }
    }



    // Start processing 
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [selectedChapter, setSelectedChapter] = useState<IChapter | null>(null);



    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)



    const handleCreateChapter = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axiosInstance.post('/chapter/create', {
                title, description, content, tutorial: tutorial._id
            });

            if (response.status === 201) {
                alert('Chapter created succesfully!');
                setTitle('');
                setDescription('');
                setContent('');
                getChalterListByTutorialId();
                setLoading(false);
            }
        }
        catch (error) {
            getChalterListByTutorialId();
            setTitle('');
            setDescription('');
            setContent('');
            setLoading(false);
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
                alert(error.response?.data);
            }
        }
    }





    const handleEditChapter = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const result = await axiosInstance.put('/chapter/update', {
                title, description, content, chapterId: selectedChapter?._id
            });
            if (result.status === 200) {
                alert('Chapter updated succesfully!');
                setTitle('');
                setDescription('');
                setContent('');
                setEditMode(false);
                getChalterListByTutorialId();
                setLoading(false);
            }
        }
        catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
                alert(error.response?.data);
                setTitle('');
                setDescription('');
                setContent('');
                setEditMode(false);
                getChalterListByTutorialId()
                setLoading(true);
            }
        }
    }



    const handleDeleteChapter = async (chapterId: string) => {
        try {
            setLoading(true);
            const result = await axiosInstance.put(`/chapter/delete/${chapterId}`);
            if (result.status === 200) {
                alert('Chapter deleted succesfully!');
                getChalterListByTutorialId();
                setLoading(false);
            }
        }
        catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
                alert(error.response?.data);
                getChalterListByTutorialId();
                setLoading(false);
            }
        }
    }





    useEffect(() => {
        getChalterListByTutorialId();
    }, []);


    useEffect(() => {
        if (!tutorial) {
            navigate('/dashboard');
        }
    }, [location]);





    if (loading) return <Loading title="Loading" subtitle="Please wait while we look for your data" />

    return (
        <main className="my-20">
            <div className=" max-w-[1300px] md:text-lg mt-28 mx-auto p-5">
                <h1 className="text-indigo-600 mt-5 text-4xl font-semibold">{editMode ? 'Edit chapter' : 'Create chapter'}</h1>
                <p className="text-slate-400 mb-10 max-w-2xl mt-3">Please complete the fields required. If you want to modify a certain chapter, please navigate to the bottom of the page and select it.</p>
            </div>


            <form onSubmit={editMode ? handleEditChapter : handleCreateChapter}>
                <div className="mx-auto max-w-[1300px] px-4 md:px-8">

                    <section className="mx-auto grid max-w-[1300px] gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="title" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Chapter title*</label>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={handleTitleChange}
                                name="title"
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
                            <label htmlFor="description" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Chapter description *</label>
                            <input
                                type="text"
                                required
                                value={description}
                                onChange={handleDescriptionChange}
                                name="description"
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

                        <div className="sm:col-span-2"><label htmlFor="message" className="mb-2 inline-block text-sm text-gray-800 sm:text-base" >MarkDown Content *</label><span >
                        </span><textarea name="message"
                            required
                            value={content}
                            onChange={handleContentChange}
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
                                {editMode ? 'Edit tutorial' : 'Create tutorial'}</button>

                            <span className="text-sm text-gray-500">*Required</span>
                        </div>

                        <p className="text-xs text-gray-400">
                            By signing up to our newsletter you agree to our
                            <a href="#" className="underline transition duration-100 hover:text-indigo-500 active:text-indigo-600">Privacy Policy</a>.
                        </p>
                    </section>
                </div>
            </form>


            {/* Markdown section */}
            {content.length > 0 && <section className="p-5">
                <div className="prose max-w-[1300px] mx-auto mt-20 p-5 py-10 bg-slate-50 rounded-xl">
                    <h2 className="text-3xl text-indigo-600">Preview</h2>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                </div>
            </section>}


            {/* edit chapter sections */}
            <section className=" max-w-[1300px] mx-auto mt-20 p-5 ">
                {
                    (chapters && chapters.length > 0) && <section>
                        <h1 className="text-indigo-600 text-3xl font-semibold">Available chapters</h1>
                        <p className="mb-3 mt-1 text-slate-400">Please select the desired chapter if you want to modify it or delete it</p>
                    </section>
                }
                {
                    (chapters && chapters.length > 0) && chapters.map((element: IChapter) => (
                        <figure key={element._id} className="flex items-center flex-wrap justify-between my-5 bg-slate-50 rounded-xl p-5">
                            <div>
                                <p className="text-indigo-600 text-2xl">
                                    {element.title}
                                </p>
                                <p className="text-slate-500">{element.description}</p>
                            </div>
                            <div className="flex flex-wrap gap-3 mt-5 sm:mt-0">
                                <button
                                    onClick={() => {
                                        if (element) {
                                            setSelectedChapter(element);
                                            setContent(element.content || ''); // Ensure content has a default value
                                            setTitle(element.title || ''); // Ensure title has a default value
                                            setDescription(element.description || ''); // Ensure description has a default value
                                            setEditMode(true);
                                        }
                                    }}
                                    className="border border-indigo-500 rounded-lg py-1 px-3 text-indigo-500">Edit</button>

                                <button onClick={() => handleDeleteChapter(element._id)} className="border border-red-500 rounded-lg py-1 px-3 text-red-500">Delete</button>
                            </div>
                        </figure>
                    ))
                }
            </section>

        </main>
    )
}

export default ChaptersView
