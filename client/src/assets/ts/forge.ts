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

  /**
   * Enmascara un valor con asteriscos y deja visibles los n últimos caracteres
   *
   * @static
   * @param {string} valorCampo
   * @param {number} visibles
   * @return {*}  {string}
   * @memberof Forge
   */
  static enmascararValor(valorCampo: string, visibles: number): string {
    if (
      valorCampo != null &&
      visibles != null &&
      valorCampo.length > visibles
    ) {
      var enmascarado = '';
      var size = valorCampo.length;
      if (valorCampo != null && size != 0) {
        for (let i = 0; i < size - visibles; i++) {
          enmascarado = enmascarado + '*';
        }
      }

      if (visibles > 0) {
        enmascarado =
          enmascarado + valorCampo.substring(valorCampo.length - visibles);
      }
      return enmascarado;
    } else {
      return valorCampo;
    }
  }

  /**
   * Cifra y enmascara elemento pasado como parámetro
   *
   * @static
   * @param {string} nomVar
   * @param {string} nomVarCrypto
   * @param {number} visibles
   * @param {string} publicKey
   * @memberof Forge
   */
  static encriptarCampo(
    nomVar: string,
    nomVarCrypto: string,
    visibles: number,
    publicKey: string
  ): void {
    if (document.getElementById(nomVar)) {
      let elemento: any = document.getElementById(nomVar);
      var val: any = elemento.value;
      if (val.trim().length != 0) {
        elemento.value = this.enmascararValor(val, visibles);

        let elementoEncriptado: any = document.getElementById(nomVarCrypto);

        elementoEncriptado.value = this.encriptarValor(publicKey, val);
      }
    }
  }

  /**
   * Desencriptar el valor
   *
   * @static
   * @param {*} keys
   * @param {string} valorEncriptado
   * @return {*} {string}
   * @memberof functions
   */
  static desencriptarValor(keys: any, valorEncriptado: string): string {
    const privateKeyPem = keys.privateKey;

    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
    const encryptedBytes = forge.util.decode64(valorEncriptado);
    const decryptedBytes = privateKey.decrypt(encryptedBytes, 'RSA-OAEP', {
      md: forge.md.sha512.create(),
      mgf1: {
        md: forge.md.sha512.create(),
      },
    });

    const decryptedValue = forge.util.decodeUtf8(decryptedBytes);

    return decryptedValue;
  }
}
