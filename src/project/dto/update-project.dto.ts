import { IsDateString, IsString, MinLength } from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  @MinLength(6)
  name: string;

  @IsDateString()
  forecastStartDate: Date;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  constructionForecastStartDate: Date;

  @IsDateString()
  constructionStartDate: Date;

  @IsDateString()
  constructionForecastEndDate: Date;

  @IsDateString()
  constructionEndDate: Date;
}
