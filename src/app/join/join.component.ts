import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {JoinService} from '../_services/join.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  form: FormGroup;
  formHasBeenSent: boolean;


  constructor(private joinService: JoinService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {validators: [Validators.required]}),
      role: new FormControl(null, {validators: [Validators.required]}),
      link: new FormControl(null),
      bio: new FormControl(null),
      frequency: new FormControl(null, {validators: [Validators.required]}),
      email: new FormControl(null, {validators: [Validators.required]}),
      wechat: new FormControl(null),
    })

    this.getFormStatus();
  }

  getFormStatus() {
    this.formHasBeenSent = this.joinService.getFormStatus();
    console.log(this.formHasBeenSent);
    this.joinService.getFormStatusListener()
    .subscribe((status: boolean) => {
      console.log(status);
      this.formHasBeenSent = status
    })
  }

  onFormSubmit() {
    const formData = {
      name: this.form.get('name').value,
      role: this.form.get('role').value,
      link: this.form.get('link').value,
      bio: this.form.get('bio').value,
      frequency: this.form.get('frequency').value,
      email: this.form.get('email').value,
      wechat: this.form.get('wechat').value
    }
    console.log(formData);

    this.joinService.sendForm(
      formData.name,
      formData.role,
      formData.link,
      formData.bio,
      formData.frequency,
      formData.email,
      formData.wechat
    )
  }

}
