import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateReparacionDto } from '../dto/reparaciones.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reparacion } from '../entities/reparaciones.entity';
import { Cliente } from 'src/modules/clientes/entities/cliente.entity';
import { MailerService } from '@nestjs-modules/mailer'; // Importa el MailerService

@Injectable()
export class ReparacionesService {
  constructor(
    @InjectRepository(Reparacion)
    private readonly reparacionRepository: Repository<Reparacion>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>, // Cambia User por Cliente
    private readonly mailerService: MailerService, // Inyecta el MailerService
  ) {}
  async create(createReparacionDto: CreateReparacionDto) {
    try {
      // Busca el cliente por ID
      const cliente = await this.clienteRepository.findOne({
        where: { clientes_id: createReparacionDto.clienteId },
      });
      if (!cliente) {
        throw new NotFoundException('Cliente no encontrado');
      }

      const reparacion = this.reparacionRepository.create({
        ...createReparacionDto,
        cliente,
      });
      await this.reparacionRepository.save(reparacion);

      return reparacion;
    } catch (error) {
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
          relations: ['cliente'],
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
        relations: ['cliente'], // ¡Esto es lo importante!
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

  async asociarImagen(id: number, imagen: string) {
    const reparacion = await this.findOne(id);
    reparacion.imagen = imagen;
    await this.reparacionRepository.save(reparacion);
    return reparacion;
  }
}
