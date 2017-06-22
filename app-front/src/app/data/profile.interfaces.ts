export interface Personal {
  name: string,
  title: string,
  imageUrl: string,
  messages: Messages,
  resume?: string
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

export interface Profile {
  personal: Personal,
  contact: Contact,
  socials: Socials
}

export interface Messages {
  aboutMe: string,
  contactMe: string
}
