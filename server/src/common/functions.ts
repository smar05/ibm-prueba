import forge from "node-forge";
import { Ikeys } from "../interfaces/ikeys";
import fs from "fs";

const rutaPublicKey: string = "src/assets/keys/publicKey.txt";
const rutaPrivateKey: string = "src/assets/keys/privateKey.txt";

export class functions {
  /**
   * Generar llaves asimétricas RSA de 2048 bits y con el algoritmo 'RSA-OAEP-256' en formato PEM
   *
   * @static
   * @return {*}  {Ikeys}
   * @memberof functions
   */
  static generateRSAKeys(): Ikeys {
    console.info("Inicia metodo para generar las llaves de encriptacion");

    const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });

    const publicKey = forge.pki.publicKeyToPem(keyPair.publicKey);
    const privateKey = forge.pki.privateKeyToPem(keyPair.privateKey);

    let keys: Ikeys = { publicKey, privateKey };

    return keys;
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
    console.info("Inicia metodo para desencriptar la informacion");

    const privateKeyPem = keys.privateKey;

    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
    const encryptedBytes = forge.util.decode64(valorEncriptado);
    const decryptedBytes = privateKey.decrypt(encryptedBytes, "RSA-OAEP", {
      md: forge.md.sha512.create(),
      mgf1: {
        md: forge.md.sha512.create(),
      },
    });

    const decryptedValue = forge.util.decodeUtf8(decryptedBytes);

    return decryptedValue;
  }

  /**
   * Encripta un campo tipo String con RSA pasandole la clave Publica
   *
   * @static
   * @param {*} publicKey
   * @param {string} valorCampo
   * @return {*}  {string}
   * @memberof functions
   */
  static encriptarValor(publicKey: any, valorCampo: string): string {
    console.info("Inicia metodo para encriptar un valor");

    var publicKey: any = forge.pki.publicKeyFromPem(publicKey);
    var buffer: any = forge.util.createBuffer(valorCampo, "utf8");
    var binaryString: string = buffer.getBytes();
    var encrypted: string = publicKey.encrypt(binaryString, "RSA-OAEP", {
      md: forge.md.sha512.create(),
      mgf1: {
        md: forge.md.sha512.create(),
      },
    });

    return forge.util.encode64(encrypted);
  }

  /**
   * Se leen las llaves presentes en los archivos locales
   *
   * @static
   * @return {*}  {Ikeys}
   * @memberof functions
   */
  static leerLlavesPublicasLocales(): Ikeys {
    console.info(
      "Inicia metodo para leer las llaves de encriptacion almacenadas localmente"
    );

    let keys: Ikeys = { publicKey: "", privateKey: "" };
    try {
      keys.publicKey = fs.readFileSync(rutaPublicKey, "utf8");
      keys.privateKey = fs.readFileSync(rutaPrivateKey, "utf8");
    } catch (err) {
      console.error("Error al leer el archivo:", err);
    }

    return keys;
  }

  /**
   * Se escriben las llaves en los archivos locales
   *
   * @static
   * @param {Ikeys} keys
   * @memberof functions
   */
  static escribirLlavesEnArchivosLocales(keys: Ikeys): void {
    console.info("Inicia metodo para almacenar las llaves de encriptacion");

    fs.writeFile(rutaPublicKey, keys.publicKey, "utf8", (err) => {
      if (err) {
        console.error(
          "Error al escribir en el archivo de la llave publica:",
          err
        );
        return;
      }

      console.log(
        "Se ha escrito el contenido en el archivo de la llave publica."
      );
    });

    fs.writeFile(rutaPrivateKey, keys.privateKey, "utf8", (err) => {
      if (err) {
        console.error(
          "Error al escribir en el archivo de la llave privada:",
          err
        );
        return;
      }

      console.log(
        "Se ha escrito el contenido en el archivo de la llave privada."
      );
    });
  }
}
