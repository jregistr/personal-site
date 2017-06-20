export interface Credit {
  name: string,
  url: string
}

export interface CreditSummary {
  message: string,
  credits: Credit[]
}
