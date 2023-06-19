import { Forge } from 'src/assets/ts/forge';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Ikeys } from 'src/app/interfaces/ikeys';

const jwkToPem = require('jwk-to-pem');

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  private llaves!: Ikeys;

  constructor(private apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
    await this.getLlaves();
    await this.postEscenario();
  }

  private async getLlaves(): Promise<void> {
    this.llaves = (await this.apiService.getLlaves().toPromise()).llave;

    // Se guardan las llaves en la memoria local
    sessionStorage.setItem('keys', JSON.stringify(this.llaves));
  }

  private async postEscenario(): Promise<void> {
    this.llaves = JSON.parse(sessionStorage.getItem('keys') || '');

    let valorEncriptado: string = Forge.encriptarValor(
      this.llaves.publicKey,
      'Inicio'
    );

    let data: Object = {
      flujo: valorEncriptado,
    };

    let res: Object = await this.apiService.postEscenario(data).toPromise();
  }
}
