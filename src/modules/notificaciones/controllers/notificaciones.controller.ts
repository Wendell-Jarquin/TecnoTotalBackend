import { Controller, Post, Body } from '@nestjs/common';
import { NotificacionesService } from '../services/notificaciones.service';

@Controller('notificaciones')
export class NotificacionesController {
  constructor(private readonly notificacionesService: NotificacionesService) {}

  @Post('avisar')
  async avisarCliente(
    @Body()
    body: {
      correoCliente: string;
      nombreCliente: string;
      equipo: string;
      componentes: string[];
      detalles: string;
    },
  ) {
    return this.notificacionesService.notificarCliente(
      body.correoCliente,
      body.nombreCliente,
      body.equipo,
      body.componentes,
      body.detalles,
    );
  }
}
