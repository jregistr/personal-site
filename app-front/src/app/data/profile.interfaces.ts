export interface Personal {
  name: string,
  title: string,
  imageUrl: string,
  resumeUrl?: string
}

export interface Contact {
  phone: string,
  email: string
}

export interface Socials {
  linkedIn?: string,
  github?: string,
  twitter?: string
}

export interface Messages {
  aboutMe: string,
  contactMe: string
}

export interface Profile {
  personal: Personal,
  messages: Messages,
  contact: Contact,
  socials: Socials
}
