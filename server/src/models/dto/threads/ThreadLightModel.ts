import ThreadModel from "../../domain/Thread";

type ThreadLightModel = Omit<ThreadModel, "author" | "threadCategory">

export default ThreadLightModel