import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Chart } from 'chart.js/auto';
import { DriverListDTO } from 'src/app/model/driver-list-dto';
import { CreateReport } from 'src/app/model/report/create-report.model';
import { ResponseReport } from 'src/app/model/report/response-report.model';
import { AuthService } from 'src/app/services/auth.service';
import { DateTimeService } from 'src/app/services/date-time.service';
import { DriverService } from 'src/app/services/driver.service';
import { PassengerService } from 'src/app/services/passenger.service';
import { StatisticService } from 'src/app/services/statistic.service';
import { DialogComponent } from '../dialog/dialog.component';

interface ChartDataModel {
  label: string,
  data: Array<string>,
  backgroundColor: string
}

interface StatisticTotals {
  sum: number,
  average: number
}

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

  sumValue: number = 0;
  averageValue: number = 0;

  userEmail: string = "";

  @ViewChild('MyChart') canvasRef: ElementRef;

  constructor(
    public authService: AuthService,
    private statisticService: StatisticService,
    private dateTimeService: DateTimeService,
    private matDialog: MatDialog,
    private driverService: DriverService,
    private passengerServie: PassengerService
  ) { }

  ngOnInit() {
    if (this.authService.getRole() == "ROLE_PASSENGER") {
      this.financialsChartLabel = "Expenses"
    } else if (this.authService.getRole() == "ROLE_DRIVER") {
      this.financialsChartLabel = "Income";
    } else {
      this.financialsChartLabel = "Financials";
    }
    this.createChart({ label: "", data: [], backgroundColor: 'white' });
  }

  createChart(...chartDataModel: Array<ChartDataModel>) {

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes the type of chart

      data: {  // values on X-Axis
        labels: this.dateLabels,
        datasets: chartDataModel
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }

  private getStatisticTotals(data: Array<ResponseReport>): StatisticTotals {
    let sum: number = 0;
    for (let report of data) {
      this.dateLabels.push(report.date.split(" ")[0]);
      sum += report.value;
    }
    return {
      sum: sum,
      average: Math.round(sum / data.length * 100) / 100
    }
  }

  private setChartDateLabels(data: Array<ResponseReport>) {
    this.dateLabels = []
    for (let report of data) {
      this.dateLabels.push(report.date.split(" ")[0]);
    }
  }

  private getChartDataModel(data: Array<ResponseReport>, label: string, backgroundColor: string): ChartDataModel {
    let chartData: Array<string> = []
    for (let report of data) {
      chartData.push(`${report.value}`);
    }
    return {
      data: chartData,
      label: label,
      backgroundColor: backgroundColor
    }
  }

  private getCreateReportObject() {
    return {
      startDate: this.dateTimeService.toString(this.startDate),
      endDate: this.dateTimeService.toString(this.endDate)
    }
  }

  renderChart(...chartDataModel: Array<ChartDataModel>) {
    this.chart.destroy();
    this.createChart(...chartDataModel);
  }

  showDistanceTraveledChart() {
    if (this.authService.getRole() == "ROLE_ADMIN") {
      this.userEmail = this.userEmail.trim();
      this.showDistanceTraveledChartForAdmin();
    } else {
      this.showDistanceTraveledChartForRegularUser();
    }
  }

  private showDistanceTraveledChartForAdmin() {
    if (this.userEmail == "") {
      this.allUsersDataDistanceTraveledChart();
    } else {
      const createReport: CreateReport = this.getCreateReportObject();
      this.statisticService.getDistanceTraveledPerDayByEmail(this.userEmail, createReport).subscribe({
        next: (response: Array<ResponseReport>) => {
          const chartDataLabel: string = "Distance Traveled";
          const backgroundColor = 'blue';

          const statisticTotals = this.getStatisticTotals(response);
          this.sumValue = statisticTotals.sum;
          this.averageValue = statisticTotals.average;

          this.setChartDateLabels(response);
          this.renderChart(this.getChartDataModel(response, chartDataLabel, backgroundColor));
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

  private allUsersDataDistanceTraveledChart() {

  }

  private showDistanceTraveledChartForRegularUser() {
    const createReport: CreateReport = this.getCreateReportObject();
      this.statisticService.getDistanceTraveledPerDay(this.authService.getId(), createReport).subscribe({
        next: (response: Array<ResponseReport>) => {
          const chartDataLabel: string = "Distance Traveled";
          const backgroundColor = 'blue';

          const statisticTotals = this.getStatisticTotals(response);
          this.sumValue = statisticTotals.sum;
          this.averageValue = statisticTotals.average;

          this.setChartDateLabels(response);
          this.renderChart(this.getChartDataModel(response, chartDataLabel, backgroundColor));
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
    if (this.authService.getRole() == "ROLE_ADMIN") {
      this.userEmail = this.userEmail.trim();
      this.showNumberOfRidesChartForAdmin();
    } else {
      this.showNumberOfRidesChartForRegularUser();
    }
  }

  private showNumberOfRidesChartForAdmin() {
    if (this.userEmail.trim() == "") {
      this.allUsersDataNumberOfRidesChart();
    } else {
      const createReport: CreateReport = this.getCreateReportObject();
      this.statisticService.getNumberOfRidesPerDayByEmail(this.userEmail, createReport).subscribe({
        next: (response: Array<ResponseReport>) => {
          const chartDataLabel: string = "Number of Rides";
          const backgroundColor = 'red';

          const statisticTotals = this.getStatisticTotals(response);
          this.sumValue = statisticTotals.sum;
          this.averageValue = statisticTotals.average;

          this.setChartDateLabels(response);
          this.renderChart(this.getChartDataModel(response, chartDataLabel, backgroundColor));
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

  private allUsersDataNumberOfRidesChart() {

  }

  private showNumberOfRidesChartForRegularUser() {
    const createReport: CreateReport = this.getCreateReportObject();
      this.statisticService.getNumberOfRidesPerDay(this.authService.getId(), createReport).subscribe({
        next: (response: Array<ResponseReport>) => {
          const chartDataLabel: string = "Number of Rides";
          const backgroundColor = 'red';

          const statisticTotals = this.getStatisticTotals(response);
          this.sumValue = statisticTotals.sum;
          this.averageValue = statisticTotals.average;

          this.setChartDateLabels(response);
          this.renderChart(this.getChartDataModel(response, chartDataLabel, backgroundColor));
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
    if (this.authService.getRole() == "ROLE_ADMIN") {
      this.userEmail = this.userEmail.trim();
      this.showFinancialsChartForAdmin();
    } else {
      this.showFinancialsChartForRegularUser();
    }
  }

  private showFinancialsChartForAdmin() {
    if (this.userEmail.trim() == "") {
      this.allUsersDataFinancialsChart();
    } else {
    const createReport: CreateReport = this.getCreateReportObject();
      this.statisticService.getFinancialsPerDayByEmail(this.userEmail, createReport).subscribe({
        next: (response: Array<ResponseReport>) => {
          const chartDataLabel: string = this.financialsChartLabel;
          const backgroundColor = 'green';
          
          const statisticTotals = this.getStatisticTotals(response);
          this.sumValue = statisticTotals.sum;
          this.averageValue = statisticTotals.average;

          this.setChartDateLabels(response);
          this.renderChart(this.getChartDataModel(response, chartDataLabel, backgroundColor));
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

  private allUsersDataFinancialsChart() {

  }

  private showFinancialsChartForRegularUser() {
    const createReport: CreateReport = this.getCreateReportObject();
      this.statisticService.getFinancialsPerDay(this.authService.getId(), createReport).subscribe({
        next: (response: Array<ResponseReport>) => {
          const chartDataLabel: string = this.financialsChartLabel;
          const backgroundColor = 'green';
          
          const statisticTotals = this.getStatisticTotals(response);
          this.sumValue = statisticTotals.sum;
          this.averageValue = statisticTotals.average;

          this.setChartDateLabels(response);
          this.renderChart(this.getChartDataModel(response, chartDataLabel, backgroundColor));
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