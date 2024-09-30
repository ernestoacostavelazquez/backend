import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FoliosPolizasPeriodoService } from './folios-polizas-periodo.service';
import { CreateFoliosPolizasPeriodoDto } from './dto/create-folios-polizas-periodo.dto';
import { UpdateFoliosPolizasPeriodoDto } from './dto/update-folios-polizas-periodo.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('FoliosPolizasPeriodo')
@Controller('FoliosPolizasPeriodo')
export class FoliosPolizasPeriodoController {
  constructor(private readonly foliosPolizasPeriodoService: FoliosPolizasPeriodoService) {}

  @Post()
  create(@Body() createFoliosPolizasPeriodoDto: CreateFoliosPolizasPeriodoDto) {
    return this.foliosPolizasPeriodoService.create(createFoliosPolizasPeriodoDto);
  }

  @Get()
  findAll() {
    return this.foliosPolizasPeriodoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foliosPolizasPeriodoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoliosPolizasPeriodoDto: UpdateFoliosPolizasPeriodoDto) {
    return this.foliosPolizasPeriodoService.update(+id, updateFoliosPolizasPeriodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foliosPolizasPeriodoService.remove(+id);
  }
}
