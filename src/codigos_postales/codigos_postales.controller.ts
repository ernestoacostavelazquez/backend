import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CodigosPostalesService } from './codigos_postales.service';
import { CreateCodigosPostaleDto } from './dto/create-codigos_postale.dto';
import { UpdateCodigosPostaleDto } from './dto/update-codigos_postale.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('CodigosPostales')
@Controller('CodigosPostales')
export class CodigosPostalesController {
  constructor(private readonly codigosPostalesService: CodigosPostalesService) {}

  @Post()
  create(@Body() createCodigosPostaleDto: CreateCodigosPostaleDto) {
    return this.codigosPostalesService.create(createCodigosPostaleDto);
  }

  @Get()
  findAll() {
    return this.codigosPostalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.codigosPostalesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCodigosPostaleDto: UpdateCodigosPostaleDto) {
    return this.codigosPostalesService.update(+id, updateCodigosPostaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.codigosPostalesService.remove(+id);
  }
}
