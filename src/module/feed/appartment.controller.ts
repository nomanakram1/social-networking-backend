import {
  Controller,
  Get,
  Param, // Import Param decorator
  // ...other imports...
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppartmentServise } from './appartment.servise';

@Controller('appartment')
@ApiTags('appartment')
export class AppartmentController {
  constructor(private readonly appartmentService: AppartmentServise) {}

  @Get()
  async findAll() {
    return await this.appartmentService.findAll();
  }

  @Get(':searchTerm') // Define a new endpoint with a parameter
  async findByNameOrId(@Param('searchTerm') searchTerm: string) {
    const result = await this.appartmentService.findByNameOrId(searchTerm);
    if (!result) {
      // Handle not found, e.g., return a 404 response
    }
    return result;
  }
}
