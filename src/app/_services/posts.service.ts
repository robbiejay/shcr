import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  public nowPlaying: string;
  nowPlayingStateChange: Subject<string> = new Subject<string>();

  public upNext: string;
  upNextStateChange: Subject<string> = new Subject<string>();

  public upNextTime: string;
  upNextTimeStateChange: Subject<string> = new Subject<string>();


  constructor(private http: HttpClient) {
      this.nowPlayingStateChange.subscribe(value => {
        this.nowPlaying = value;
      })

      this.upNextStateChange.subscribe(value => {
        this.upNext = value;
      })

      this.upNextTimeStateChange.subscribe(value => {
        this.upNextTime = value;
      })
   }

  private shows = [];
  private showSubscription: Subscription;


  // getShowsbyPage(page): Observable<any> {
  //   let url = 'https://shcrad.io/wp_api/data/shows/shows_1.json';
  //   return this.http.get(
  //     url,
  //     {observe: 'response'}
  //   )
  // }

  changeNowPlaying(nowPlaying) {
    this.nowPlayingStateChange.next(nowPlaying);
  }

  changeUpNext(upNext) {
    this.upNextStateChange.next(upNext);
  }

  changeUpNextTime(upNextTime) {
    this.upNextTimeStateChange.next(upNextTime);
  }

  getShows(page): Observable<any> {
    let url = 'https://shcrad.io/wp_api/data/shows/shows_' + page + '.json';
    return this.http.get(
      url,
      {observe: 'response'},
    );
  }

  getSingleShow(filename): Observable<any> {
    return this.http.get(
      'https://shcrad.io/wp_api/data/shows/single/' + filename + '.json',
      {responseType: 'json'}
    );
  }

  getTotalPages(): Observable<any> {
    let url = 'https://shcrad.io/wp_api/data/shows/total_pages.json';
    return this.http.get(
      url,
      {observe: 'response'},
    );
  }

  getShowsByTag(tagID, page): Observable<any> {
    let url = 'https://shcrad.io/wp_api/data/shows/genres/' + tagID + '_'+ page + '.json'
    console.log(url);
    return this.http.get(
      url,
      {observe: 'response'},
    );
  }

  getTagTotalPages(tagID): Observable<any> {
    let url = 'https://shcrad.io/wp_api/data/shows/genres/_totals/' + tagID + '.json'
    console.log(url);
    return this.http.get(
      url,
      {observe: 'response'},
    );
  }

  getSchedule(): Observable<any> {
    return this.http.get(
      'https://shcrad.io/wp_api/data/schedule/schedule.json',
      {responseType: 'json'}
    );
  }

  getHighlights(): Observable<any> {
    return this.http.get(
      'https://shcrad.io/wp_api/data/highlights/highlight_reel.json',
      {responseType: 'json'}
    );
  }

  getResidents(): Observable<any> {
    return this.http.get(
      'https://shcrad.io/wp_api/data/residents/residents.json',
      {responseType: 'json'}
    );
  }

  getSingleResident(filename): Observable<any> {
    return this.http.get(
      'https://shcrad.io/wp_api/data/residents/single/' + filename + '.json',
      {responseType: 'json'}
    );
  }

  getResidentUpcomingShows(filename): Observable<any> {
    return this.http.get(
      'https://shcrad.io/wp_api/data/shows/genres/' + filename + '.json',
      {responseType: 'json'}
    );
  }

  getUpcomingShows(): Observable<any> {
    return this.http.get(
      'https://shcrad.io/wp_api/data/upcoming-shows/upcoming_shows.json',
      {responseType: 'json'}
    )
  }

  getSingleUpcoming(filename): Observable<any> {
    return this.http.get(
      'https://shcrad.io/wp_api/data/upcoming-shows/single/' + filename + '.json',
      {responseType: 'json'}
    )
  }

  getPosts(): Observable<any> {
    return this.http.get(
      'https://shcrad.io/wp_api/data/blog/blog.json',
      {responseType: 'json'}
    );
  }

  getSinglePost(filename): Observable<any> {
    return this.http.get(
      'https://shcrad.io/wp_api/data/blog/single/' + filename + '.json',
      {responseType: 'json'}
    );
  }

  getLatestShows(): Observable<any> {
    return this.http.get(
      'https://shcrad.io/wp_api/data/shows/shows_1.json',
      {responseType: 'json'}
    );
  }

  getLatestUpdatedTimestamp(): Observable<any> {
    return this.http.get(
      'https://shcrad.io/wp_api/data/timestamp.json',
      {responseType: 'json'}
    );
  }
}
