import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  private llave: string = '';

  constructor(private apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
    this.llave = await this.apiService.getLlave().toPromise();
    console.log(
      '🚀 ~ file: inicio.component.ts:16 ~ InicioComponent ~ ngOnInit ~ this.llave:',
      this.llave
    );
  }
}
