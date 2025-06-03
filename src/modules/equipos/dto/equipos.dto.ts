import { IsString, Length, IsOptional } from 'class-validator';

export class CreateEquipoDto {
  @IsString()
  @Length(2, 100)
  nombre: string;

  @IsString()
  @Length(2, 100)
  marca: string;

  @IsString()
  @Length(2, 100)
  modelo: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @Length(2, 100)
  estado: string;

}