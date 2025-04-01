export enum ContactType {
  Email = "Email",
  Phone = "Phone",
  Text = "Text",
  Link = "Link",
}

export interface ContactModel {
  type: ContactType;
  value: string;
  icon: string;
  alt: string;
  link?: string;
}