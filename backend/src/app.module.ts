import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './config/supabase.module';
import { AuthModule } from './modules/auth/auth.module';
import { EmailModule } from './modules/email/email.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { TestimonialsModule } from './modules/testimonials/testimonials.module';
import { ServicesModule } from './modules/services/services.module';
import { LeadsModule } from './modules/leads/leads.module';
import { SettingsModule } from './modules/settings/settings.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SupabaseModule,
    AuthModule,
    EmailModule,
    ProjectsModule,
    TestimonialsModule,
    ServicesModule,
    LeadsModule,
    SettingsModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
