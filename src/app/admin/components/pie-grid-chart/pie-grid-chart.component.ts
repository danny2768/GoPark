import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ChartData } from '../../interfaces/chart-data.interface';
import { map, Observable } from 'rxjs';
import { Parking } from '../../../shared/interfaces/parking.interface';

@Component({
  selector: 'admin-pie-grid-chart',
  templateUrl: './pie-grid-chart.component.html',
  styleUrl: './pie-grid-chart.component.css'
})
export class PieGridChartComponent implements OnInit {

  public parkings: Parking[] = [];
  public data?: Observable<ChartData[]>;

  public view: [number, number] = [500, 400];
  public colorScheme = 'horizon';

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
