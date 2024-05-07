function UserBiography({ text }: { text: string | null }) {
    return (
        <div className="flex flex-col w-50 space-y-1">
            <span className="text-3xl font-bold">Biography</span>
            <span>{text ? text : "This user hasn't provided any biography about themselves"}</span>
        </div>
    )
}

export default UserBiography