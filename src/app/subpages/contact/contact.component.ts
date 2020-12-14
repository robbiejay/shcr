import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(
    private _title: Title,
    private _meta: Meta
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this._title.setTitle("Contact Us | HKCR");
    this._meta.updateTag({ name: 'description', content: "Hong Kong Community Radio Contact Page"});
    this._meta.updateTag({ name: 'keywords', content: 'contact, DJ, mix, hong kong, electronic, music'});
  }
}
