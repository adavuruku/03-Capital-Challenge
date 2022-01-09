export interface EmailOption {
  to: string;
  subject: string;
  from: string;
  verifyLink: string;
  template?: string;
  verificationCode?: string;
}
