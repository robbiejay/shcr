import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { PostsService} from '../_services/posts.service';
import { PlayerService } from '../_services/player.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentYear = new Date().getDate();
  timestamp = '';
  megaAcidMode = false;
  constructor( public playerService: PlayerService,
              public postsService: PostsService,
              private renderer2: Renderer2,
            @Inject(DOCUMENT) private _document: Document,) { }

  ngOnInit() {
    this.getTimestamp();
  }


  getTimestamp() {
    this.postsService.getLatestUpdatedTimestamp().subscribe(
      data => {
        this.timestamp = data;
      }
    )
  }

  toggleMegaAcidMode() {
    if(!this.megaAcidMode) {
    this.renderer2.addClass(this._document.body, 'acid-mode');
    this.megaAcidMode = true;
  } else if (this.megaAcidMode) {
    this.renderer2.removeClass(this._document.body, 'acid-mode');
    this.megaAcidMode = false;
  }
  }
}
