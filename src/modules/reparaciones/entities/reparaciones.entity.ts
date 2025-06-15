import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
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

  @Column({ type: 'varchar', length: 255, nullable: true })
  imagen?: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.reparaciones, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'clienteId', referencedColumnName: 'clientes_id' })
  cliente: Cliente;

  @Column()
  clienteId: number;
}
