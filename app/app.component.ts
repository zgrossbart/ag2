import { Component, OnInit } from '@angular/core';
import { BuildInfoService } from './buildInfoService';

@Component({
  selector: 'my-app',
  templateUrl: 'view/main.html'
})

export class AppComponent implements OnInit {
  count: number;

  constructor(private buildService: BuildInfoService) {
    this.count = 0;
  }

  ngOnInit() {
    //this.buildService.getBuildInfo();
  }

  loadData(event) {
    console.log('build info: ' + JSON.stringify(this.buildService.getBuildInfo()));

  }

  handleMyClick(event) {
    this.count++;
  }
 }

console.log('Zack was here');