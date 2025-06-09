import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ValidRoles } from '../../../auth/interfaces';
import { CreateClienteDto } from '../dto/cliente.dto';
import { ClientesService } from '../services/clientes.service';
import { Auth } from '../../../auth/decorators/auth.decorator';
import { Cliente } from '../entities/cliente.entity';
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Get()
  @Auth(ValidRoles.admin)
  getAllClientes(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.clientesService.findAll(Number(page), Number(limit));
  }

  @Get(':clientes_id')
  findOne(@Param('clientes_id') clientes_id: number) {
    return this.clientesService.findOne(Number(clientes_id));
  }

  @Post()
  @Auth(ValidRoles.admin)
  createCliente(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }

  @Put(':id')
  @Auth(ValidRoles.admin)
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<Cliente>
  ): Promise<Cliente> {
    return await this.clientesService.update(id, updateData);
  }

  @Delete(':clientes_id')
  @Auth(ValidRoles.admin)
  removeCliente(@Param('clientes_id') clientes_id: number) {
    return this.clientesService.remove(Number(clientes_id));
  }
}
