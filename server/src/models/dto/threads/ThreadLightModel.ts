import ThreadModel from "../../domain/Thread";

type ThreadLightModel = Omit<ThreadModel, "author">

export default ThreadLightModel