import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { FamiliasService } from './familias.service';
import { CreateFamiliaDto } from './dto/create-familia.dto';
import { UpdateFamiliaDto } from './dto/update-familia.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('Familias')

@Controller('Familias')
export class FamiliasController {
  constructor(private readonly familiasService: FamiliasService) {}

  @Post()
  create(@Body() createFamiliaDto: CreateFamiliaDto) {
    return this.familiasService.create(createFamiliaDto);
  }

  @Get()
  findAll() {
    return this.familiasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.familiasService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFamiliaDto: UpdateFamiliaDto) {
    return this.familiasService.update(+id, updateFamiliaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.familiasService.remove(+id);
  }
}
