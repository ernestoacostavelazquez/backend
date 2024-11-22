import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UnidadesEmpaqueService } from './unidades_empaque.service';
import { CreateUnidadesEmpaqueDto } from './dto/create-unidades_empaque.dto';
import { UpdateUnidadesEmpaqueDto } from './dto/update-unidades_empaque.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('UnidadesEmpaque')
@Controller('UnidadesEmpaque')
export class UnidadesEmpaqueController {
  constructor(private readonly unidadesEmpaqueService: UnidadesEmpaqueService) {}

  @Post()
  create(@Body() createUnidadesEmpaqueDto: CreateUnidadesEmpaqueDto) {
    return this.unidadesEmpaqueService.create(createUnidadesEmpaqueDto);
  }

  @Get()
  findAll() {
    return this.unidadesEmpaqueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unidadesEmpaqueService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUnidadesEmpaqueDto: UpdateUnidadesEmpaqueDto) {
    return this.unidadesEmpaqueService.update(+id, updateUnidadesEmpaqueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unidadesEmpaqueService.remove(+id);
  }
}
