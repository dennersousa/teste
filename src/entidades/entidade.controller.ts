// src/entidades/entidade.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { EntidadeService } from './entidade.service';
import { CreateEntidadeDto } from './dto/create-entidade.dto';
import { UpdateEntidadeDto } from './dto/update-entidade.dto';
import { EntidadeEntity } from './entidade.entity';

@Controller('entidades')
export class EntidadeController {
  constructor(private readonly entidadeService: EntidadeService) {}

  @Get()
  async findAll(): Promise<EntidadeEntity[]> {
    return await this.entidadeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<EntidadeEntity | undefined> {
    return await this.entidadeService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateEntidadeDto): Promise<EntidadeEntity> {
    return await this.entidadeService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateEntidadeDto,
  ): Promise<EntidadeEntity> {
    return await this.entidadeService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.entidadeService.delete(id);
  }
}
