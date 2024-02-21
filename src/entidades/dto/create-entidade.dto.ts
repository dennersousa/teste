import { IsNotEmpty, IsString, IsDate, IsBoolean, ArrayNotEmpty} from 'class-validator';

export class CreateEntidadeDto {
  @IsNotEmpty()
  @IsString()
  razaoSocial: string;

  @IsNotEmpty()
  @IsString()
  nomeFantasia: string;

  @IsNotEmpty()
  @IsString()
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
  especialidadesMedicas: string[]; 

  constructor(especialidadesMedicas?: string[]) {
    if (!especialidadesMedicas || especialidadesMedicas.length === 0) {
      throw new Error('Erro: Array de especialidades médicas deve ter pelo menos 1 elemento.');
    }
    this.especialidadesMedicas = especialidadesMedicas;
  }
}
