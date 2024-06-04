import ThreadInputDto from "./ThreadInputDto";

type ThreadUpdateDto = { id: string, authorId: number } & ThreadInputDto

export default ThreadUpdateDto