import { UUID } from 'crypto';

interface JwtPayload {
  sub: UUID;
  name: string;
  role: string;
}

export { JwtPayload };
