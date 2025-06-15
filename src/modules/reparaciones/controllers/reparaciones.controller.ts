import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReparacionesService } from '../services/reparaciones.service';
import { CreateReparacionDto } from '../dto/reparaciones.dto';
import { Auth } from '../../../auth/decorators/auth.decorator';
import { ValidRoles } from '../../../auth/interfaces';
import { MailerService } from '@nestjs-modules/mailer';
import { extname } from 'path';
import { diskStorage } from 'multer';
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

  @Post(':id/upload-imagen')
  @UseInterceptors(FileInterceptor('imagen', {
    storage: diskStorage({
      destination: './uploads/reparaciones',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname)); // agrega la extensión
      },
    }),
  }))
  async uploadImagen(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const rutaImagen = `/uploads/reparaciones/${file.filename}`;
    const reparacion = await this.reparacionesService.asociarImagen(Number(id), rutaImagen);
    return {
      message: 'Imagen asociada correctamente',
      reparacion,
    };
  }
}
