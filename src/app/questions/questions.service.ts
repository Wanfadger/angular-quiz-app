import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private httpClient:HttpClient) { }

  getAllQuestions():Observable<Question[]>{
   return this.httpClient.get<Question[]>("../../assets/questions.json")
  }
}


export interface Question {
  question: string , 
  options: QuestionOption[],
  selectedOption:QuestionOption | null
}

export interface QuestionOption{text:string , isCorrect:boolean}