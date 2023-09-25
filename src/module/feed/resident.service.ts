import { Injectable } from '@nestjs/common';
import { DatabaseService } from './sqlite.servise';

@Injectable()
export class ResidentServise {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<any[]> {
    const query = `SELECT * from resident`; // Your SQL query
    const residents = await this.databaseService.query(query);
    return residents;
  }

  async findByNameOrId(searchTerm: string): Promise<any | null> {
    const isNumeric = /^\d+$/.test(searchTerm); // Check if the searchTerm is numeric (ID)

    let query: string;
    let queryParams: any[];

    if (isNumeric) {
      query = 'SELECT * FROM resident WHERE id = ?';
      queryParams = [parseInt(searchTerm, 10)]; // Parse the numeric search term as an integer
    } else {
      query = 'SELECT * FROM resident WHERE name = ?';
      queryParams = [searchTerm];
    }

    const result = await this.databaseService.query(query, queryParams);

    if (result.length === 0) {
      return null; // No matching apartment found
    }

    return result[0]; // Return the first matching apartment
  }
}
