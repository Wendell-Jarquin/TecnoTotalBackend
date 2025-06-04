import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TecnicosService } from '../services/tecnicos.service';
import { Tecnico } from '../entities/tecnico.entity';
import { Auth } from '../../../auth/decorators/auth.decorator';
import { ValidRoles } from '../../../auth/interfaces';

@Controller('tecnicos')
export class TecnicosController {
  constructor(private readonly tecnicosService: TecnicosService) {}

  @Post()
  @Auth(ValidRoles.admin)
  async create(@Body() tecnicoData: Partial<Tecnico>): Promise<Tecnico> {
    return await this.tecnicosService.create(tecnicoData);
  }

  @Get()
  async findAll(): Promise<Tecnico[]> {
    return await this.tecnicosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Tecnico> {
    return await this.tecnicosService.findOne(id);
  }

  @Put(':id')
  @Auth(ValidRoles.admin)
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<Tecnico>
  ): Promise<Tecnico> {
    return await this.tecnicosService.update(id, updateData);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  async remove(@Param('id') id: number): Promise<void> {
    return await this.tecnicosService.remove(id);
  }
}
