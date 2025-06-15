import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { EquiposService } from '../services/equipos.service';
import { CreateEquipoDto } from '../dto/equipos.dto';
import { Auth } from '../../../auth/decorators/auth.decorator';
import { ValidRoles } from '../../../auth/interfaces';

@Controller('equipos')
export class EquiposController {
  constructor(private readonly equiposService: EquiposService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createEquipoDto: CreateEquipoDto) {
    return this.equiposService.create(createEquipoDto);
  }

  @Get()
  findAll() {
    return this.equiposService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equiposService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(@Param('id') id: string, @Body() updateEquipoDto: Partial<CreateEquipoDto>) {
    return this.equiposService.update(id, updateEquipoDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id') id: string) {
    return this.equiposService.remove(id);
  }
}
