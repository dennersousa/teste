// src/entidades/entidade.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntidadeEntity } from './entidade.entity';
import { EspecialidadeMedicaEntity } from './especialidade-medica.entity';
import { EntidadeController } from './entidade.controller';
import { EntidadeService } from './entidade.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EntidadeEntity, EspecialidadeMedicaEntity]),
  ],
  controllers: [EntidadeController],
  providers: [EntidadeService],
  exports: [EntidadeService]
})
export class EntidadeModule {}
