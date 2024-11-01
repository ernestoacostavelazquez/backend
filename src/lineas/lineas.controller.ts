import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { LineasService } from './lineas.service';
import { CreateLineaDto } from './dto/create-linea.dto';
import { UpdateLineaDto } from './dto/update-linea.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('Lineas')
@Controller('Lineas')
export class LineasController {
  constructor(private readonly lineasService: LineasService) {}

  @Post()
  create(@Body() createLineaDto: CreateLineaDto) {
    return this.lineasService.create(createLineaDto);
  }

  @Get()
  findAll() {
    return this.lineasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lineasService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLineaDto: UpdateLineaDto) {
    return this.lineasService.update(+id, updateLineaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lineasService.remove(+id);
  }
}
