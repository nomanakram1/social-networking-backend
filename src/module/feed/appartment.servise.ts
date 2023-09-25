import { Injectable } from '@nestjs/common';
import { DatabaseService } from './sqlite.servise';

@Injectable()
export class AppartmentServise {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<any[]> {
    const query = 'SELECT * FROM appartment';
    const appartments = await this.databaseService.query(query);
    return appartments;
  }

  async findByNameOrId(searchTerm: string): Promise<any | null> {
    const isNumeric = /^\d+$/.test(searchTerm); // Check if the searchTerm is numeric (ID)

    let query: string;
    let queryParams: any[];

    if (isNumeric) {
      query = 'SELECT * FROM appartment WHERE id = ?';
      queryParams = [parseInt(searchTerm, 10)]; // Parse the numeric search term as an integer
    } else {
      query = 'SELECT * FROM appartment WHERE name = ?';
      queryParams = [searchTerm];
    }

    const result = await this.databaseService.query(query, queryParams);

    if (result.length === 0) {
      return null; // No matching apartment found
    }

    return result[0]; // Return the first matching apartment
  }
}
