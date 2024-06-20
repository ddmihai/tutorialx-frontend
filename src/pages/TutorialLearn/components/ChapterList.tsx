import { useNavigate } from "react-router-dom";
import { Chapter } from "../TutorialLearn";




export const TutorialChapters = ({ chapterLists }: { chapterLists: Chapter[] }) => {

    const navigate = useNavigate();



    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="mb-10 border-t border-b divide-y">

                {chapterLists.map((element, index) => (
                    <div
                        onClick={() => navigate('/chapter-learn', { state: element })}
                        role="button"
                        className="grid py-8 sm:grid-cols-4" key={element._id}>
                        <div className="mb-4 sm:mb-0">
                            <div className="space-y-1 text-xs font-semibold tracking-wide uppercase">
                                <p
                                    className="transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                                    aria-label="Category"
                                >CHAPTER {index + 1}</p>
                                <p className="text-gray-600">View</p>
                            </div>
                        </div>
                        <div className="sm:col-span-3 lg:col-span-2">
                            <div className="mb-3">
                                <div
                                    aria-label="Article"
                                    className="inline-block text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
                                >
                                    <p className="text-3xl font-extrabold leading-none sm:text-4xl xl:text-4xl">
                                        {element.title}
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-700">
                                {element.description}
                            </p>
                        </div>
                    </div>))}

            </div>
        </div>
    );
};