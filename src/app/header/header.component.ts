import { Renderer2, Inject, PLATFORM_ID, Component, OnInit, HostListener } from '@angular/core';

import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ActivatedRoute, Params } from '@angular/router';
import { PlayerService } from '../_services/player.service';
import { PostsService } from '../_services/posts.service';
import { HelpersService } from '../_services/helpers.service';

import * as moment from 'moment-timezone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('comingUpSlide', [
      state('comingUpSlide1', style({
        'margin-top':'0px'
      })),
      state('comingUpSlide2', style({
        'margin-top':'-30px'
      })),
      transition('* => *', animate(500)),
    ]),
    trigger('chatToggle', [
      state('chatClosed', style({
        'height': '0px'
      })),
      state('chatOpen', style({
        'height': '380px'
      })),
      transition('* => *', animate(500))
    ]),
    trigger('chatPanelToggle', [
      state('panelNotActive', style({
        'opacity': '1'
      })),
      state('panelActive', style({
        'opacity': '0',
        'visibility': 'hidden'
      })),
      transition('* => *', animate(500))
    ]),
    trigger('navToggle', [
      state('navHidden', style({
        'top': '-80px'
      })),
      state('navVisible', style({
        'top': '0px'
      })),
      transition('* => *', animate(500))
    ])
  ]
})
export class HeaderComponent implements OnInit {

  comingUpSliderState = 'comingUpSlide1';

  isLivestreamPage: boolean;
  viewHasLoaded = false;
  chatPanelActive = false;
  chatPanelToggleState = 'panelNotActive';
  chatActive = 'chatClosed';
  navToggleState = 'navHidden';
  windowOffset: number;

  constructor(public playerService: PlayerService,
    private postsService: PostsService,
    private helpersService: HelpersService,
              private renderer2: Renderer2,
              private route: ActivatedRoute,
              @Inject(DOCUMENT) private _document: Document,
              @Inject(PLATFORM_ID) private platformId) { }
  mobileMenuActive = false;


  isLoading: boolean;
  mode: string;


  ngOnInit() {
  }

  ngAfterViewInit() {
    if(isPlatformBrowser(this.platformId)) {

      this.viewHasLoaded = true;
    }
  }

  toggleMobileMenu() {
    this.mobileMenuActive = !this.mobileMenuActive;
  }
}
