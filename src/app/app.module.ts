import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from './_pipes/safe.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

// Home module

import { HomeComponent } from './home/home.component';
import { SliderComponent } from './home/slider/slider.component';

// Schedule Module

import { UpcomingComponent } from './schedule/upcoming/upcoming.component';
import { ScheduleSingleComponent } from './schedule/schedule-single/schedule-single.component';


// Blog Module

import { BlogSingleComponent } from './blog/blog-single/blog-single.component';
import { BlogComponent } from './blog/blog.component';
import { IframePipe } from './_pipes/iframe.pipe';

// Shows Module

import { ShowsComponent } from './shows/shows.component';
import { ShowSingleComponent } from './shows/show-single/show-single.component';
import { PlayerComponent } from './player/player.component';


// Residents Module

import { ResidentsComponent } from './residents/residents.component';
import { ResidentSingleComponent } from './residents/resident-single/resident-single.component';
import { LandingComponent } from './home/landing/landing.component';
import { JoinComponent } from './join/join.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShowsComponent,
    SliderComponent,
    PlayerComponent,
    HomeComponent,
    FooterComponent,
    ResidentsComponent,
    UpcomingComponent,
    BlogSingleComponent,
    BlogComponent,
    ResidentSingleComponent,
    ShowSingleComponent,
    ScheduleSingleComponent,
    IframePipe,
    SafePipe,
    LandingComponent,
    JoinComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    IframePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
