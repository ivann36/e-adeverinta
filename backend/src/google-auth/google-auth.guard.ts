import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { SecretaryService } from 'src/secretary/secretary.service';

@Injectable()
export class GoogleAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        @Inject(SecretaryService) private secretaryService: SecretaryService,
    ) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];

        const decoded = this.jwtService.verify(token);
        request.user = decoded;
        this.secretaryService.getById(decoded.sub).then((secretary) => {
            if (!secretary) {
                throw new UnauthorizedException('Invalid token');
            }
            console.log(secretary, decoded);
            if (decoded.email !== secretary.email) {
                throw new UnauthorizedException('Invalid token');
            }
        });
        return true;
    }
}