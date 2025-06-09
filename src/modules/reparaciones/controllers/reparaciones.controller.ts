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
import { MailerService } from '@nestjs-modules/mailer';

@Controller('reparaciones')
export class ReparacionesController {
  constructor(
    private readonly reparacionesService: ReparacionesService,
    private readonly mailerService: MailerService,
  ) {}

  @Get()
  getAllClientes(
    @Query('page') page = 1,
    @Query('limit') limit = 10
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
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateReparacionDto>,
  ) {
    const reparacionActualizada = await this.reparacionesService.update(Number(id), updateData);

    // Envía el correo si hay email en la relación cliente
    if (reparacionActualizada.cliente?.Email) {
      await this.mailerService.sendMail({
        to: reparacionActualizada.cliente.Email,
        subject: 'Actualización de tu reparación',
        text: `Hola, tu reparación ha sido actualizada. Estado actual: ${reparacionActualizada.estado}`,
        html: `<p>Hola, tu reparación ha sido actualizada.<br>Estado actual: <b>${reparacionActualizada.estado}</b></p>`,
      });
    }

    return reparacionActualizada;
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id') id: string) {
    return this.reparacionesService.remove(Number(id));
  }
}