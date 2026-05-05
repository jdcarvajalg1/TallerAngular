import { Component } from '@angular/core';
import { SerieModule } from './serie/serie.module';

@Component({
  selector: 'app-root',
  imports: [SerieModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}