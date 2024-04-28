export class SignInDto {
  username: string;
  password: string;
}

export class RefreshTokenDto {
  token: string;
}

export class PayloadDto {
  sub: number;
  username: string;
}
