import Thread from "./Thread";

type ThreadShort = Omit<Thread, "id" | "threadText">

export default ThreadShort