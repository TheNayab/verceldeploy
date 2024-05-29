import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  priority?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
