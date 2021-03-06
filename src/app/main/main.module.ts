import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ApiService } from '../shared/services/api.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { PopularBookComponent } from './popular-book/popular-book.component';
import { HomeComponent } from './home/home.component';
import { ReviewFormComponent } from './book-details/review-form/review-form.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthorsComponent } from './authors/authors.component';
import { BooksComponent } from './authors/books/books.component';
import { PublishersComponent } from './publishers/publishers.component';
import { PBooksComponent } from './publishers/p-books/p-books.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RateComponent } from './rate/rate.component';
import { DetailsComponent } from './customer-profile/details/details.component';

import { BasketComponent } from './basket/basket.component';
import { ProcessAddressComponent } from './basket/process-address/process-address.component';
import { ProcessInformationComponent } from './basket/process-information/process-information.component';
import { PayAndSendComponent } from './basket/pay-and-send/pay-and-send.component';
import { RateBookComponent } from './rate-book/rate-book.component';



export function HttpLoaderFactory(http: HttpClient) {
return new TranslateHttpLoader(http);
}

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'home'},
  {path:'home',component:HomeComponent},
  {path:'main',component:MainComponent},
  {path:'books',component:BookListComponent},
  {path:'books/:id',component:BookDetailsComponent},
  {path:'profile',component:CustomerProfileComponent},

  {path:'authors',component:AuthorsComponent},
  {path:'publishers',component:PublishersComponent},
  {path:'authorsBook/:id',component:BooksComponent},
  {path:'publishersBook/:id',component:PBooksComponent},
  {path:'aboutUs',component:AboutUsComponent},
  {path:'details/:id',component:DetailsComponent},
  
  {path:'basket',component:BasketComponent},
  {path:'processAddress',component:ProcessAddressComponent},
  {path:'processInformation',component:ProcessInformationComponent},
  {path:'payAndSend',component:PayAndSendComponent},
 
  
];

@NgModule({
  declarations: [
    MainComponent,

    BookListComponent, 
    BookDetailsComponent,
    HeaderComponent, 
    FooterComponent,
    PopularBookComponent, 
    HomeComponent, 
    ReviewFormComponent, 
    CustomerProfileComponent, 
     
    AuthorsComponent, 
    BooksComponent, 
    PublishersComponent, 
    PBooksComponent, 
    AboutUsComponent, 
    RateComponent, 
    DetailsComponent, 
   
    BasketComponent, 
    ProcessAddressComponent, 
    ProcessInformationComponent, 
    PayAndSendComponent, RateBookComponent],
  imports: [
    
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
      }
      }),
    FormsModule,
    FontAwesomeModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule],
  providers:[ 
    ApiService
  ]
})
export class MainModule { }
