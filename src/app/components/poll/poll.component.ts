import { Component, OnInit, OnDestroy } from '@angular/core';
import { PollService } from '../../services/poll.service';
import { HelperService } from '../../services/helper.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPoll } from '../../models/poll.model';

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

  subs: Subscription = new Subscription();

  constructor(
    private pollService: PollService,
    private helper: HelperService,
    private route: ActivatedRoute
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
    this.subs = this.pollService.getPoll(this.poll_guid).subscribe(res =>
    {
      console.log('Poll', res);
      this.poll = res;

    }, err => { console.log('Getting poll error', err); });
  }

}
