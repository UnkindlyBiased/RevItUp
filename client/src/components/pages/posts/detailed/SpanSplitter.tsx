function SpanSplitter({ text }: { text: string }) {
    return text.split('\n\n').map(line => (
        <span key={text.split('\n\n').indexOf(line)}>{line}</span>
    ))
}

export default SpanSplitter