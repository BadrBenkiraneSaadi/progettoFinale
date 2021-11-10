import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css']
})
export class RicercaComponent implements OnInit {

  displayMonthsDa = 1;
  navigationDa = 'select';
  showWeekNumbersDa = false;
  outsideDaysDa = 'visible';
  
  displayMonthsA = 1;
  navigationA = 'select';
  showWeekNumbersA = false;
  outsideDaysA = 'visible';

  constructor() { }

  ngOnInit(): void {
  }

  prova(data:Object): void {
    console.log(data);
  }
}

