


const NoChapterFound = ({ chaptersNumber }: { chaptersNumber: number }) => {
    return (
        <article className="min-h-screen flex justify-center items-center">
            {
                chaptersNumber === 0 && <div className="bg-slate-50 px-5 py-10 rounded-xl">
                    <h1 className="text-indigo-600 text-3xl mb-2">No chapter created so far</h1>
                    <p>Start creating your first chapter by clicking the button bellow</p>
                    <button className="bg-indigo-600 text-white rounded-xl py-2 px-6 mt-2">Create a chapter</button>
                </div>
            }
        </article>
    )
}

export default NoChapterFound
