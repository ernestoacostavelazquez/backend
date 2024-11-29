import { Controller, Get, Post, Body,  Param, Delete, Put } from '@nestjs/common';
import { SubCategoriasService } from './sub-categorias.service';
import { CreateSubCategoriaDto } from './dto/create-sub-categoria.dto';
import { UpdateSubCategoriaDto } from './dto/update-sub-categoria.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('SubCategorias')
@Controller('SubCategorias')
export class SubCategoriasController {
  constructor(private readonly subCategoriasService: SubCategoriasService) {}

  @Post()
  create(@Body() createSubCategoriaDto: CreateSubCategoriaDto) {
    return this.subCategoriasService.create(createSubCategoriaDto);
  }

  @Get()
  findAll() {
    return this.subCategoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subCategoriasService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSubCategoriaDto: UpdateSubCategoriaDto) {
    return this.subCategoriasService.update(+id, updateSubCategoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subCategoriasService.remove(+id);
  }
}
