import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { BancosService } from './bancos.service';
import { CreateBancoDto } from './dto/create-banco.dto';
import { UpdateBancoDto } from './dto/update-banco.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('Bancos')
@Controller('Bancos')
export class BancosController {
  constructor(private readonly bancosService: BancosService) {}

  @Post()
  create(@Body() createBancoDto: CreateBancoDto) {
    return this.bancosService.create(createBancoDto);
  }

  @Get()
  findAll() {
    return this.bancosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bancosService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBancoDto: UpdateBancoDto) {
    return this.bancosService.update(+id, updateBancoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bancosService.remove(+id);
  }
}
