export interface IPoll
{
  id?: string;
  pollGuid?: string;
  question: string;
  pollAnswers: IAnswers[];
}
export interface IAnswers
{
  orderId: number;
  text: string;
  scalarValue?: number;
}

export interface IPollResult
{
  id: string;
  parentPollGuid: string;
  answers: IPollAnswer[];
}
export interface IPollAnswer extends IAnswers
{
  selected?: boolean;
}

export interface IPollReport
{
  id: string;
  parentPollGuid: string;
  pollAnswerSummaries: IPollAnswerSummary[];
}
export interface IPollAnswerSummary
{
  answerText: string;
  orderId: number;
  count: number;
}
