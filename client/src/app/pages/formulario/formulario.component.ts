import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IescenarioData } from 'src/app/interfaces/iescenarioData';
import { Ikeys } from 'src/app/interfaces/ikeys';
import { ApiService } from 'src/app/services/api.service';
import { Forge } from 'src/assets/ts/forge';
import { EnumRutasPaginas } from 'src/enums/enumRutasPaginas';
import { EnumSessionStorage } from 'src/enums/enumSessionStorage';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  private keys!: Ikeys;

  // Grupo de controles
  public f = this.form.group({
    numeroDocumento: ['', Validators.required],
    documentoCifrado: [''],
    nombre: [
      '',
      {
        validators: [
          Validators.required,
          Validators.pattern('[,\\a-zA-ZáéíóúñÁÉÍÓÚ ]*'),
        ],
      },
    ],
  });

  //Validaciones personalizadas
  get nombre() {
    return this.f.controls['nombre'];
  }

  get numeroDocumento() {
    return this.f.controls['numeroDocumento'];
  }

  get documentoCifrado() {
    return this.f.controls['documentoCifrado'];
  }

  constructor(
    private router: Router,
    private form: UntypedFormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    // SI no hay llaves almacenandas, se devuelve a la pagina de inicio para generarlas
    if (!sessionStorage.getItem(EnumSessionStorage.KEYS))
      this.router.navigate([`/${EnumRutasPaginas.INICIO}`]);

    this.keys = JSON.parse(
      sessionStorage.getItem(EnumSessionStorage.KEYS) || ''
    );
  }

  /**
   * Submmit del formulario
   *
   * @return {*}  {Promise<void>}
   * @memberof FormularioComponent
   */
  public async save(): Promise<void> {
    //Si es invalido el formulario
    if (this.f.invalid) return;

    let data: IescenarioData = {
      flujo: Forge.encriptarValor(this.keys.publicKey, 'Formulario'),
      numDocumento: this.documentoCifrado.value,
      nombre: this.nombre.value,
    };

    let dataRecibida: any = await this.apiService
      .postEscenario(data)
      .toPromise();

    let dataRecibidaDesencriptada: any = {
      exitoso: dataRecibida.exitoso,
      mensaje: Forge.desencriptarValor(this.keys, dataRecibida.mensaje),
    };
  }

  /**
   * Evento de caundo el usuario se salga del input de numero de documento
   *
   * @memberof FormularioComponent
   */
  public blurNumeroDocumento(): void {
    Forge.encriptarCampo(
      'numeroDocumento',
      'documentoCifrado',
      2,
      this.keys.publicKey
    );

    let elementoEncriptado: any = document.getElementById('documentoCifrado');

    this.documentoCifrado.setValue(elementoEncriptado.value);
  }
}
