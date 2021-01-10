import { Component, ElementRef, ViewChild, OnInit, OnDestroy, AfterViewInit, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { Location, isPlatformBrowser, DOCUMENT } from "@angular/common";

import { trigger, state, style, transition, animate } from '@angular/animations';
import { PlayerService } from '../../_services/player.service';
import videojs from 'video.js';
// import 'hls.js';
// import 'videojs-contrib-dash';
// import 'videojs-contrib-eme';
// import 'videojs-contrib-hls';
import "@videojs/http-streaming";
import 'videojs-contrib-quality-levels';
import 'videojs-resolution-switcher';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-livestream',
  templateUrl: './livestream.component.html',
  styleUrls: ['./livestream.component.scss'],
  animations: [
    trigger('fadeBG', [
      state('fadeOut', style({
        'background-color':'rgba(255,223,0,0)',
        'filter': 'blur(35px)',
        'opacity': 0,
        'display': 'none'

      })),
      state('fadeIn', style({
        'background-color':'rgba(255,255,255,1)',

      })),
      transition('* => *', animate(2400)),
    ])
  ]
})
export class LivestreamComponent implements OnInit, OnDestroy {


  fadeBGState = 'fadeIn';
  livestreamPlayerWidth : number;
  livestreamPlayerHeight : number;
  acidMode: boolean;
  video: any;

  constructor(private _title: Title,
    private _location: Location,
    private playerService: PlayerService,
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
  @Inject(PLATFORM_ID) private platformId) { }
  @ViewChild('video') videoElement: ElementRef;
  name = 'Angular 6';


  ngOnInit() {
    if(this.livestreamPlayerWidth > 960) {
      this.livestreamPlayerWidth = 960;
    }
    this.acidMode = false;
  }

  ngAfterViewInit() {
        if(isPlatformBrowser(this.platformId)) {

    this.livestreamPlayerHeight = window.innerHeight;
    this.livestreamPlayerWidth = window.innerWidth;

    this.playerService.checkStream().subscribe(
      data => {
        console.log(data);
      }
    )
        if(this.livestreamPlayerWidth > 960) {
          this.livestreamPlayerWidth = 960;
        }
    const options = {
                  "preload": "auto",
                  "controls": true,
                  controlBar: {
                    volumePanel: {inline: false, show: true}
                  },
                  "width": this.livestreamPlayerWidth - 10,
                  hls: {
                    withCredentials: true
                  },
                  plugins: {
                    videoJsResolutionSwitcher: {
                      default: 'high',
                      dynamicLabel: true
                    }
                  }
               };

                  this.video = videojs(this.videoElement.nativeElement, options);

                  this.video.src([
                    {
                      type: "application/x-mpegURL",
                      src: "http://139.59.103.183/stream/hls/test.m3u8"
                      }
                  ]);
                  this.video.play();
                  console.log(this.video.userActive());
                  console.log(this.video.readyState());
                  this.fadeBGState = 'fadeOut';
      }

      this._title.setTitle("LIVE | SHCR")

    }

      ngOnDestroy() {
        this.video.dispose();
      }

      deactivateLivestream() {
        this.playerService.livestreamActive = false;
        this._location.go('home');
      }

      enableScroll() {
        this.renderer2.removeClass(this._document.body, 'scroll-disabled');
      }

      toggleAcidMode() {
        if(!this.acidMode) {
        this.renderer2.addClass(this.videoElement.nativeElement, 'acid-mode');
        this.renderer2.addClass(this.videoElement.nativeElement.parentNode, 'rainbows');
        console.log(this.videoElement);
        this.acidMode = true;
      } else if (this.acidMode) {
        this.renderer2.removeClass(this.videoElement.nativeElement, 'acid-mode');
        this.renderer2.removeClass(this.videoElement.nativeElement.parentNode, 'rainbows');
        this.acidMode = false;
      }
      }
}
