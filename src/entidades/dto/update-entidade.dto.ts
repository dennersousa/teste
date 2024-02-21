import { IsOptional, IsString, IsDate, IsBoolean, ArrayNotEmpty } from 'class-validator';

export class UpdateEntidadeDto {
  @IsOptional()
  @IsString()
  razaoSocial?: string;

  @IsOptional()
  @IsString()
  nomeFantasia?: string;

  @IsOptional()
  @IsString()
  cnpj?: string;

  @IsOptional()
  @IsString()
  regional?: string;

  @IsOptional()
  @IsDate()
  dataInauguracao?: Date;

  @IsOptional()
  @IsBoolean()
  ativa?: boolean;

  @IsOptional()
  @ArrayNotEmpty()
  especialidadesMedicas?: string[]; // IDs das especialidades médicas

  constructor(especialidadesMedicas?: string[]) {
    if (especialidadesMedicas && especialidadesMedicas.length === 0) {
      throw new Error('Erro: Array de especialidades médicas deve ter pelo menos 1 elemento.');
    }
    this.especialidadesMedicas = especialidadesMedicas;
  }
}
