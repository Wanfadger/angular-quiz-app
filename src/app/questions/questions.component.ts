import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  angularImage:string = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png"
  constructor() { }

  questions:Question[] = [
    {question:"What's Your Name" , answers:[{value:"wanfadger1" , isCorect:false} , {value:"wanfadger" , isCorect:true} , {value:"wanfadger2" , isCorect:false} , {value:"wanfadger4" , isCorect:false}]},
    {question:"What's Your Jbo" , answers:[{value:"developer" , isCorect:true} , {value:"nurse" , isCorect:false} , {value:"engineer" , isCorect:false} , {value:"Doctor" , isCorect:false}]},
  ]


  ngOnInit(): void {
  }

}


export interface Question{
  question:string
  answers:Answer[],
  selectedAnswer?:Answer
}

export interface Answer{
  value:string , isCorect:boolean
}