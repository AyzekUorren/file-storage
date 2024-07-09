import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { File } from './file.entity';
import { Folder } from './folder.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    nullable: true,
  })
  @JoinColumn()
  user: User;

  @OneToOne(() => File, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    nullable: true,
  })
  @JoinColumn()
  file: File;

  @OneToOne(() => Folder, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    nullable: true,
  })
  @JoinColumn()
  folder: Folder;

  @Column({ default: false })
  canView: boolean;

  @Column({ default: false })
  canEdit: boolean;
}
