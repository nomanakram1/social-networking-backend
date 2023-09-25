import { Injectable } from '@nestjs/common';
import { DatabaseService } from './sqlite.servise';

@Injectable()
export class FeedService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(queryParams: {
    appartment_id?: number;
    resident_id?: number;
  }): Promise<any[]> {
    const { appartment_id, resident_id } = queryParams; // Destructure the query parameters
    let query = `SELECT
      feed.id AS feed_id,
      appartment.id AS appartment_id,
      resident.id AS resident_id,
      feed.message,
      appartment.name AS apartment_name,
      resident.name AS resident_name
    FROM feed
    JOIN appartment ON feed.apartment_id = appartment.id
    JOIN resident ON feed.resident_id = resident.id`;

    const conditions = [];

    if (appartment_id !== undefined) {
      conditions.push(`appartment.id = ${appartment_id}`); // Add the condition to the array
    }

    if (resident_id !== undefined) {
      conditions.push(`resident.id = ${resident_id}`);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    const residents = await this.databaseService.query(query);
    return residents;
  }

  async findByNameOrId(searchTerm: string): Promise<any | null> {
    const isNumeric = /^\d+$/.test(searchTerm); // Check if the searchTerm is numeric (ID)

    let query: string;
    let queryParams: any[];

    if (isNumeric) {
      query = 'SELECT * FROM feed WHERE id = ?';
      queryParams = [parseInt(searchTerm, 10)]; // Parse the numeric search term as an integer
    } else {
      query = 'SELECT * FROM feed WHERE name = ?';
      queryParams = [searchTerm];
    }

    const result = await this.databaseService.query(query, queryParams); // Execute the query

    if (result.length === 0) {
      return null; // No matching apartment found
    }

    return result[0]; // Return the first matching apartment
  }
}
