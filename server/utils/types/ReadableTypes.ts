type ReadableTypes = 'post' | 'thread'

type Condition = { post: string; thread?: never } | { thread: string; post?: never }

export { ReadableTypes, Condition }