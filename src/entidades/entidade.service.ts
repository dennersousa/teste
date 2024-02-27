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

  /**
   * Retorna todas as entidades.
   */
  async findAll(): Promise<EntidadeEntity[]> {
    return await this.entidadeRepository.find();
  }

  /**
   * Retorna uma entidade pelo ID.
   * @param id O ID da entidade.
   */
  async findOne(id: number): Promise<EntidadeEntity | undefined> {
    return await this.entidadeRepository.findOneBy({ id: id });
  }

  /**
   * Cria uma nova entidade.
   * @param dto Os dados da entidade.
   */
  async create(dto: CreateEntidadeDto): Promise<EntidadeEntity> {
    const entidade = new EntidadeEntity();
    entidade.razaoSocial = dto.razaoSocial;
    entidade.nomeFantasia = dto.nomeFantasia;
    entidade.cnpj = dto.cnpj;
    entidade.regional = dto.regional;
    entidade.dataInauguracao = dto.dataInauguracao;
    entidade.ativa = dto.ativa;
    return await this.entidadeRepository.save(entidade);
  }

  /**
   * Atualiza uma entidade pelo ID.
   * @param id O ID da entidade.
   * @param dto Os dados atualizados da entidade.
   */
  async update(id: number, dto: UpdateEntidadeDto): Promise<EntidadeEntity> {
    const entidade = await this.entidadeRepository.findOneBy({ id: id });
    if (!entidade) {
      throw new Error(`Entidade com ID ${id} não existe`);
    }
    entidade.razaoSocial = dto.razaoSocial ?? entidade.razaoSocial;
    entidade.nomeFantasia = dto.nomeFantasia ?? entidade.nomeFantasia;
    entidade.cnpj = dto.cnpj ?? entidade.cnpj;
    entidade.regional = dto.regional ?? entidade.regional;
    entidade.dataInauguracao = dto.dataInauguracao ?? entidade.dataInauguracao;
    entidade.ativa = dto.ativa ?? entidade.ativa;
    return await this.entidadeRepository.save(entidade);
  }

  /**
   * Exclui uma entidade pelo ID.
   * @param id O ID da entidade.
   */
  async delete(id: number): Promise<void> {
    const entity = await this.entidadeRepository.findOneBy({ id });
    if (!entity) {
      throw new Error(`Entidade com ID ${id} não existe`);
    }
    // Remover relacionamentos many-to-many antes de excluir a entidade
    entity.especialidadesMedicas = [];
    await this.entidadeRepository.delete(entity);
  }
}
