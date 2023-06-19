import { Forge } from 'src/assets/ts/forge';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Ikeys } from 'src/app/interfaces/ikeys';
import { Router } from '@angular/router';
import { EnumRutasPaginas } from 'src/enums/enumRutasPaginas';
import { EnumSessionStorage } from 'src/enums/enumSessionStorage';
import { IescenarioData } from 'src/app/interfaces/iescenarioData';

const jwkToPem = require('jwk-to-pem');

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  private llaves!: Ikeys;

  constructor(private apiService: ApiService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    await this.getLlaves();
    await this.postEscenario();
  }

  private async getLlaves(): Promise<void> {
    this.llaves = (await this.apiService.getLlaves().toPromise()).llave;

    // Se guardan las llaves en la memoria local
    sessionStorage.setItem(
      EnumSessionStorage.KEYS,
      JSON.stringify(this.llaves)
    );
  }

  private async postEscenario(): Promise<void> {
    this.llaves = JSON.parse(
      sessionStorage.getItem(EnumSessionStorage.KEYS) || ''
    );

    let valorEncriptado: string = Forge.encriptarValor(
      this.llaves.publicKey,
      'Inicio'
    );

    let data: IescenarioData = {
      flujo: valorEncriptado,
    };

    let res: IescenarioData = await this.apiService
      .postEscenario(data)
      .toPromise();
    let valorDesencriptado: string = Forge.desencriptarValor(
      this.llaves,
      res.flujo
    );

    switch (valorDesencriptado) {
      case 'Formulario':
        this.router.navigate([`/${EnumRutasPaginas.FORMULARIO}`]);
        break;

      default:
        break;
    }
  }
}
