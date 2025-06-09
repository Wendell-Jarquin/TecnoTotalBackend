import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ClientesModule } from './modules/clientes/clientes.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesController } from './modules/clientes/controllers/clientes.controller';
import { TecnicosModule } from './modules/tecnicos/tecnicos.module';
import { TecnicosService } from './modules/tecnicos/services/tecnicos.service';
import { TecnicosController } from './modules/tecnicos/controllers/tecnicos.controller';
import { Tecnico } from './modules/tecnicos/entities/tecnico.entity';
import { ReparacionesModule } from './modules/reparaciones/reparaciones.module';
import { ProveedoresModule } from './modules/proveedores/proveedores.module';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';
import { ExcelModule } from './excel/excel.module';
import { EquiposModule } from './modules/equipos/equipos.module';
import { MailModule } from './mail/mail.module';
import { NotificacionesModule } from './modules/notificaciones/notificaciones.module';
@Module({
  imports: [
    // Configuración del mailer
    MailerModule.forRoot({
      transport: {
        host: 'mail.wendelljarxd.com',
        port: 465,
        auth: {
          user: 'tecnototal@wendelljarxd.com',
          pass: '.m3)b~,P0ulF',
        },
      },
      defaults: {
        from: '"TecnoTotal" <no-reply@tecnototal.com>',
      },
    }),
    // Cargar variables de entorno
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),

    // El módulo de Clientes
    ClientesModule,

    TecnicosModule,
    TypeOrmModule.forFeature([Tecnico]),
    ProveedoresModule,
    AuthModule,
    SeedModule,
    ExcelModule,
    EquiposModule,
    ReparacionesModule,
    MailModule,
    NotificacionesModule,
  ],
  controllers: [
    ClientesController, // Registrar el controlador en el módulo
    TecnicosController,
  ],
  providers: [TecnicosService],
})
export class AppModule {}
