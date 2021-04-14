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
  //public state = 'slidOut';

  constructor(private http: HttpClient) {
    this.show = '';
    this.playerVisibilityChange.subscribe((value) => {
      this.isPlayerVisible = value
    })
  }

    playShow(show) {
      this.playerVisibilityChange.next(true);
      this.show = show;
      this.hasOpenedShow = true;

    }


    closePlayer() {
      this.playerVisibilityChange.next(false);
    }

    togglePlayer() {
      this.playerVisibilityChange.next(!this.isPlayerVisible);
    }

    getGeolocation(): Observable<any> {
      return this.http.get(
        'https://api.ipstack.com/134.201.250.155?access_key=0b7d3fba770c0d0a82b320db05b06dcf',
        {responseType: 'json'}
      );
    }

}
