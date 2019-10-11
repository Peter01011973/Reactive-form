import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder, FormArray} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { CustomValidators, forbiddenNameValidator } from '../shared/custom-validator';



/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public hide: boolean = true;
  public profile: FormGroup; 
  public matcher: MyErrorStateMatcher = new MyErrorStateMatcher();
  public countHobby: number = 0;
  public isSubmited:boolean = false;
  public isRezult: boolean = false;

  constructor(private fb: FormBuilder) {
    this.profile = this.fb.group({  
      name: ['', [Validators.required, forbiddenNameValidator(/Peter/i)]],
      surname: [''],
      email:  ['', [ Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$') ]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [ Validators.required] ],
      birthdayDate: ['', [Validators.required, CustomValidators.dateValidator()]],
      gender: ['male'],
      hobbies: this.fb.array([])
    },
    {validator: CustomValidators.passwordMatchValidator}
    )
   }

  ngOnInit() {
  }

  public onSubmit() {
    this.isSubmited = true;
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.profile.controls[controlName].hasError(errorName);
  }

  public get hobbies() : FormArray {
    return (this.profile.get('hobbies') as FormArray)
  }

  public addHobby(): void {
    this.countHobby++;
    const hobby: FormControl = new FormControl('',Validators.required);
    this.hobbies.push(hobby);
  }

  public delete(i: number): void {
    this.countHobby--;
    this.hobbies.removeAt(i);
  }

  public onClick() {
    this.isRezult = true;
  }
}



// Предлагаю форму регистрации на отдельной странице
// - name
// - surname 
// - email
// - password 
// - confirm Password 
// - Дата рождения - select options (невозможность выбора 30 февраля и тд)
// - radio button (мужчина, женщина)


// - Классические валидации
// - Валидации на password, confirm Password на совпадение и на классические правила 8 символов и тд
// - Глазик фича, показать/скрыть пароль
// - Стилизация и сообщения с ошибками (динамическая, по покиданию поля, конкретные ошибки по каждому правилу)

// Форма опросник через formArray
// - добавить/удалить варианты ответа 

// Advanced: 
// - Добавить вопрос 
//   - добавить вариант ответа 
//   - удалить вариант ответа 
