import ContentSearch from "@/components/generic/ContentSearch";
import { useNavigate } from "react-router-dom";

function PostSearch(): React.ReactElement {
    const navigate = useNavigate()

    return <ContentSearch onSearch={val => navigate(`/news/search?query=${val}`)} title="Post search" />
}

export default PostSearch