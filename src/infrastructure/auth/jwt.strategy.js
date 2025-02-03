// import jwt from 'jsonwebtoken';

// export class JWTStrategy {
//   constructor(secret) {
//     this.secret = secret;
//   }

//   generateToken(payload) {
//     return jwt.sign(payload, this.secret, { expiresIn: '1h' });
//   }

//   verifyToken(token) {
//     try {
//       return jwt.verify(token, this.secret);
//     } catch (error) {
//       throw new AuthenticationError('Invalid token');
//     }
//   }
// }