import { Component, OnInit } from '@angular/core';
import { PollService } from '../../services/poll.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { IPoll, IAnswers } from '../../models/poll.model';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'poll-create-a-poll',
  templateUrl: './create-a-poll.component.html',
  styleUrls: ['./create-a-poll.component.scss']
})
export class CreateAPollComponent implements OnInit
{
  form: FormGroup;
  processing: boolean = false;

  constructor(
    private pollService: PollService,
    private fb: FormBuilder,
    private helper: HelperService
  ) { }

  ngOnInit()
  {
    this.createForm();

    console.log('Form control', this.answersFroms.controls);
  }

  private createForm()
  {
    this.form = this.fb.group({
      question: ['', Validators.compose([
        Validators.required, Validators.minLength(3), Validators.maxLength(500), this.noWhitespaceValidator
      ])],
      answers: this.fb.array([])
    });

    this.addAnswer();
    this.addAnswer();
  }

  get question() { return this.form.controls['question'] as FormControl; }

  get answersFroms()
  {
    return this.form.get('answers') as FormArray;
  }

  addAnswer()
  {
    const answer = this.fb.group({
      text: ['', [Validators.required, this.noWhitespaceValidator]]
    });

    this.answersFroms.push(answer);
  }

  removeAnswer(i: number)
  {
    this.answersFroms.removeAt(i);
  }

  clearForm()
  {
    this.createForm();
  }

  submitPoll()
  {
    this.processing = true;
    console.log(this.answersFroms.controls);

    const new_poll: IPoll = {
      question: this.question.value,
      pollAnswers: this.createPollAnswersArray()
    };

    console.log('New poll', new_poll);


    this.pollService.createNewPoll(new_poll).subscribe(res =>
    {
      this.helper.showAlert('Poll created');
      console.log('Response', res);
      this.processing = false;
      this.createForm(); // Reset form

    }, err =>
      {
        this.processing = false;
        console.log('Error on create poll', err);
      });
  }

  private createPollAnswersArray(): IAnswers[]
  {
    const array: IAnswers[] = [];

    this.answersFroms.controls.forEach((group: FormGroup, i) =>
    {
      array.push({
        orderId: i,
        text: group.controls['text'].value
      });
    });

    return array;
  }


  private noWhitespaceValidator(control: FormControl)
  {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
}
