import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reparacion } from './entities/reparaciones.entity';
import { User } from '../../auth/entities/auth.entity'; // Importa la entidad User
import { ReparacionesService } from './services/reparaciones.service';
import { ReparacionesController } from './controllers/reparaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Reparacion, User])], // <-- Agrega User aquí
  controllers: [ReparacionesController], // Aquí puedes agregar tus controladores si los tienes
  providers: [ReparacionesService],
  exports: [ReparacionesService], // Exporta el servicio para que otros módulos puedan usarlo
})
export class ReparacionesModule {}
