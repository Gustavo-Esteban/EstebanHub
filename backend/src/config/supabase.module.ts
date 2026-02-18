import { Module, Global } from '@nestjs/common';
import { supabaseProvider } from './supabase.config';

@Global() // Torna o módulo global - disponível em toda a aplicação
@Module({
  providers: [supabaseProvider],
  exports: [supabaseProvider],
})
export class SupabaseModule {}
