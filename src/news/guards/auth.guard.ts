import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(ConfigService) private configService: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const expectedAuthToken = this.configService.get('API_AUTH_TOKEN');
    const providedToken = context.switchToHttp().getRequest()
      .headers.authorization;

    if (providedToken !== expectedAuthToken) {
      throw new UnauthorizedException('Wrong Credentials');
    }

    return true;
  }
}
