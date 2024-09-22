import { Injectable } from '@nestjs/common';
import { CreateDetallesPolizaDto } from './dto/create-detalles-poliza.dto';
import { UpdateDetallesPolizaDto } from './dto/update-detalles-poliza.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetallesPoliza } from './entities/detalles-poliza.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DetallesPolizasService {

  constructor(
    @InjectRepository(DetallesPoliza)
    private detallepolizaRepository:Repository<DetallesPoliza>
  ){

  }

  async create(createDetallesPolizaDto: CreateDetallesPolizaDto) {
    return await this.detallepolizaRepository.save(createDetallesPolizaDto);
  }

  async findAll() {
    return await this.detallepolizaRepository.find();
  }

  async findOne(id_detalle: number) {
    return await this.detallepolizaRepository.findOneBy({id_detalle});
  }

  async update(id_detalle: number, updateDetallesPolizaDto: UpdateDetallesPolizaDto) {
    return await this.detallepolizaRepository.update({id_detalle},updateDetallesPolizaDto);
  }

  async remove(id_detalle: number) {
    return await this.detallepolizaRepository.softDelete({id_detalle});
  }
}
