type TestButtonProps = {
    children: React.ReactNode,
    onClick: () => void
}

function TestButton({ children, onClick }: TestButtonProps) {
    return (
        <button className="size-fit bg-gray-500 text-white shadow-lg p-2 rounded-lg" onClick={onClick}>
            {children}
        </button>
    )
}

export default TestButton