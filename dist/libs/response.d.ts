interface ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data?: T;
    count?: number;
    error?: string;
}
export default class Response<T> implements ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data?: T;
    count?: number;
    error?: string | undefined;
    constructor(success: boolean, statusCode: number, message: string, data?: T, count?: number, error?: string);
}
export {};
//# sourceMappingURL=response.d.ts.map