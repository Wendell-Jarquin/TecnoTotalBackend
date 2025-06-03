import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('equipos')
export class Equipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  marca: string;

 @Column({ type: 'varchar', length: 100 })
  modelo: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  estado?: string;
}