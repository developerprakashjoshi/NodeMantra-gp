import Service from '@libs/service';
import Response from '@libs/response';
export default class CategoryService extends Service {
    private categoryModel;
    private userModel;
    private postModel;
    private searchEngine;
    constructor();
    count(): Promise<Response<any>>;
    list(): Promise<Response<any>>;
    retrieve(pid: string): Promise<Response<any>>;
    retrieveByCategory(name: string): Promise<any>;
    create(data: any): Promise<Response<any>>;
    update(pid: string, data: any): Promise<Response<any>>;
    delete(pid: string): Promise<Response<any>>;
    datatable(data: any): Promise<Response<any>>;
    searchCategorys(query: any): Promise<Response<any>>;
}
//# sourceMappingURL=category.service.d.ts.map