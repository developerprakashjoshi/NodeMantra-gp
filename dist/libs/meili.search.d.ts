export interface ISearchService {
    search(indexName: string, query: string): Promise<any>;
    addDocuments(indexName: string, documents: any[]): Promise<Object>;
    updateIndex(indexName: string, documents: any[]): Promise<void>;
    addIndex(indexName: string): Promise<void>;
    deleteIndex(indexName: string): Promise<void>;
    deleteDocument(indexName: string, documentId: string): Promise<void>;
}
export default class Search implements ISearchService {
    private client;
    constructor();
    addDocuments(indexName: string, documents: any[]): Promise<Object>;
    search(indexName: string, query: string): Promise<any>;
    updateIndex(indexName: string, documents: any[]): Promise<void>;
    addIndex(indexName: string): Promise<void>;
    deleteIndex(indexName: string): Promise<void>;
    deleteDocument(indexName: string, documentId: string): Promise<void>;
}
//# sourceMappingURL=meili.search.d.ts.map