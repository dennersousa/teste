import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { EspecialidadeMedicaEntity } from './especialidade-medica.entity';

@Entity({ name: 'entidades' }) // Define o nome da tabela no banco de dados
export class EntidadeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
    eager: true, // Carrega as especialidades médicas relacionadas automaticamente
  })
  @JoinTable({
    name: 'entidades_especialidades_medicas', // Define o nome da tabela de junção
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
