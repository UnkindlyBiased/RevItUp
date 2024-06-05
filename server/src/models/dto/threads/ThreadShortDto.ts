import ThreadModel from "../../domain/Thread";

type ThreadShortDto = Omit<ThreadModel, "id" | "threadText">

export default ThreadShortDto