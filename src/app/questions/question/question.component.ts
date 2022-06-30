import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../questions.component';

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

}
