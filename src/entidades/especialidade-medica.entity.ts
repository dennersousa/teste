import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'especialidades_medicas' }) // Define o nome da tabela no banco de dados
export class EspecialidadeMedicaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  nome: string;
}
