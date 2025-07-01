import { Request, Response } from 'express';
import Controller from '@libs/controller';
import ResponseHelper from '@libs/response';

export class BaseController extends Controller {
  protected service: any;

  constructor(service: any) {
    super();
    this.service = service;
  }

  /**
   * Get all records
   */
  async index(req: Request, res: Response) {
    try {
      const records = await this.service.findAll();
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Records retrieved successfully',
        data: records
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  /**
   * Get a single record by ID
   */
  async show(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const record = await this.service.findById(id);
      
      if (!record) {
        return res.status(404).json({
          success: false,
          statusCode: 404,
          message: 'Record not found'
        });
      }
      
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Record retrieved successfully',
        data: record
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  /**
   * Create a new record
   */
  async store(req: Request, res: Response) {
    try {
      const record = await this.service.create(req.body);
      return res.status(201).json({
        success: true,
        statusCode: 201,
        message: 'Record created successfully',
        data: record
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  /**
   * Update a record
   */
  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const record = await this.service.update(id, req.body);
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Record updated successfully',
        data: record
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  /**
   * Delete a record
   */
  async destroy(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await this.service.delete(id);
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Record deleted successfully'
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Internal server error',
        error: error.message
      });
    }
  }
}

export default BaseController; 