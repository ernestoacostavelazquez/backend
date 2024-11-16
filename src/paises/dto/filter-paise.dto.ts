import { IsOptional, IsString } from 'class-validator';

export class FilterPaisDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  codigo_iso_alpha2?: string;
}
