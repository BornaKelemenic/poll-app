export interface IPoll
{
  id?: string;
  PollGuid?: string;
  Question: string;
  PollAnswers: IAnswers[];
}
export interface IAnswers
{
  OrderId: number;
  Text: string;
  ScalarValue?: number;
  Selected?: boolean;
}

export interface IPollResult
{
  id?: string;
  ParentPollGuid: string;
  Answers: IAnswers[];
}

export interface IPollReport
{
  id: string;
  ParentPollGuid: string;
  Question: string;
  PollAnswerSummaries: IPollAnswerSummary[];
  VoteCount: number;
}
export interface IPollAnswerSummary
{
  AnswerText: string;
  OrderId: number;
  Count: number;
}

export interface ISearchResponse
{
  value: ISearchResult[];
}

export interface ISearchResult
{
  '@search.score': number;
  id: string;
  ParentPollGuid: string;
  Question: string;
  VoteCount: number;
}
