import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  movieId: string;

  @Column({ nullable: true })
  comment: string;

  @Column({ type: 'int', default: 0 })
  rating: number;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;
}
