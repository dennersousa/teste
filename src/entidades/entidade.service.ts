import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntidadeEntity } from './entidade.entity';
import { CreateEntidadeDto } from './dto/create-entidade.dto';
import { UpdateEntidadeDto } from './dto/update-entidade.dto';
import { EspecialidadeMedicaEntity } from './especialidade-medica.entity';

@Injectable()
export class EntidadeService {
  constructor(
    @InjectRepository(EntidadeEntity)
    private readonly entidadeRepository: Repository<EntidadeEntity>,
  ) {}

  async findAll(): Promise<EntidadeEntity[]> {
    return await this.entidadeRepository.find({
      relations: ['especialidadesMedicas'],
    });
  }

  async findOne(id: string): Promise<EntidadeEntity | undefined> {
    return await this.entidadeRepository.findOne({
      where: { id },
      relations: ['especialidadesMedicas'],
    });
  }

  async create(dto: CreateEntidadeDto): Promise<EntidadeEntity> {
    const entity = new EntidadeEntity();
    entity.razaoSocial = dto.razaoSocial;
    entity.nomeFantasia = dto.nomeFantasia;
    entity.cnpj = dto.cnpj;
    entity.regional = dto.regional;
    entity.dataInauguracao = dto.dataInauguracao;
    entity.ativa = dto.ativa;

    if (dto.especialidadesMedicas) {
      entity.especialidadesMedicas = await Promise.all(
        dto.especialidadesMedicas.map(async (especialidadeMedicaId) => {
          return await this.entidadeRepository.manager.findOne(
            EspecialidadeMedicaEntity,
            { where: { id: especialidadeMedicaId } },
          );
        }),
      );
    }

    return await this.entidadeRepository.save(entity);
  }

  async update(id: string, dto: UpdateEntidadeDto): Promise<EntidadeEntity> {
    const entity = await this.entidadeRepository.findOne({ where: { id } });

    entity.razaoSocial = dto.razaoSocial ?? entity.razaoSocial;
    entity.nomeFantasia = dto.nomeFantasia ?? entity.nomeFantasia;
    entity.cnpj = dto.cnpj ?? entity.cnpj;
    entity.regional = dto.regional ?? entity.regional;
    entity.dataInauguracao = dto.dataInauguracao ?? entity.dataInauguracao;
    entity.ativa = dto.ativa ?? entity.ativa;

    if (dto.especialidadesMedicas) {
      entity.especialidadesMedicas = await Promise.all(
        dto.especialidadesMedicas.map(async (especialidadeMedicaId) => {
          return await this.entidadeRepository.manager.findOne(
            EspecialidadeMedicaEntity,
            { where: { id: especialidadeMedicaId } },
          );
        }),
      );
    }

    return await this.entidadeRepository.save(entity);
  }

  async delete(id: string): Promise<void> {
    await this.entidadeRepository.delete({ id });
  }
}
