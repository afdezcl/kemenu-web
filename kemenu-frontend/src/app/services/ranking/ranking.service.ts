import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import Ranking from '@models/ranking/ranking.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getRankingRestaurant(): Observable<Ranking[]> {
    return this.httpClient.get<Ranking[]>(environment.apiBaseUrl + '/public/v1/short');
  }
}
