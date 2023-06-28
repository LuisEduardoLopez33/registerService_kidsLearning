import * as jwt from "jsonwebtoken";

class TokenGenerator {
  private secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  generateToken(userId: number, expiresIn: string): string {
    const payload = {
      userId: userId,
    };

    const options = {
      expiresIn: expiresIn,
    };

    const token = jwt.sign(payload, this.secretKey, options);

    return token;
  }
}

export default TokenGenerator;
