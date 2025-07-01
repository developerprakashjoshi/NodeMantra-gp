import Service from '@libs/service';
import Response from '@libs/response';
export default class RoleService extends Service {
    private roleModel;
    private userModel;
    private postModel;
    private searchEngine;
    constructor();
    count(): Promise<Response<any>>;
    list(): Promise<Response<any>>;
    retrieve(pid: string): Promise<Response<any>>;
    retrieveByRole(name: string): Promise<any>;
    create(data: any): Promise<Response<any>>;
    update(pid: string, data: any): Promise<Response<any>>;
    delete(pid: string): Promise<Response<any>>;
    datatable(data: any): Promise<Response<any>>;
    searchRoles(query: any): Promise<Response<any>>;
}
//# sourceMappingURL=role.service.d.ts.map