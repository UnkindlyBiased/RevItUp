import SpanSplitter from "../../posts/detailed/SpanSplitter"

type ThreadDetailedContentProps = {
    content: string
}

function ThreadDetailedContent({ content }: ThreadDetailedContentProps): React.ReactElement {
    return (
        <div className="border-2 px-3 py-2 rounded-md w-[750px]">
            <SpanSplitter text={content} />
        </div>
    )
}

export default ThreadDetailedContent