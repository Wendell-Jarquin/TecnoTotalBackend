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
    const equipo = this.equipoRepository.create(createEquipoDto);
    return this.equipoRepository.save(equipo);
  }

  async findAll() {
    return this.equipoRepository.find();
  }

  async findOne(id: number) {
    const equipo = await this.equipoRepository.findOne({ where: { id } });
    if (!equipo) throw new NotFoundException('Equipo no encontrado');
    return equipo;
  }

  async update(id: number, updateEquipoDto: Partial<CreateEquipoDto>) {
    await this.equipoRepository.update(id, updateEquipoDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const equipo = await this.findOne(id);
    await this.equipoRepository.remove(equipo);
    return { message: 'Equipo eliminado correctamente' };
  }
}