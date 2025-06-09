import { IsString, IsDateString, IsOptional, IsInt } from 'class-validator';

export class CreateReparacionDto {
  @IsString()
  nombreCliente: string;

  @IsString()
  equipo: string;

  @IsString()
  descripcionFalla: string;

  @IsString()
  estado: string;

  @IsOptional()
  @IsString()
  tecnicoAsignado?: string;

  @IsDateString()
  fechaIngreso: string;

  @IsOptional()
  @IsDateString()
  fechaEntrega?: string;

  @IsString()
  emailCliente: string;

  @IsInt()
  clienteId: number;
}
