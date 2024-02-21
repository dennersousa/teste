// src/entidades/entidade.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntidadeEntity } from './entidade.entity';
import { EspecialidadeMedicaEntity } from './especialidade-medica.entity';
import { EntidadeController } from './entidade.controller';
import { EntidadeService } from './entidade.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EntidadeEntity, EspecialidadeMedicaEntity], {
      type: 'sqlite', // Especificando o tipo de banco de dados
      database: 'database.sqlite', // Nome do arquivo da base de dados
      entities: ["./**/*.entity{.ts,.js}"],
      synchronize: false, // Desativando a sincronização automática em produção
    }),
  ],
  controllers: [EntidadeController],
  providers: [EntidadeService],
})
export class EntidadeModule {}
export { Module };

