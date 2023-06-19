const forge = require('node-forge');

export class Forge {
  /**
   * Encripta un campo tipo String con RSA pasandole la clave Publica
   *
   * @static
   * @param {*} publicKey
   * @param {string} valorCampo
   * @return {*}  {string}
   * @memberof Forge
   */
  static encriptarValor(publicKey: any, valorCampo: string): string {
    var publicKey = forge.pki.publicKeyFromPem(publicKey);
    var buffer = forge.util.createBuffer(valorCampo, 'utf8');
    var binaryString = buffer.getBytes();
    var encrypted = publicKey.encrypt(binaryString, 'RSA-OAEP', {
      md: forge.md.sha512.create(),
      mgf1: {
        md: forge.md.sha512.create(),
      },
    });

    return forge.util.encode64(encrypted);
  }
}
