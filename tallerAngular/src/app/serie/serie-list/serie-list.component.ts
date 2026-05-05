import { Component, OnInit } from '@angular/core';
import { Serie } from '../serie';
import { SerieService } from '../serie.service';

@Component({
  selector: 'app-serie-list',
  standalone: false,
  templateUrl: './serie-list.component.html',
  styleUrl: './serie-list.component.css'
})
export class SerieListComponent implements OnInit {
  series: Serie[] = [];
  selectedSerie: Serie | null = null;
  seasonsAverage = 0;

  constructor(private serieService: SerieService) {}

  ngOnInit(): void {
    this.loadSeries();
  }

  loadSeries(): void {
    this.serieService.getSeries().subscribe({
      next: (data: Serie[]) => {
        console.log('Series cargadas:', data);

        this.series = data;
        this.seasonsAverage = this.calculateAverage(data);
        this.selectedSerie = data.length > 0 ? data[0] : null;
      },
      error: (error) => {
        console.error('Error cargando series:', error);
      }
    });
  }

  selectSerie(serie: Serie): void {
    this.selectedSerie = serie;
  }

  private calculateAverage(series: Serie[]): number {
    if (series.length === 0) {
      return 0;
    }

    const total = series.reduce((sum, serie) => sum + serie.seasons, 0);
    return total / series.length;
  }
}