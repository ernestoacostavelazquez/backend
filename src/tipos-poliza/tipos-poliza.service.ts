import { Injectable } from '@nestjs/common';
import { CreateTiposPolizaDto } from './dto/create-tipos-poliza.dto';
import { UpdateTiposPolizaDto } from './dto/update-tipos-poliza.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TiposPoliza } from './entities/tipos-poliza.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TiposPolizaService {

  constructor(
    @InjectRepository(TiposPoliza)
    private tipospolizaRepository:Repository<TiposPoliza>
  ){

  }
  async create(createTiposPolizaDto: CreateTiposPolizaDto) {
    return await this.tipospolizaRepository.save(createTiposPolizaDto);
  }

  async findAll() {
    return await this.tipospolizaRepository.find();
  }

  async findOne(id_tipo_poliza: number) {
    return await this.tipospolizaRepository.findOneBy({id_tipo_poliza});
  }

  async update(id_tipo_poliza: number, updateTiposPolizaDto: UpdateTiposPolizaDto) {
    return await this.tipospolizaRepository.update({id_tipo_poliza},updateTiposPolizaDto);
  }

  async remove(id_tipo_poliza: number) {
    return await this.tipospolizaRepository.softDelete(id_tipo_poliza);
  }
}
