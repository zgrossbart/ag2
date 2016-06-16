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
    this.buildService.getBuildInfo().subscribe(data => console.log(JSON.stringify(data)));

  }

  handleMyClick(event) {
    this.count++;
  }
 }

console.log('Zack was here');