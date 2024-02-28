import { IsOptional, IsString, IsDate, IsBoolean, ArrayNotEmpty, Length } from 'class-validator';

export class UpdateEntidadeDto {
  @IsOptional()
  @IsString()
  razaoSocial?: string;

  @IsOptional()
  @IsString()
  nomeFantasia?: string;

  @IsOptional()
  @IsString()
  @Length(14, 14, { message: 'A string deve conter exatamente 14 letras.' })
  cnpj: string;

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
