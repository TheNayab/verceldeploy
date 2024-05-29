import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    dueDate: Date;
  
    @Column({ default: 'Pending' })
    status: string;
  
    @Column({ default: 'Blue' })
    priority: string;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    dateOfCreation: Date;
  
    @Column({ default: true })
    isActive: boolean;
}
