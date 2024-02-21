import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntidadeEntity } from './entidades/entidade.entity'; // Caminho corrigido da entidade
import { EspecialidadeMedicaEntity } from './entidades/especialidade-medica.entity'; // Adicionando entidade relacionada
import { EntidadeController } from './entidades/entidade.controller';
import { EntidadeService } from './entidades/entidade.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EntidadeEntity, EspecialidadeMedicaEntity]), // Incluindo ambas as entidades
  ],
  controllers: [EntidadeController],
  providers: [EntidadeService],
})
export class EntidadeModule {}
export { Module };

