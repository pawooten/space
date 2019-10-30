import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';

import { AppService } from './services/app.service';
import { GameService } from './services/game.service';
import { ScoreService } from './services/score.service';
import { ImageLoaderService } from './services/image-loader.service';
import { DataLoaderService } from './services/data-loader.service';
@NgModule({
  declarations: [
    AppComponent,
    ScoreboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule//,
    // HttpClientModule
  ],
  providers: [ AppService, GameService, ScoreService, ImageLoaderService, DataLoaderService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
