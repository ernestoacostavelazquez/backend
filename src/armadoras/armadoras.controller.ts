import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ArmadorasService } from './armadoras.service';
import { CreateArmadoraDto } from './dto/create-armadora.dto';
import { UpdateArmadoraDto } from './dto/update-armadora.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('Armadoras')
@Controller('Armadoras')
export class ArmadorasController {
  constructor(private readonly armadorasService: ArmadorasService) {}

  @Post()
  create(@Body() createArmadoraDto: CreateArmadoraDto) {
    return this.armadorasService.create(createArmadoraDto);
  }

  @Get()
  findAll() {
    return this.armadorasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.armadorasService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateArmadoraDto: UpdateArmadoraDto) {
    return this.armadorasService.update(+id, updateArmadoraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.armadorasService.remove(+id);
  }
}
