function NotFound(): React.ReactElement {
    return (
        <div className="flex flex-col space-y-3">
            <span className="text-6xl font-bold text-end">Unfortunately, the data you searched or accessed was not found</span>
            <span className="text-xl text-center">Change the search query, navigate to the upper node or just stay here until something happens</span>
        </div>
    )
}

export default NotFound