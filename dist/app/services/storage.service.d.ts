import Service from "@libs/service";
import Response from "@libs/response";
export default class StorageService extends Service {
    private storageModel;
    constructor();
    count(): Promise<Response<any[]>>;
    list(): Promise<Response<any[]>>;
    retrieve(pid: string): Promise<Response<any[]>>;
    retrieveByFilename(fileName: string): Promise<Response<any[]>>;
    create(file: any, directoryname: string): Promise<Response<any[]>>;
    createFromBuffer(buffer: any, directoryname: string, file: string): Promise<Response<any[]>>;
    update(pid: string, data: any): Promise<Response<any[]>>;
    delete(pid: string): Promise<Response<any[]>>;
    datatable(): Promise<Response<any[]>>;
}
//# sourceMappingURL=storage.service.d.ts.map