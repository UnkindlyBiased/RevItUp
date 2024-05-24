function SpanSplitter({ text }: { text: string }) {
    return text.split('\r\n\r\n').map((line, i) => (
        <span key={i}>{line}</span>
    ))
}

export default SpanSplitter