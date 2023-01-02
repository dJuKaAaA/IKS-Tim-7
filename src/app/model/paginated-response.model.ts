export interface PaginatedResponse<T> {
    totalCount: number,
    results: Array<T>
}
