import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  constructor(
    private _title: Title,
    private _meta: Meta
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this._title.setTitle("Schedule | HKCR");
    this._meta.updateTag({ name: 'description', content: "Hong Kong Community Radio Privacy Policy"});
    this._meta.updateTag({ name: 'keywords', content: 'privacy policy, DJ, mix, hong kong, electronic, music'});
  }

}
