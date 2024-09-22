import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaldosPeriodosService } from './saldos-periodos.service';
import { CreateSaldosPeriodoDto } from './dto/create-saldos-periodo.dto';
import { UpdateSaldosPeriodoDto } from './dto/update-saldos-periodo.dto';

@Controller('saldos-periodos')
export class SaldosPeriodosController {
  constructor(private readonly saldosPeriodosService: SaldosPeriodosService) {}

  @Post()
  create(@Body() createSaldosPeriodoDto: CreateSaldosPeriodoDto) {
    return this.saldosPeriodosService.create(createSaldosPeriodoDto);
  }

  @Get()
  findAll() {
    return this.saldosPeriodosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saldosPeriodosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaldosPeriodoDto: UpdateSaldosPeriodoDto) {
    return this.saldosPeriodosService.update(+id, updateSaldosPeriodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saldosPeriodosService.remove(+id);
  }
}
