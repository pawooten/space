import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';

import { AppService } from './services/app.service';
import { GameService } from './services/game.service';
import { ScoreService } from './services/score.service';

@NgModule({
  declarations: [
    AppComponent,
    ScoreboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ AppService, GameService, ScoreService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
