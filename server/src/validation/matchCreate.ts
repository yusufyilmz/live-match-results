import { IsString, IsInt, Length, Min, Max, IsArray, IsDateString, isISO8601 } from 'class-validator';

class MatchCreateDto {
  @IsArray()
  public players: string [];

  @IsString()
  public id: string;

  @IsDateString()
  public createdAt: string;

}

export default MatchCreateDto;
