import { Injectable } from '@nestjs/common';
import { CreateFoliosPolizasPeriodoDto } from './dto/create-folios-polizas-periodo.dto';
import { UpdateFoliosPolizasPeriodoDto } from './dto/update-folios-polizas-periodo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FoliosPolizasPeriodo } from './entities/folios-polizas-periodo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FoliosPolizasPeriodoService {

  constructor(
    @InjectRepository(FoliosPolizasPeriodo)
    private foliosPolizasPeriodoRepository : Repository<FoliosPolizasPeriodo>
  ){

  }

  async create(createFoliosPolizasPeriodoDto: CreateFoliosPolizasPeriodoDto) {
    return this.foliosPolizasPeriodoRepository.save(createFoliosPolizasPeriodoDto);
  }

  async findAll() {
    return this.foliosPolizasPeriodoRepository.find() ;
  }

  async findOne( id_folio_poliza_periodo: number) {
    return this.foliosPolizasPeriodoRepository.findOneBy({id_folio_poliza_periodo}) ;
  }

   async update(id_folio_poliza_periodo: number, updateFoliosPolizasPeriodoDto: UpdateFoliosPolizasPeriodoDto) {
    return await this.foliosPolizasPeriodoRepository.update({id_folio_poliza_periodo},updateFoliosPolizasPeriodoDto);
  }

  async remove(id_folio_poliza_periodo: number) {
    return await this.foliosPolizasPeriodoRepository.softDelete(id_folio_poliza_periodo);
  }
}
