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
  celebrationImage:string = "https://media.istockphoto.com/vectors/party-popper-with-confetti-vector-id1125716911?k=20&m=1125716911&s=612x612&w=0&h=1jfthodW7JsOR8vz3A_e2HJbrAAjPJhogviXeOwaz5c="
  name:string  = localStorage.getItem("USER-NAME") || ""

  constructor(private _questionsService:QuestionsService) { }


  questions !: Question[]
  currentQuestionIndex:number = 0
  timer:number = 60
  timerInterval$ !:Observable<number>
  timerIntervalSubscription !:Subscription

  progressCount = 0
  endQuiz:boolean = false

  ngOnInit(): void {
    this.getAllQuestions()
    this.startTimer()
   
  }

  getAllQuestions(){
     this._questionsService.getAllQuestions().subscribe(response => {
      console.log(response)
      this.questions = response
      this.setProgess(1)
     })
  }

  next(){
      if(this.currentQuestionIndex < this.questions.length-1){
        ++this.currentQuestionIndex
        this.setProgess(this.currentQuestionIndex+1)
        this.timer = 60
      }else{
        console.log("Quiz is done")
       /// summary
       this.stopTimer()
       // stop timer
       this.timer=0
       // end quiz and show summary
       this.endQuiz = true
      }
  }
  prev(){
    this.currentQuestionIndex--
  }
  
  reset(){
    this.endQuiz = false
    this.stopTimer()
    this.getAllQuestions()
    this.currentQuestionIndex = 0
    this.timer = 60
    this.startTimer()
    this.setProgess(0)
  }

  startTimer(){
    // emits after every 1000 milliseconds
   this.timerInterval$ = interval(1000)
   this.timerIntervalSubscription =  this.timerInterval$.subscribe(value => {
      this.timer--
      if(this.timer === 0){
        if(this.currentQuestionIndex < this.questions.length-1){
          this.currentQuestionIndex++
          this.timer = 60
          this.setProgess(this.currentQuestionIndex+1)  
        }else{
          /// stop timer
          this.stopTimer()
          this.timer=0

          // disable selections

          // go to summary
          this.endQuiz = true
        }
      }
   })  
  }

  stopTimer(){
    this.timerIntervalSubscription.unsubscribe()
    this.timer = 60
  }

  setProgess(index:number){
    this.progressCount = (index/this.questions.length)*100
  }

  getTotalCorrect():Question[]{
    return this.questions.filter(qn => qn.selectedOption?.isCorrect)
  }

  getTotalWrong(){
    return this.questions.filter(qn => !qn.selectedOption?.isCorrect)
  }


  getMissedTotal():Question[]{
    return this.questions.filter(qn =>  !Object.keys(qn).includes('selectedOption') )
  }

  percentageScore(){
    return Math.round(((this.getTotalCorrect().length/this.questions.length) * 100))
  }

  ngOnDestroy(): void {
    this.startTimer()
  }

}