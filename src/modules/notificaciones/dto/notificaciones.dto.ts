import { IsEmail, IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateNotificacionDto {
  @IsEmail()
  correoCliente: string;

  @IsString()
  nombreCliente: string;

  @IsString()
  equipo: string;

  @IsArray()
  @ArrayNotEmpty()
  componentes: string[];

  @IsString()
  detalles: string;
}
