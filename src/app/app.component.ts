import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
//import { AppModule } from './app.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, RouterModule, RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {
  title = 'System demonstracyjny wejść i wyjść klientów w obiektach handlowych';
  //message_viewed: boolean;
  constructor()
  {
    /*if (!this.message_viewed)
    {
        this.message = '';
    }*/
    //else
    //{
        
    //}
    //alert(this.message_url);
  }
}
