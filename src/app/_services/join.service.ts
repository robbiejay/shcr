import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JoinService {

  public formDataSent = false;

  private formDataStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient) { }


  getFormStatus() {
    return this.formDataSent;
  }

  getFormStatusListener() {
    return this.formDataStatusListener.asObservable();
  }

  sendForm(
    name: string,
    role: string,
    link: string,
    bio: string,
    frequency: string,
    email: string,
    wechat: string
  ) {
    const formData = {
      name: name,
      role: role,
      link: link,
      bio: bio,
      frequency: frequency,
      email: email,
      wechat: wechat
    }
    console.log(formData);
    this.http.post<{data: any}>(
      'https://shcrad.io:3300/api/send-form',
      formData,
      {observe: 'response'}
    )
    .subscribe(response => {
      console.log(response.status);
      if(response.status === 201) {
        console.log('response status is 201')
        this.formDataSent = true;
        this.formDataStatusListener.next(true);
      }
    })
  }
}
