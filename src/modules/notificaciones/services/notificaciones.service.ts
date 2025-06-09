// src/notificaciones/notificaciones.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notificacion } from '../entities/notificacion.entity';
import { Repository } from 'typeorm';
import { MailService } from '../../../mail/mail.service';

@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(Notificacion)
    private readonly notificacionRepo: Repository<Notificacion>,
    private readonly mailService: MailService,
  ) {}

  async notificarCliente(
    correoCliente: string,
    nombreCliente: string,
    equipo: string,
    componentes: string[],
    detalles: string,
  ) {
    // Guardar en la base de datos
    const notificacion = this.notificacionRepo.create({
      correoCliente,
      nombreCliente,
      equipo,
      componentes,
      detalles,
    });
    await this.notificacionRepo.save(notificacion);

    // Enviar el correo
    const subject = `Actualización de reparación para tu equipo: ${equipo}`;
    const text = `
Hola ${nombreCliente},

Te informamos que tu equipo "${equipo}" ha sido actualizado.

Componentes utilizados:
${componentes.map(c => `- ${c}`).join('\n')}

Detalles del trabajo realizado:
${detalles}

¡Gracias por confiar en nosotros!
`;

    const html = `
  <div style="background:#0a2540;padding:40px 0;">
    <table align="center" cellpadding="0" cellspacing="0" style="max-width:500px;width:100%;background:#0a2540;border-radius:16px;box-shadow:0 4px 24px rgba(10,37,64,0.10);">
      <tr>
        <td style="padding:0;">
          <!-- Título principal -->
          <div style="background:#0a2540;border-radius:16px 16px 0 0;padding:28px 0 18px 0;text-align:center;">
            <h1 style="color:#ff8800;font-family:Arial,sans-serif;font-size:24px;margin:0;">
              Actualización de estado de su computadora
            </h1>
          </div>
          <!-- Cuadro interno claro para la información -->
          <div style="padding:32px 24px 0 24px;">
            <table align="center" cellpadding="0" cellspacing="0" style="width:100%;background:#f8fafc;border-radius:12px;">
              <tr>
                <td style="padding:24px 18px;font-family:Arial,sans-serif;">
                  <h2 style="color:#222;margin-bottom:12px;text-align:center;">¡Hola, ${nombreCliente}!</h2>
                  <p style="color:#222;font-size:16px;margin-bottom:24px;text-align:center;">
                    Tu equipo con identificacion <b style="color:#ff8800;">"${equipo}"</b> ha sido actualizado.
                  </p>
                  <div style="text-align:left;margin-bottom:18px;">
                    <strong style="color:#222;">Componentes utilizados:</strong>
                    <ul style="color:#222;padding-left:18px;margin:8px 0;">
                      ${componentes.map(c => `<li>${c}</li>`).join('')}
                    </ul>
                  </div>
                  <div style="text-align:left;margin-bottom:18px;">
                    <strong style="color:#222;">Detalles del trabajo realizado:</strong>
                    <div style="color:#222;margin-top:6px;">${detalles}</div>
                  </div>
                </td>
              </tr>
            </table>
            <div style="text-align:center;margin:32px 0 12px 0;">
              <p style="color:#ff8800;font-weight:bold;font-size:17px;margin:0;">
                ¡Gracias por confiar en nosotros!
              </p>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
`;

    await this.mailService.sendMail(correoCliente, subject, text, html);

    return { message: 'Aviso enviado y guardado' };
  }
}