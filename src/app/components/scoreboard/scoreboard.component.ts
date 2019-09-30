import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../../services/score.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  get highScore(): number {
    return this.scoreService.highScore;
  }

  get currentScore(): number {
    return this.scoreService.currentScore;
  }

  get currentStage(): number {
    return this.scoreService.currentStage;
  }
  constructor(private scoreService: ScoreService) {
  }

  ngOnInit() {
  }

}
