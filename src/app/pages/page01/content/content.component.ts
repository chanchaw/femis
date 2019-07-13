import { SettlementService, Settlement } from './../../../shared/services/settlement.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  // jsfs:Settlement[] = [];
  jsfs:string[] = [];
  filteredOptions:string[] = [];
  inputValue:string;
  
  constructor(
    private bService:SettlementService
  ) { 
    bService.getAll().subscribe(
      val => {
        this.jsfs = [];
        val.forEach(ele => {
          this.jsfs.push(ele.sid);
        });

        this.filteredOptions = this.jsfs;
      },
      error => console.log("获取结算方式时出错！")
    );
  }

  ngOnInit() {
  }

  onInput(value: string): void {
    // this.filteredOptions = this.jsfs.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) === 0);
    this.filteredOptions = this.jsfs.filter(
      item => item.indexOf(value)>=0
    );
  }


}
