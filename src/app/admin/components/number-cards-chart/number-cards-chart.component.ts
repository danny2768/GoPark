import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Parking } from '../../../shared/interfaces/parking.interface';
import { map, Observable } from 'rxjs';
import { ChartData } from '../../interfaces/chart-data.interface';

@Component({
  selector: 'admin-number-cards-chart',
  templateUrl: './number-cards-chart.component.html',
  styleUrl: './number-cards-chart.component.css'
})
export class NumberCardsChartComponent implements OnInit {

  public parkings: Parking[] = [];
  public data?: Observable<ChartData[]>;

  public view: [number, number] = [500, 400];
  public colorScheme = 'horizon';
  public cardColor: string = '#FFFFFF';

  constructor(
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.data = this.adminService.getParkings().pipe(
      map( parkings => parkings.map( parking => ({
        name: parking.location,
        value: parking.available
      })))
    );
  }

  onSelect(event: any) {
    console.log(event);
  }
}
