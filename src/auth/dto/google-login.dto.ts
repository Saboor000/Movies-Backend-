// google-login.dto.ts
import { IsString } from 'class-validator';

export class GoogleLoginDto {
  @IsString()
  id_token: string;
}
