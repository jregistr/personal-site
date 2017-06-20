export interface Example {
  name: string,
  url: string
}

export interface Technology {
  name: string,
  examples: Example[]
}

export interface TechnologySummary {
  description: string,
  techs: Technology[]
}
