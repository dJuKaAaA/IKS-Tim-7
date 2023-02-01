import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Chart } from 'chart.js/auto';
import { CreateReport } from 'src/app/model/report/create-report.model';
import { ResponseReport } from 'src/app/model/report/response-report.model';
import { AuthService } from 'src/app/services/auth.service';
import { DateTimeService } from 'src/app/services/date-time.service';
import { StatisticService } from 'src/app/services/statistic.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.css']
})
export class UserStatisticsComponent implements OnInit {

  chart: any;
  financialsChartLabel: string = "";
  startDate: Date = new Date();
  endDate: Date = new Date();

  dateLabels: Array<string> = [];
  chartData: Array<string> = [];
  chartDataLabel: string = "";

  totalValue: number = 0;
  averageValue: number = 0;

  @ViewChild('MyChart') canvasRef: ElementRef;

  constructor(
    private authService: AuthService,
    private statisticService: StatisticService,
    private dateTimeService: DateTimeService,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    if (this.authService.getRole() == "ROLE_PASSENGER") {
      this.financialsChartLabel = "Expenses"
    } else if (this.authService.getRole() == "ROLE_DRIVER") {
      this.financialsChartLabel = "Income";
    }
    this.createChart('white');
  }

  createChart(backgroundColor: string) {

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {  // values on X-Axis
        labels: this.dateLabels,
        datasets: [
          {
            label: this.chartDataLabel,
            data: this.chartData,
            backgroundColor: backgroundColor 
          },
          // {
          //   label: "Profit",
          //   data: ['542', '542', '536', '327', '17',
          //     '0.00', '538', '541'],
          //   backgroundColor: 'limegreen'
          // }
        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }

  private setDataForChart(data: Array<ResponseReport>) {
    this.averageValue = 0;
    this.totalValue = 0;
    this.dateLabels = []
    this.chartData = [];
    for (let report of data) {
      this.dateLabels.push(report.date.split(" ")[0]);
      this.chartData.push(`${report.value}`);
      this.totalValue += report.value;
    }
    this.averageValue = Math.round(this.totalValue / data.length * 100) / 100;
  }

  private getCreateReportObject() {
    return {
      startDate: this.dateTimeService.toString(this.startDate),
      endDate: this.dateTimeService.toString(this.endDate)
    }
  }

  renderChart(backgroundColor: string) {
    this.chart.destroy();
    this.createChart(backgroundColor);
  }

  showDistanceTraveledChart() {
    const createReport: CreateReport = this.getCreateReportObject();
    this.statisticService.getDistanceTraveledPerDay(this.authService.getId(), createReport).subscribe({
      next: (response: Array<ResponseReport>) => {
        this.chartDataLabel = "Distance traveled";
        this.setDataForChart(response);
        this.renderChart('blue');
      }, error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.matDialog.open(DialogComponent, {
            data: {
              header: "Error!",
              body: error.error.message
            }
          });
        }
      }
    })

  }

  showNumberOfRidesChart() {
    const createReport: CreateReport = this.getCreateReportObject();
    this.statisticService.getNumberOfRidesPerDay(this.authService.getId(), createReport).subscribe({
      next: (response: Array<ResponseReport>) => {
        this.chartDataLabel = "Number of rides"  // put this in subscribe
        this.setDataForChart(response);
        this.renderChart('red');
      }, error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.matDialog.open(DialogComponent, {
            data: {
              header: "Error!",
              body: error.error.message
            }
          });
        }
      }
    })
  }

  showFinancialsChart() {
    const createReport: CreateReport = this.getCreateReportObject();
    this.statisticService.getFinancialsPerDay(this.authService.getId(), createReport).subscribe({
      next: (response: Array<ResponseReport>) => {
        this.chartDataLabel = this.financialsChartLabel  // put this in subscribe 
        this.setDataForChart(response);
        this.renderChart('green');
      }, error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.matDialog.open(DialogComponent, {
            data: {
              header: "Error!",
              body: error.error.message
            }
          });
        }
      }
    })
  }

}
