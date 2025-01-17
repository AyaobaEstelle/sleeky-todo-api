import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive({ message: 'Page number must be a positive number' }) 
  readonly page?: number;

  @IsOptional()
  @IsPositive({ message: 'Limit must be a positive number' })
  @Min(1, { message: 'Limit must be at least 1' })
  readonly limit?: number;
}
