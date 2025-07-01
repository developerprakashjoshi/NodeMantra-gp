import Service from '../../libs/service';
export declare class BaseService extends Service {
    protected repository: any;
    constructor(repository: any);
    /**
     * Get all records
     */
    findAll(): Promise<any>;
    /**
     * Get a single record by ID
     */
    findById(id: string | number): Promise<any>;
    /**
     * Create a new record
     */
    create(data: any): Promise<any>;
    /**
     * Update a record
     */
    update(id: string | number, data: any): Promise<any>;
    /**
     * Delete a record
     */
    delete(id: string | number): Promise<any>;
    /**
     * Find records with pagination
     */
    findWithPagination(page?: number, limit?: number): Promise<{
        records: any;
        total: any;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    /**
     * Find records with conditions
     */
    findBy(conditions: any): Promise<any>;
    /**
     * Find one record with conditions
     */
    findOneBy(conditions: any): Promise<any>;
}
export default BaseService;
//# sourceMappingURL=base.service.d.ts.map