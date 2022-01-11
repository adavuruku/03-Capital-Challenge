export interface GmailOption {
  from: string;
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  template?: string;
  attachment?: any;
  templatePayload?: any;
  verificationLink?: string;
}
