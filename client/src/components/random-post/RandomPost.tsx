import { Link } from "react-router-dom"

function RandomPost(): React.ReactElement {
    return (
        <>
            <div className="bg-gradient-to-r from-slate-200 px-8 py-7 flex items-center justify-between space-x-6">
                <div className="flex flex-col space-y-5">
                    <span className="font-space-grotesk text-7xl">
                        Don't know which post to choose?
                    </span>
                    <div className="font-space-grotesk font-medium">
                        <span className="text-6xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-red-500">
                            Choose 
                            <Link to={'/'} className="hover:text-7xl transition-all px-3">THIS</Link>
                            post 
                        </span>
                        <span className="text-3xl pl-5 opacity-35">("title")</span>
                    </div>
                </div>
                <img src="/tonight.jpg" className="h-60 rounded-xl shadow-md"/>
            </div>
        </>
    )
}

export default RandomPost