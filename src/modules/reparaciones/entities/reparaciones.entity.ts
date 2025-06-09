import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../../auth/entities/auth.entity';
import { Cliente } from '../../clientes/entities/cliente.entity';

@Entity('reparaciones')
export class Reparacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombreCliente: string;

  @Column({ type: 'varchar', length: 255 })
  equipo: string;

  @Column({ type: 'text' })
  descripcionFalla: string;

  @Column({ type: 'varchar', length: 50 })
  estado: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  tecnicoAsignado?: string;

  @Column({ type: 'date' })
  fechaIngreso: Date;

  @Column({ type: 'date', nullable: true })
  fechaEntrega?: Date;

  @ManyToOne(() => Cliente, (cliente) => cliente.reparaciones)
  cliente: Cliente;
}
