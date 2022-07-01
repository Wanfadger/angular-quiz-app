import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { Question, QuestionsService } from './questions.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit , OnDestroy {
  angularImage:string = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png"

  name:string  = localStorage.getItem("USER-NAME") || ""

  constructor(private _questionsService:QuestionsService) { }


  questions !: Question[]
  currentQuestionIndex:number = 0
  timer:number = 60
  timerInterval$ !:Observable<number>
  timerIntervalSubscription !:Subscription

  progressCount = 0

  ngOnInit(): void {
    this.getAllQuestions()
    this.startTimer()
   
  }

  getAllQuestions(){
     this._questionsService.getAllQuestions().subscribe(response => {
      console.log(response)
      this.questions = response
      this.getProgess(1)
     })
  }

  next(){
      if(this.currentQuestionIndex < this.questions.length-1){
        ++this.currentQuestionIndex
        this.getProgess(this.currentQuestionIndex+1)
      }else{
       /// summary
      }
     
  }
  prev(){
    this.currentQuestionIndex--
    console.log(this.currentQuestionIndex)
  }
  
  reset(){
    this.stopTimer()
    this.getAllQuestions()
    this.currentQuestionIndex = 0
    this.timer = 60
    this.startTimer()
  }

  startTimer(){
    // emits after every 1000 milliseconds
   this.timerInterval$ = interval(1000)
   this.timerIntervalSubscription =  this.timerInterval$.subscribe(value => {
      this.timer--
      if(this.timer === 0){
        this.currentQuestionIndex++
        this.timer = 60
        this.getProgess(this.currentQuestionIndex+1)
      }
   })  
  }

  stopTimer(){
    this.timerIntervalSubscription.unsubscribe()
    this.timer = 60
  }

  getProgess(index:number){
    console.log(this.currentQuestionIndex)
    this.progressCount = (index/this.questions.length)*100
    console.log(this.progressCount)
  }

  ngOnDestroy(): void {
    this.startTimer()
  }

}