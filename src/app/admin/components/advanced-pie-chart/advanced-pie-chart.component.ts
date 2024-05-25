import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { map, Observable, Subscription } from 'rxjs';
import { Parking } from '../../../shared/interfaces/parking.interface';
import { ChartData } from '../../interfaces/chart-data.interface';


@Component({
  selector: 'admin-advanced-pie-chart',
  templateUrl: './advanced-pie-chart.component.html',
  styleUrl: './advanced-pie-chart.component.css'
})
export class AdvancedPieChartComponent implements OnInit {

  public parkings: Parking[] = [];
  public data?: Observable<ChartData[]>;

  public view: [number, number] = [1100, 200];
  public colorScheme = 'ocean';
  public gradient: boolean = true;
  public showLegend: boolean = true;
  public showLabels: boolean = true;
  public isDoughnut: boolean = false;
  public animations: boolean = true;

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

  onSelect(data: Event): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: Event): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: Event): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
