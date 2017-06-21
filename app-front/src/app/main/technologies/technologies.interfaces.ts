export interface Technology {
  name: string,
  description: string,
}

export interface TechnologySummary {
  description: string,
  techs: Technology[]
}
