import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from "@angular/common";
import { Title, Meta } from '@angular/platform-browser';
import { PostsService } from '../../_services/posts.service';
import { HelpersService } from '../../_services/helpers.service';

import * as moment from 'moment-timezone';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss']
})
export class UpcomingComponent implements OnInit {
  upcomingShows = [];
  originalUpcomingShows = [];
  constructor(private postsService: PostsService,
              private helpersService: HelpersService,
              private router: Router,
              private route: ActivatedRoute,
              private _title: Title,
              private _meta: Meta,
              @Inject(PLATFORM_ID) private platformId) { }

  currentDateHKMoment: string;
  currentDateMoment: string;
  currentTimeHKMoment : string;
  timeDifferenceMoment: number;

  currentDateHK: string;
  currentTimeHK: string;
  currentHourHK : number;
  upcomingHourHK : number;
  timeDifference : number;
  currentDate : string;
  mode: string;
  isLoading: boolean;

  currentCategory = '';

  daysOfWeek = [
    '周日/SUN','周一/MON','周二/TUE','周三/WED',"周四/THU","周五/FRI","周六/SAT"
  ]


  ngOnInit() {
    this.isLoading = true;
  }

  // Move a lot of this computation to the back-end

  ngAfterViewInit() {
    if(isPlatformBrowser(this.platformId)) {

      if(this.route.snapshot.url.length == 0 || this.route.snapshot.url[0].path == 'livestream' || this.route.snapshot.url[0].path == 'home') {
      this.mode = 'home'
      } else {
      this.mode = 'archive'
      }

if(this.mode === 'archive') {
  this._title.setTitle("Schedule | SHCR");
  this._meta.updateTag({ name: 'description', content: "Schedule of upcoming shows on Hong Kong Community Radio"});
  this._meta.updateTag({ name: 'keywords', content: 'schedule, DJ, mix, hong kong, electronic, music'});
}
this.currentDateHK = moment().tz("Asia/Hong_Kong").format('YYYY-MM-DD');
this.currentDate = moment().local().format('YYYY-MM-DD');
this.currentTimeHK = moment().tz("Asia/Hong_Kong").format('HH:mm:SS');
this.timeDifference = 8 - (moment().local().utcOffset() / 60);

this.getUpcomingShows();
}
  }

  getUpcomingShows() {
                if(isPlatformBrowser(this.platformId)) {
    this.postsService.getUpcomingShows().subscribe(
      data => {
  //      console.log(data);

  let upNext = false;

        data.forEach(upcoming => {
          this.isLoading = false;
          let featured_img;
          if(upcoming._embedded["wp:featuredmedia"] == undefined) {
            featured_img = "assets/default-show.png";
          } else {
            if(upcoming._embedded['wp:featuredmedia'][0].media_details == undefined ) {
              featured_img = "assets/default-show.png";
            } else {
            featured_img = upcoming._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url;
          }
          }

          let excerpt = this.helpersService.HtmlEncode(upcoming.excerpt.rendered.replace(/<[^>]*>/g, ''));
          // console.log(excerpt);
          let excerptArr = excerpt.split('–');
          let date = excerptArr[0].trim().replace( /\//g, '-').split('-').reverse().join('-');
          let time = excerptArr[1].trim();

          let day = moment(date).format('d');
          let upcomingDataArr = date.split('-');
          let currentDateHKArr = this.currentDateHK.split('-');


          let timeArr = time.split(':');
          let newHour = parseInt(timeArr[0]) - this.timeDifference;
          timeArr[0] = JSON.stringify(newHour);

          if(newHour >= 24) {
            timeArr[0] = JSON.stringify(newHour - 24);
          }
          if(newHour < 0) {
            timeArr[0] = JSON.stringify(newHour + 24);
          }
          let local_time = timeArr.join(':');



          let has_show_aired = false;
          let now_playing = false;
          let up_next = false;


          if (upcomingDataArr.join('') < currentDateHKArr.join('')) {
            has_show_aired = true;
          }

          if (upcomingDataArr.join('') == currentDateHKArr.join('')) {
            let upcomingTimeArr = time.split(':');
            let currentTimeHKArr = this.currentTimeHK.split(':');


            if (upcomingTimeArr[0].trim() < currentTimeHKArr[0].trim()) {
              has_show_aired = true;
            }


            if (upcomingTimeArr[0].trim() == currentTimeHKArr[0].trim()) {
              now_playing = true;
            }
          }
          let titleArr = this.helpersService.HtmlEncode(upcoming.title.rendered).split('[');
          let title = titleArr[0];
          let categoryArr = titleArr[1].split(']');
          let category = categoryArr[0];

          if (category == 'Performance') { category = '表演/' + category}
          if (category == 'Workshop') { category = '工作坊/' + category}
          if (category == 'Panel Talk') { category = '论坛/' + category}
          let upcomingData = {
            title: title,
            category: category,
            content: this.helpersService.HtmlEncode(upcoming.content.rendered.replace(/<[^>]*>/g, '')),
            filename: date + '-' + this.helpersService.HtmlEncode(upcoming.title.rendered).replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase(),
            excerpt: this.helpersService.HtmlEncode(upcoming.excerpt.rendered.replace(/<[^>]*>/g, '')),
            date : moment(date).format('YYYY-MM-DD'),
            dateDisplay: moment(date).format('DD/MM/YYYY'),
            time: time,
            day: day,
            local_time: local_time,
            featured_image: featured_img,
            has_show_aired: has_show_aired,
            now_playing: now_playing,
            up_next: up_next
          }



          if (!upcomingData.has_show_aired) {
          this.upcomingShows.push(upcomingData);
          }

        })


          this.upcomingShows.sort((a, b) => {
          if (a.date > b.date) { return 1 }
          if (a.date < b.date) { return -1}
          if (a.date == b.date ) {
            if (a.time > b.time) { return 1 }
            if (a.time < b.time ){ return -1}
          }
        })

        let hasUpNext = false;
        this.upcomingShows.forEach((item, i) => {
          if(item.up_next) {
            hasUpNext = true;
          }
          if(this.mode == 'home') {
          let indexOfPeriod = item.content.indexOf('.');
          item.content = item.content.substring(0, indexOfPeriod);
          }
        })
        if (!hasUpNext) {
          if(this.upcomingShows[0].now_playing) {
          this.upcomingShows[1].up_next = true;
        } else {
          this.upcomingShows[0].up_next = true;
        }

        if(this.mode == 'home') {
          this.upcomingShows = this.upcomingShows.splice(0,4);
        }

        }
      })
      this.originalUpcomingShows = this.upcomingShows;
  }
}

goTo(location) {
  this.router.navigate(['schedule/' + location])
}

filterBy(category) {
  if (this.currentCategory == category) {
    this.upcomingShows = this.originalUpcomingShows;
    this.currentCategory = '';
  } else {
    this.upcomingShows = this.originalUpcomingShows.filter(show => show.category == category);
    this.currentCategory = category
  }

}

}
