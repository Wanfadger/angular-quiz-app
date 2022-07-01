import { Component, Input, OnInit } from '@angular/core';
import { Question, QuestionOption } from '../questions.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input("question") question !: Question
  constructor() { }

  ngOnInit(): void {
  }

  selectAnswer(selectedOption:QuestionOption){
    console.log(selectedOption)
    this.question.selectedOption = selectedOption
    console.log(this.question)
  }
}
