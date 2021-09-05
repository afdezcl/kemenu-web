import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingComponent } from './ranking.component';
import { RankingRoutingModule } from './ranking-routing.module';
import { RankingCardComponent } from './ranking-card/ranking-card.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    RankingRoutingModule,
    RouterModule,
    TranslateModule
  ],
  declarations: [
    RankingComponent,
    RankingCardComponent
  ]
})
export class RankingModule { }
