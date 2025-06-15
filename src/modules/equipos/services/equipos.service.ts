import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipo } from '../entities/equipos.entity';
import { CreateEquipoDto } from '../dto/equipos.dto';

@Injectable()
export class EquiposService {
  constructor(
    @InjectRepository(Equipo)
    private readonly equipoRepository: Repository<Equipo>,
  ) {}

  async create(createEquipoDto: CreateEquipoDto) {
    // Verifica si ya existe un equipo con el mismo nombre, marca y modelo
    const existe = await this.equipoRepository.findOne({
      where: {
        marca: createEquipoDto.marca,
        modelo: createEquipoDto.modelo,
      },
    });
    if (existe) {
      throw new Error('Ya existe un equipo con esos datos');
    }
    // Si no existe, crea el equipo (el id se genera solo)
    const equipo = this.equipoRepository.create(createEquipoDto);
    return await this.equipoRepository.save(equipo);
  }

  async findAll() {
    return this.equipoRepository.find();
  }

  async findOne(id: string) {
    const equipo = await this.equipoRepository.findOne({ where: { id } });
    if (!equipo) throw new NotFoundException('Equipo no encontrado');
    return equipo;
  }

  async update(id: string, updateEquipoDto: Partial<CreateEquipoDto>) {
    await this.equipoRepository.update(id, updateEquipoDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const equipo = await this.findOne(id);
    await this.equipoRepository.remove(equipo);
    return { message: 'Equipo eliminado correctamente' };
  }
}
