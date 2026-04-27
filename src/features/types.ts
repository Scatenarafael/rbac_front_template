



export type Paginated<T> = {
    meta: {
        perPage: number,
        pageIndex: number
    },
    results: T[]
}



export const DefaultPageSizeOptions = [5, 10, 20, 50] as const

export type DefaultPageSizeOption = typeof DefaultPageSizeOptions[number]

