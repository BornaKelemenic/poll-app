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
}

export interface IPollResult
{
  id: string;
  ParentPollGuid: string;
  Answers: IPollAnswer[];
}
export interface IPollAnswer extends IAnswers
{
  Selected?: boolean;
}

export interface IPollReport
{
  id: string;
  ParentPollGuid: string;
  PollAnswerSummaries: IPollAnswerSummary[];
}
export interface IPollAnswerSummary
{
  AnswerText: string;
  OrderId: number;
  Count: number;
}
