import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { EspecialidadeMedicaEntity } from './especialidade-medica.entity';

@Entity({ name: 'entidades' })
export class EntidadeEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  razaoSocial: string;

  @Column({ nullable: false })
  nomeFantasia: string;

  @Column({ type: 'bigint', nullable: false, unique: true })
  cnpj: string;

  @Column({ nullable: false })
  regional: string;

  @Column({ type: 'date', nullable: false })
  dataInauguracao: Date;

  @Column({ default: true })
  ativa: boolean;

  @ManyToMany(() => EspecialidadeMedicaEntity, {
    eager: true,
  })
  @JoinTable({
    name: 'entidades_especialidades_medicas',
    joinColumn: {
      name: 'entidade_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'especialidade_medica_id',
      referencedColumnName: 'id',
    },
  })
  especialidadesMedicas: EspecialidadeMedicaEntity[];
}
