// src/notificaciones/notificacion.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Notificacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  correoCliente: string;

  @Column()
  nombreCliente: string;

  @Column()
  equipo: string;

  @Column('simple-array')
  componentes: string[];

  @Column()
  detalles: string;

  @CreateDateColumn()
  fecha: Date;
}
