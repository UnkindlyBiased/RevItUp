type ActionButtonProps = {
    icon: React.ReactElement,
    text: string
}

function ActionButton({ icon, text }: ActionButtonProps): React.ReactElement {
    return (
        <div className="text-white bg-light-theme-header h-fit px-4 py-3 rounded-lg flex space-x-2 items-center">
            {icon}
            <span className="font-medium" children={text} />
        </div>
    )
}

export default ActionButton