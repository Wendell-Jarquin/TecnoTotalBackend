// src/notificaciones/notificaciones.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificacionesController } from './controllers/notificaciones.controller';
import { NotificacionesService } from './services/notificaciones.service';
import { Notificacion } from './entities/notificacion.entity';
import { MailModule } from '../../mail/mail.module'; // Adjust the path as necessary
@Module({
  imports: [TypeOrmModule.forFeature([Notificacion]), MailModule],
  providers: [NotificacionesService],
  controllers: [NotificacionesController],
})
export class NotificacionesModule {}
