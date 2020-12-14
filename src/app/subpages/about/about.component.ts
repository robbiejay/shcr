import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    private _title: Title,
    private _meta: Meta
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this._title.setTitle("About | HKCR");
    this._meta.updateTag({ name: 'description', content: "HKCR 🌐 | Hong Kong Community Radio, independent livestream platform for latest mixes, podcasts, DJs & music from Hong Kong. 香港聯合電台 (簡稱HKCR) ，一個提供最新電台Mix ， Podcast 廣播以及地下音樂的獨立網上平台。"});
    this._meta.updateTag({ name: 'keywords', content: 'about, DJ, mix, hong kong, electronic, music'});
  }

}
