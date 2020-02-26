import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class DataService {

  clientId: string = '3a890abe632f40d4af49171edbc2ce52';
  clientSecretId: string = '81e720ba11554523a6900536689b1a59';


  
  constructor(private _http: HttpClient) {
  }

  authorization() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecretId),
      })
    };
    let url = 'https://accounts.spotify.com/api/token';
    let params = 'grant_type=client_credentials';
    return this._http.post(url, params, httpOptions);
  }

  getArtistData() {
    let token = localStorage.getItem('access_token');
    if (token) {
      let httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token,
        })
      };
      let artist_id = '0du5cEVh5yTK9QJze8zA0C';
      return this._http.get(`https://api.spotify.com/v1/artists/${artist_id}/albums`, httpOptions);
    } else {
      //TODO: error
    }
  }
}
