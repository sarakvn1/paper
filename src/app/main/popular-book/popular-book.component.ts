import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { AddToCardService } from 'app/shared/services/add-to-card.service';
import { ApiService } from 'app/shared/services/api.service';
import { MessageService } from 'app/shared/services/message.service';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-popular-book',
  templateUrl: './popular-book.component.html',
  styleUrls: ['./popular-book.component.scss']
})
export class PopularBookComponent implements OnInit {
  authors:any
 
// @Input() books:any;
  // @Output() selectBook=new EventEmitter()
  books:any
  bookOfYear:any
  genres:any
  selectedBook:null
  lang:string
  
  constructor(
    public apiService:ApiService,
    private messageService:MessageService,
    private translate:TranslateService,
    private cookieService:CookieService,
    private router:Router,
    private addToCardService:AddToCardService
    ) {
      translate.setDefaultLang('En');
    this.lang=this.cookieService.get('lang')
    if (this.lang=='En'){
      this.translate.use('En');
    }else if (this.lang='Fa'){
      this.translate.use('Fa');
    }
     }
    sendMessage(message): void {
      // send message to subscribers via observable subject
      this.messageService.sendMessage(message);
  }

  clearMessages(): void {
      // clear messages
      this.messageService.clearMessages();
  }
  
  goToAuthorsBook(authorId){
    this.router.navigate(['/authorsBook',authorId]);

  }
  
  ngOnInit(){
    this.apiService.getBooks().subscribe(
      data=>{
        
        this.bookOfYear=data
        
      },
      error=>console.log(error))
    this.apiService.getAuthors().subscribe(
      data=>{
        this.authors=data
        
      },
      error=>console.log(error))
    this.apiService.getGenres().subscribe(
      data=>{
        this.genres=data
      },
      error=>console.log(error))
    // this.Genres=this.apiService.getGenres()
    this.apiService.getHomePageBooks().subscribe(
      data=>{
        
        this.books=data['book']
        
      },
      error=>console.log(error))
  }
  
  getAllBooks(){
    this.apiService.getBooks().subscribe(
      data=>{
        
        this.books=data
        
      },
      error=>console.log(error))
  }
  getGenreBooks(id){
    
    this.apiService.getBooksByGenre(id).subscribe(
      data=>{
        
        this.books=data['book']
      

      },
      error=>console.log(error)
    )
    // this.books=this.genres[id-1]['listOfBooks']
    // console.log("books",this.books)
    // this.books=this.genres[id]
  }
  
  faStar=faStar
  add(book){
    var today=moment().format();  
     const order={
      book_id:book.id,
      book_img:book.image,
      book_title:book.title,
      book_author:book.author,
      book_price:book.price,
      quantity:1,
      date:today
    }
    this.apiService.getOrders(order)
    this.sendMessage("one item added")
    this.addToCardService.sendfactorCodeToServer()
    
    }
  // bookClicked(book){
  //   this.selectBook.emit(book)
  // }
}
