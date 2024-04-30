import ChildProp from "@/types/page/ChildProp";

function ContentBox({ children }: ChildProp): React.ReactElement {
    return (
        <div className="px-12 py-6">
            {children}
        </div>
    )
}

export default ContentBox