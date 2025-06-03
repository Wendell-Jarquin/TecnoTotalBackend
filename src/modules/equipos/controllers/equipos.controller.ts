import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { EquiposService } from '../services/equipos.service';
import { CreateEquipoDto } from '../dto/equipos.dto';

@Controller('equipos')
export class EquiposController {
  constructor(private readonly equiposService: EquiposService) {}

  @Post()
  create(@Body() createEquipoDto: CreateEquipoDto) {
    return this.equiposService.create(createEquipoDto);
  }

  @Get()
  findAll() {
    return this.equiposService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.equiposService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateEquipoDto: Partial<CreateEquipoDto>) {
    return this.equiposService.update(Number(id), updateEquipoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.equiposService.remove(Number(id));
  }
}