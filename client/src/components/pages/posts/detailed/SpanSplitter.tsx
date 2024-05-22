function SpanSplitter({ text }: { text: string }) {
    return text.split('\n\n').map((line, i) => (
        <span key={i}>{line}</span>
    ))
}

export default SpanSplitter