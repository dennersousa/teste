import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { EntidadeService } from './entidade.service';
import { CreateEntidadeDto } from './dto/create-entidade.dto';
import { UpdateEntidadeDto } from './dto/update-entidade.dto';
import { EntidadeEntity } from './entidade.entity';

@Controller('entidades')
export class EntidadeController {
  constructor(private readonly entidadeService: EntidadeService) {}

  @Get()
  async findAll(): Promise<EntidadeEntity[]> {
    return this.entidadeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<EntidadeEntity | undefined> {
    return this.entidadeService.findOne(id);
  }

  @Post()
  async create(@Body() createEntidadeDto: CreateEntidadeDto): Promise<EntidadeEntity> {
    return this.entidadeService.create(createEntidadeDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateEntidadeDto: UpdateEntidadeDto): Promise<EntidadeEntity> {
    return this.entidadeService.update(id, updateEntidadeDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.entidadeService.delete(id);
  }
}
