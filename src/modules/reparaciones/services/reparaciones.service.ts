import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateReparacionDto } from '../dto/reparaciones.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reparacion } from '../entities/reparaciones.entity';
import { User } from '../../../auth/entities/auth.entity';
import { MailerService } from '@nestjs-modules/mailer'; // Importa el MailerService

@Injectable()
export class ReparacionesService {
  constructor(
    @InjectRepository(Reparacion)
    private readonly reparacionRepository: Repository<Reparacion>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailerService: MailerService, // Inyecta el MailerService
  ) {}

  async create(createReparacionDto: CreateReparacionDto) {
    try {
      const reparacion = this.reparacionRepository.create(createReparacionDto);
      await this.reparacionRepository.save(reparacion);

      // Usa el email y nombre del DTO para el correo
      const emailCliente = createReparacionDto.emailCliente;
      const nombreCliente = createReparacionDto.nombreCliente;

      console.log('DTO recibido:', createReparacionDto);
      console.log('Email a notificar:', createReparacionDto.emailCliente);

      if (emailCliente) {
        try {
          await this.mailerService.sendMail({
            to: emailCliente,
            subject: 'Registro de reparación',
            text: `Hola ${nombreCliente || 'cliente'}, tu equipo fue registrado correctamente. Te notificaremos los próximos avances.`,
            html: `<p>Hola <b>${nombreCliente || 'cliente'}</b>, tu equipo fue registrado correctamente.<br>Te notificaremos los próximos avances.</p>`,
          });
          console.log('Correo enviado a:', emailCliente);
        } catch (error) {
          console.error('Error enviando correo:', error);
        }
      } else {
        console.warn('No se encontró emailCliente, no se envió correo.');
      }

      return reparacion;
    } catch (error) {
      // Manejo de errores
      throw new InternalServerErrorException('Error al crear la reparación');
    }
  }

  async findAll(page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;
      const [reparaciones, total] =
        await this.reparacionRepository.findAndCount({
          skip,
          take: limit,
          relations: ['user', 'cliente'], // Incluye la relación con el usuario y cliente
        });

      const totalPages = Math.ceil(total / limit);

      return {
        data: reparaciones, // Devuelve solo los datos
        pagination: {
          total,
          page,
          pageSize: limit,
          totalPages,
        },
      };
    } catch (error) {
      console.error('Error al obtener las reparaciones:', error);
      throw new InternalServerErrorException(
        'Error al obtener las reparaciones',
      );
    }
  }

  async findOne(id: number) {
    try {
      const reparacion = await this.reparacionRepository.findOne({
        where: { id },
      });
      if (!reparacion) {
        throw new NotFoundException(`Reparación con ID ${id} no encontrada`);
      }
      return reparacion;
    } catch (error) {
      console.error('Error al obtener la reparación:', error);
      throw error;
    }
  }

  async update(id: number, updateReparacionDto: Partial<CreateReparacionDto>) {
    try {
      const reparacion = await this.findOne(id);
      Object.assign(reparacion, updateReparacionDto);
      await this.reparacionRepository.save(reparacion);
      return reparacion;
    } catch (error) {
      console.error('Error al actualizar la reparación:', error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const reparacion = await this.findOne(id);
      await this.reparacionRepository.remove(reparacion);
      return { message: `Reparación con ID ${id} eliminada exitosamente` };
    } catch (error) {
      console.error('Error al eliminar la reparación:', error);
      throw error;
    }
  }

  // Ejemplo usando TypeORM Repository
  async findUserWithRepairs(userId: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['reparaciones'],
      });
      return user;
    } catch (error) {
      console.error('Error al obtener el usuario con reparaciones:', error);
      throw error;
    }
  }
}
