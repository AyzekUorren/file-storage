import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { File } from './file.entity';
import { Folder } from './folder.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @OneToOne(() => User, { onDelete: 'CASCADE', onUpdate: 'NO ACTION' })
  userId: number;

  @Column({ nullable: true })
  @OneToOne(() => File, { onDelete: 'CASCADE', onUpdate: 'NO ACTION' })
  fileId: number;

  @Column({ nullable: true })
  @OneToOne(() => Folder, { onDelete: 'CASCADE', onUpdate: 'NO ACTION' })
  folderId: number;

  @Column({ default: false })
  canView: boolean;

  @Column({ default: false })
  canEdit: boolean;
}
