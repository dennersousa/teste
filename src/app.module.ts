import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntidadeModule } from './entidades/entidade.module';
import { EntidadeEntity } from './entidades/entidade.entity';
import { EspecialidadeMedicaEntity } from './entidades/especialidade-medica.entity';

@Module({
  imports: [
    EntidadeModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [EntidadeEntity, EspecialidadeMedicaEntity],
      synchronize: true,
    }), // Incluindo ambas as entidades
  ],
  exports: [TypeOrmModule],
})
export class AppModule {}
export { Module };
