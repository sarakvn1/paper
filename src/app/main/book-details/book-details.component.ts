import { Component, Input,EventEmitter,Output, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faCoffee, faStar } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { AddToCardService } from 'app/shared/services/add-to-card.service';
import { ApiService } from 'app/shared/services/api.service';
import { MessageService } from 'app/shared/services/message.service';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';

declare const bookDetail:any
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book:any
  quantity=1
  reviews:any
  reviewLen:number
  // @Input() book;
  @Output() bookAdded=new EventEmitter()
  BookRate=2
  faStar=faStar
  lang:string
  constructor(
    private _Activatedroute:ActivatedRoute,
    private apiService:ApiService,
    private messageService:MessageService,
    private translate:TranslateService,
    private cookieService:CookieService,
    private addToCardService:AddToCardService
     ) {
      translate.setDefaultLang('En');
      this.lang=this.cookieService.get('lang')
      if (this.lang=='En'){
        this.translate.use('en');
      }else if (this.lang='Fa'){
        this.translate.use('');
      }
      }

     sendMessage(message): void {
      // send message to subscribers via observable subject
      this.messageService.sendMessage(message);
  }
  getAllReviews=()=>{
    // const bookId=Number(this.id)

    this.apiService.getReviews(this.id).subscribe(
      data=>{
        this.reviews=data['result']
        this.reviewLen=this.reviews.length
        console.log("len",this.reviewLen)
        console.log("len",data)
        console.log("reviews",this.reviews,this.id)
        
      },
      error=>console.log(error))
  }
  clearMessages(): void {
      // clear messages
      this.messageService.clearMessages();
  }
  id=null;
  ngOnInit() {
    // this.sendMessage()
    // bookDetail()
    
    this.id=this._Activatedroute.snapshot.paramMap.get("id");

    this.apiService.getBook(this.id).subscribe(
      data=>{
        this.book=data
      },
      error=>console.log(error))
      this.getAllReviews()
  }
  plus=(evt)=>{
    this.quantity++
  }
  minus=(evt)=>{
    if (this.quantity ==1){
     this.quantity=this.quantity
    }
    else {
     this.quantity --
    }
    
  }
  rateHovered=0
  rateHover(rate){
    this.rateHovered=rate
  }
  quantityForm=new FormGroup(
    {
      quantity:new FormControl('')
     
    }
  )

  rateClicked(rate){
    const bookId=Number(this.id)
    this.apiService.rateBook(rate,bookId).subscribe(
      result=>this.refreshDetail(),
      error=>console.log(error)
      
    )
  }
  refreshDetail(){
    this.apiService.getBook(this.id).subscribe(
      data=>{
        this.book=data
        
      },
      error=>console.log(error))
      
  }
  refresh=false
  
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
}
