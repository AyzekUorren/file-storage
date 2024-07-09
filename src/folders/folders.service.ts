import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Folder } from '../common/entities/folder.entity';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folder)
    private foldersRepository: Repository<Folder>,
  ) {}

  create(createFolderDto: CreateFolderDto) {
    const folder = this.foldersRepository.create(createFolderDto);
    return this.foldersRepository.save(folder);
  }

  findAll() {
    return this.foldersRepository.find();
  }

  findOne(id: number) {
    return this.foldersRepository.findOneBy({ id });
  }

  update(id: number, updateFolderDto: UpdateFolderDto) {
    return this.foldersRepository.update(id, updateFolderDto);
  }

  remove(id: number) {
    return this.foldersRepository.delete(id);
  }
}
