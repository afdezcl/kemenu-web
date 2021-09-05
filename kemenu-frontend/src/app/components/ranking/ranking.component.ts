import { Component, OnInit } from '@angular/core';
import Ranking from '@models/ranking/ranking.model';
import { RankingService } from '@services/ranking/ranking.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  public ranking: Ranking[];
  public rankingCopy: Ranking[];

  constructor(private rankingService: RankingService) { }

  ngOnInit() {
    this.getRanking();
  }

  getRanking(): void {
    this.rankingService.getRankingRestaurant()
      .subscribe((response: Ranking[]) => {
        this.ranking = response;
        this.rankingCopy = this.ranking;
      });
  }

  filterRanking(input: KeyboardEvent): void {
    const desiredRestaurant: string = (input.target as HTMLInputElement).value;
    this.rankingCopy = this.ranking.filter((restaurant: Ranking) =>
      restaurant.businessName.toLocaleLowerCase().includes(desiredRestaurant.toLocaleLowerCase())
    );
  }
}
