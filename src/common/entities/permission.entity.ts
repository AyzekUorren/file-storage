import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ nullable: true })
  fileId: number;

  @Column({ nullable: true })
  folderId: number;

  @Column({ default: false })
  canView: boolean;

  @Column({ default: false })
  canEdit: boolean;
}
