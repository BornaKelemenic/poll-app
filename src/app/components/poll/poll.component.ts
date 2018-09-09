import { Component, OnInit, OnDestroy } from '@angular/core';
import { PollService } from '../../services/poll.service';
import { HelperService } from '../../services/helper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPoll, IPollResult } from '../../models/poll.model';

@Component({
  selector: 'poll-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit, OnDestroy
{
  poll_guid: string;
  poll: IPoll;
  selectedAnswer;

  loading = false;

  subs: Subscription = new Subscription();

  constructor(
    private pollService: PollService,
    private helper: HelperService,
    private route: ActivatedRoute,
    private router: Router
  )
  {}

  ngOnInit()
  {
    this.route.params.subscribe(params =>
    {
      this.poll_guid = params.guid;
      console.log('GUID:', this.poll_guid);
      this.getPoll();
    });
  }

  ngOnDestroy()
  {
    if (this.subs) { this.subs.unsubscribe(); }
  }

  private getPoll()
  {
    this.loading = true;
    this.subs = this.pollService.getPoll(this.poll_guid).subscribe(res =>
    {
      if (!res) { this.router.navigate(['/']); }
      console.log('Poll', res);
      this.poll = res;
      this.loading = false;

    }, err => { console.log('Getting poll error', err); this.loading = false; });
  }

  vote()
  {
    console.log('Selected', this.selectedAnswer);

    this.poll.PollAnswers.forEach(a => a.OrderId === this.selectedAnswer ? a.Selected = true : a.Selected = false);

    const answer: IPollResult = {
      ParentPollGuid: this.poll.PollGuid,
      Answers: this.poll.PollAnswers
    };

    console.log('Poll result: ', answer);

    this.loading = true;

    this.pollService.submitPollResult(answer).subscribe(res =>
    {
      console.log('Response on submit', res);
      this.loading = false;
      this.router.navigate(['/results', this.poll_guid]);

    }, err =>
    {
      console.log('Error voting', err);
      this.loading = false;
    });
  }
}
