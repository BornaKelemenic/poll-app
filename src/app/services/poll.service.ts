import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIDOMAIN, SEARCH_API_URL, API_KEY } from 'src/api-url';
import { Observable } from 'rxjs';
import { IPoll, IPollReport, IPollResult, ISearchResponse } from '../models/poll.model';

@Injectable({
  providedIn: 'root'
})
export class PollService
{


  constructor(
    private http: HttpClient
  )
  { }


  /**
   * Gets a single poll by it's guID
   *
   * /poll/{guID}
   * @param guid
   */
  getPoll(guid: string): Observable<IPoll>
  {
    return this.http.get<IPoll>(APIDOMAIN + 'poll/' + guid);
  }

  /**
   * Gets a poll's results
   *
   * /poll/results/{guid}
   * @param guid
   */
  getResults(guid: string): Observable<IPollReport>
  {
    return this.http.get<IPollReport>(APIDOMAIN + 'poll/results/' + guid);
  }

  /**
   * Creates a new poll
   *
   * @returns guid string
   * @param poll
   */
  createNewPoll(poll: IPoll): Observable<string>
  {
    return this.http.post<string>(APIDOMAIN + 'poll', poll);
  }

  /**
   * Submits a new poll result
   *
   * @returns void - code 200 means all ok
   * @param result
   */
  submitPollResult(result: IPollResult): Observable<void>
  {
    return this.http.post<void>(APIDOMAIN + 'poll/results', result);
  }

  searchForAPoll(term: string): Observable<ISearchResponse>
  {
    return this.http.get<ISearchResponse>(SEARCH_API_URL + term, {
      headers: {
        'api-key': API_KEY
      }
    });
  }
}
