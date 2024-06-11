import SpanSplitter from "../posts/detailed/SpanSplitter"

function UserBiography({ text }: { text: string | null }) {
    return (
        <div className="flex flex-col w-50 space-y-1">
            <span className="text-3xl font-bold">Biography</span>
            { text ? <SpanSplitter text={text} className="flex flex-col space-y-4 text-lg w-[50%] mb-3" /> : <span children="This user did not write any info about himself" /> }
        </div>
    )
}

export default UserBiography