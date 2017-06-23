export interface Article {
  title: string,
  summary: string,
  url: string
}

export interface Project {
  title: string,
  subTitle: string,
  description: string,
  imageUrl?: string,
  projectUrl?: string
}

export interface Occupation {
  company: string,
  title: string,
  city: string,
  state: string,
  startMonth: string,
  startYear: number,
  story: string,
  endMonth: string,
  endYear?: number
}

export interface Technology {
  name: string,
  description: string,
}

export interface TechnologySummary {
  description: string,
  techs: Technology[]
}
