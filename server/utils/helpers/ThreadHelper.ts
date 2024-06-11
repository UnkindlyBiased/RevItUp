import ThreadInputDto from '../../src/models/dto/threads/ThreadInputDto'

class ThreadHelper {
    static trimData(input: ThreadInputDto) {
        input.threadTitle = input.threadTitle.trim()
        input.threadText = input.threadText.trim()
    }
    static putDashes(title: string) {
        const symbols = "!:,\"\\/".split("")
        for (const symbol of symbols) {
            title = title.replace(symbol, "")
        }
        title = title.toLowerCase().split(" ").join('-')
        return title
    }
}

export default ThreadHelper