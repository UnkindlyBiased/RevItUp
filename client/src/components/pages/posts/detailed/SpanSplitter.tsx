function SpanSplitter({ text, className }: { text: string, className?: string }): React.ReactElement {
    return (
        <div className={className}>
            {text.split('\r\n\r\n').map((line, i) => (
                <span className="break-words" key={i}>{line}</span>
            ))}
        </div>
    )
}

export default SpanSplitter