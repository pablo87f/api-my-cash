export default interface IJwtService {
  sign(payload?: Record<string, any>): string;
}
