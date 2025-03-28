import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ModelosService } from './modelos.service';
import { CreateModeloDto } from './dto/create-modelo.dto';
import { UpdateModeloDto } from './dto/update-modelo.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('Modelos')
@Controller('Modelos')
export class ModelosController {
  constructor(private readonly modelosService: ModelosService) {}

  @Post()
  create(@Body() createModeloDto: CreateModeloDto) {
    return this.modelosService.create(createModeloDto);
  }

  @Get()
  findAll() {
    return this.modelosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modelosService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateModeloDto: UpdateModeloDto) {
    return this.modelosService.update(+id, updateModeloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modelosService.remove(+id);
  }
}
