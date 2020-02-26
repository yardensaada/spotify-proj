import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Album } from '../../models/album';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  albums = {'Select album': null};
  albumsKeys = [];
  selectedAlbum;

  constructor(
    private dataService: DataService
    ) {}

  ngOnInit() {
    if (localStorage.getItem('access_token')) {
      this.parseAlbumsDetails();
    } else {
      this.dataService.authorization().subscribe(res => {
        localStorage.setItem('access_token', res['access_token']);
        this.parseAlbumsDetails();
      });
    }

  }
  
  parseAlbumsDetails() {
    this.selectedAlbum = (localStorage.getItem('selectedAlbum')) || null;
    this.dataService.getArtistData()
    .map(artistData => artistData['items'])
    .subscribe(albums => {
      albums.forEach(album => {
        this.albums[album.name] = new Album(album.release_date, album.images[0].url);
      });
      this.albumsKeys = Object.keys(this.albums);
    });
  }

  onSelectedElementChange(event) {
    this.selectedAlbum = event;
  }
}
