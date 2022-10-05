import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'secret',
      database: 'mydb-dev', // 開発用のデータベース名を指定
      autoLoadEntities: true, // Entityが自動的に読み込まれる
      synchronize: true, // アプリケーションを起動時に自動でテーブルを作成
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
