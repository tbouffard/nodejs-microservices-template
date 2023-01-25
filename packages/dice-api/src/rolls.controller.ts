import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Logger,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { DbService } from './db.service';

@Controller('rolls')
export class RollsController {
  private readonly logger = new Logger(DbService.name);

  constructor(private readonly db: DbService) {}

  @Post()
  async rollDice(@Body('sides') sides: number) {
    this.logger.log(`Rolling dice [sides: ${sides}]`);
    const result = Math.ceil(Math.random() * sides);
    await this.db.addRoll({
      sides: sides,
      timestamp: Date.now(),
      result,
    });
    return { result };
  }
}
