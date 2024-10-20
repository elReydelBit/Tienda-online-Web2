//src\lib\redsys-utils.ts
import crypto from 'crypto';

export function generateRedsysSignature(params: any, key: string): string {
  const merchantParams = Buffer.from(JSON.stringify(params)).toString('base64');
  const key3DES = Buffer.from(base64_url_decode(key), 'binary');
  const orderData = params.DS_MERCHANT_ORDER;
  
  const iv = Buffer.alloc(8);
  const cipher = crypto.createCipheriv('des-ede3-cbc', key3DES, iv);
  cipher.setAutoPadding(false);
  
  const orderPadded = orderData.padEnd(16, '\0');
  const signatureBase = merchantParams + orderPadded;
  
  let signature = cipher.update(signatureBase, 'utf8', 'base64');
  signature += cipher.final('base64');
  
  return signature;
}

function base64_url_decode(input: string): string {
  return Buffer.from(input, 'base64').toString('binary');
}
