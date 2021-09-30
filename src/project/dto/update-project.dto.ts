import { IsString, MinLength } from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  @MinLength(6)
  name: string;

  @IsString()
  constructionType: string;
}
