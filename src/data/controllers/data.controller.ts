import { Controller, Get } from '@nestjs/common';
import { DataService } from '../services/data.service';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}
  @Get()
  public async allData() {
    return await this.dataService.readData();
  }
}
