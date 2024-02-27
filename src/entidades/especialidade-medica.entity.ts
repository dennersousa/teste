import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { EntidadeEntity } from './entidade.entity';

@Entity({ name: 'especialidades_medicas' })
export class EspecialidadeMedicaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: true })
  descricao?: string;

  @Column({ nullable: true })
  codigoReferencia?: string;

  @OneToMany(() => EntidadeEntity, (entidade) => entidade.especialidadesMedicas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'especialidade_medica_id' })
  entidades: EntidadeEntity[];
}
