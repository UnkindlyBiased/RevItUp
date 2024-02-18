import { IPostPreviewDto } from "../../types/ProductsTypes"

interface PropsType {
    props: IPostPreviewDto
}

export const WidePost = ({props} : PropsType) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <p>{props.previewText}</p>
        </div>
    )
}