import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendTestMail(
    @Body() body: { to: string; subject: string; text: string },
  ) {
    return this.mailService.sendMail(body.to, body.subject, body.text);
  }
}
