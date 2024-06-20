



const Loading = ({ title, subtitle }: { title: string, subtitle: string }) => {
    return (
        <section className="absolute inset-0 bg-slate-50 flex justify-center items-center">
            <div>
                <h1 className="text-3xl">Tutorial<span className="text-indigo-600 text-4xl font-extrabold">X</span> - {title || 'Loading...'}</h1>
                <p className="text-slate-500 italic mt-2">{subtitle || 'Please wait while we load the page...'}</p>
            </div>
        </section>
    )
}

export default Loading
