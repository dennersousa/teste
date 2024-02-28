import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsBoolean,
  ArrayNotEmpty,
  IsArray,
  Max,
  Length,
} from 'class-validator';

export class CreateEntidadeDto {
  @IsNotEmpty()
  @IsString()
  razaoSocial: string;

  @IsNotEmpty()
  @IsString()
  nomeFantasia: string;

  @IsNotEmpty()
  @IsString()
  @Length(14, 14, { message: 'A string deve conter exatamente 14 letras.' })
  cnpj: string;

  @IsNotEmpty()
  @IsString()
  regional: string;

  @IsNotEmpty()
  @IsDate()
  dataInauguracao: Date;

  @IsBoolean()
  ativa: boolean;

  @ArrayNotEmpty()
  @IsArray()
  especialidadesMedicas: string[];

  constructor(especialidadesMedicas?: string[]) {
    if (!especialidadesMedicas || especialidadesMedicas.length === 0) {
      throw new Error(
        'Erro: Array de especialidades médicas deve ter pelo menos 1 elemento.',
      );
    }
    this.especialidadesMedicas = especialidadesMedicas;
  }
}
