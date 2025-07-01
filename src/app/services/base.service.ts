import Service from '@libs/service';

export class BaseService extends Service {
  protected repository: any;

  constructor(repository: any) {
    super();
    this.repository = repository;
  }

  /**
   * Get all records
   */
  async findAll() {
    return await this.repository.find();
  }

  /**
   * Get a single record by ID
   */
  async findById(id: string | number) {
    return await this.repository.findOne({ where: { id } });
  }

  /**
   * Create a new record
   */
  async create(data: any) {
    const record = this.repository.create(data);
    return await this.repository.save(record);
  }

  /**
   * Update a record
   */
  async update(id: string | number, data: any) {
    await this.repository.update(id, data);
    return await this.findById(id);
  }

  /**
   * Delete a record
   */
  async delete(id: string | number) {
    return await this.repository.delete(id);
  }

  /**
   * Find records with pagination
   */
  async findWithPagination(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [records, total] = await this.repository.findAndCount({
      skip,
      take: limit
    });

    return {
      records,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  /**
   * Find records with conditions
   */
  async findBy(conditions: any) {
    return await this.repository.find({ where: conditions });
  }

  /**
   * Find one record with conditions
   */
  async findOneBy(conditions: any) {
    return await this.repository.findOne({ where: conditions });
  }
}

export default BaseService; 