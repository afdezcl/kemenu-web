import { Component, Input } from '@angular/core';
import Ranking from '@models/ranking/ranking.model';

@Component({
  selector: 'app-ranking-card',
  templateUrl: './ranking-card.component.html',
  styleUrls: ['./ranking-card.component.scss']
})
export class RankingCardComponent {

  @Input() restaurant: Ranking;

  constructor() { }

}
