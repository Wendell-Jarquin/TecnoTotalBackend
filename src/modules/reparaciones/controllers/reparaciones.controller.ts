import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ReparacionesService } from '../services/reparaciones.service';
import { CreateReparacionDto } from '../dto/reparaciones.dto';
import { Auth } from '../../../auth/decorators/auth.decorator';
import { ValidRoles } from '../../../auth/interfaces';

@Controller('reparaciones')
export class ReparacionesController {
  constructor(private readonly reparacionesService: ReparacionesService) {}

  @Get()
  getAllClientes(
    @Query('page') page = 1, // Página actual (por defecto es 1)
    @Query('limit') limit = 10 // Número de resultados por página (por defecto es 10)
  ) {
    return this.reparacionesService.findAll(Number(page), Number(limit));
  }

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createReparacionDto: CreateReparacionDto) {
    return this.reparacionesService.create(createReparacionDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reparacionesService.findOne(Number(id));
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateReparacionDto>
  ) {
    return this.reparacionesService.update(Number(id), updateData);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id') id: string) {
    return this.reparacionesService.remove(Number(id));
  }
}
