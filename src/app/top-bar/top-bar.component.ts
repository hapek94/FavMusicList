import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  private availableLangs = [
    {code: 'en', text: 'English'},
    {code: 'pl', text: 'Polski'},
  ];
  constructor(private translate: TranslateService) { }

  ngOnInit() {

  }
  setLang(event): void {
    this.translate.use(event.target.value);
  }
}
