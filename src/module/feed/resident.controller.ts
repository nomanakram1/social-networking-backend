import { Controller, Get, Param, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResidentServise } from './resident.service';

@Controller('resident')
@ApiTags('resident')
export class ResidentController {
  constructor(
    @Inject(ResidentServise) private readonly residentService: ResidentServise,
  ) {}

  @Get()
  async findAll() {
    return await this.residentService.findAll();
  }

  @Get(':searchTerm') // Define a new endpoint with a parameter
  async findByNameOrId(@Param('searchTerm') searchTerm: string) {
    const result = await this.residentService.findByNameOrId(searchTerm);
    if (!result) {
      // Handle not found, e.g., return a 404 response
    }
    return result;
  }
}
