import { Injectable } from '@angular/core';
import { Subject, Observable, Subscription} from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  public show: string;
  public isPlayerVisible: boolean;
  public playerVisibilityChange: Subject<boolean> = new Subject<boolean>();
  public nowPlaying = '';
  public upNext = '';
  public livestreamActive = false;
  public hasOpenedShow = false;
  private ipAddress = '';
  public isCN = false;
  //public state = 'slidOut';

  constructor(private http: HttpClient) {
    this.show = '';
    this.playerVisibilityChange.subscribe((value) => {
      this.isPlayerVisible = value
    })
  }

    playShow(isCN, show) {
      this.playerVisibilityChange.next(true);
      if(show.includes('src="')) {
      let arr = show.split('src="');
      let show_arr_2 = arr[1].split('"');
      this.show = show_arr_2[0];
    } else {
      this.show = show;
    }
      this.hasOpenedShow = true;
      isCN ? this.isCN = true : this.isCN = false;
    }


    closePlayer() {
      this.playerVisibilityChange.next(false);
    }

    togglePlayer() {
      this.playerVisibilityChange.next(!this.isPlayerVisible);
    }

    getIP(): Observable<any> {
      return this.http.get("http://api.ipify.org/?format=json");
    }

    getGeolocation(ip): Observable<any> {
      return this.http.get(
        'http://api.ipstack.com/'+ip+'?access_key=0b7d3fba770c0d0a82b320db05b06dcf',
        {responseType: 'json'}
      );
    }

}
