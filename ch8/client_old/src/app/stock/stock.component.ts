import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import "rxjs/Rx";
import {Observable} from "rxjs";

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  dataSource:Observable<any>;

  stocks = [];

  constructor(public http: Http) {
    this.dataSource = this.http.get('/stock').map(response => response.json());
  }

  ngOnInit() {
    this.dataSource.subscribe(
      data => this.stocks = data
    )
  }

}
