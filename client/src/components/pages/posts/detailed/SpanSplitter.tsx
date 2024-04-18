type SpanSplitterProps = {
    text: string
}

function SpanSplitter({ text }: SpanSplitterProps) {
    return (
        <>
            {text.split('\n\n').map(line => (
                <span key={text.split('\n\n').indexOf(line)}>{line}</span>
            ))}
        </>
    )
}

export default SpanSplitter