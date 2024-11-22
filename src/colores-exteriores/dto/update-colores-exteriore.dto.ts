import { PartialType } from '@nestjs/swagger';
import { CreateColoresExterioreDto } from './create-colores-exteriore.dto';

export class UpdateColoresExterioreDto extends PartialType(CreateColoresExterioreDto) {}
