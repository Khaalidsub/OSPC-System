export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'secret',
  resetSecret: process.env.JWT_RESET_SECRET || 'secret',
};
