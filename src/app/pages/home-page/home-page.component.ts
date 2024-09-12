import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  constructor(
    private _dbService: DbService
  ) { }

  ngOnInit(): void {
    // this._dbService.getUsers().subscribe({
    //   next: value => console.log(value),
    //   error: error => console.log(error),
    //   complete: () => console.log('Get All Users attempt completed!')
    // })

    // this._dbService.getUserByEmail('josefa@gmail.com').subscribe({
    //   next: value => {
    //     if(value) {
    //       console.log(value)
    //     } else {
    //       console.log('User not found!')
    //     }
    //   },
    //   error: error => console.log(error),
    //   complete: () => console.log('Get User By Email attempt completed!')
    // })
  }
}
