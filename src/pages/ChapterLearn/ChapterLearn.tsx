import { useLocation, useNavigate } from "react-router-dom"
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';



const ChapterLearn = () => {

    const location = useLocation();
    const chapter = location.state;
    const navigate = useNavigate();

    console.log(chapter);

    return (
        <main className="mx-auto max-w-[1300px] mt-20 p-5">
            <div className="bg-slate-50 p-5 rounded-xl">
                <button onClick={() => navigate(-1)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg">Back</button>
            </div>


            <section className="p-5">
                <div className="prose max-w-[1300px] mx-auto mt-20 p-5 py-10 bg-slate-50 rounded-xl">
                    <h2 className="text-3xl text-indigo-600">Preview</h2>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{chapter.content}</ReactMarkdown>
                </div>
            </section>
        </main>
    )
}

export default ChapterLearn
