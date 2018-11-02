import { Module } from '@nestjs/common'
import { applyDomino, AngularUniversalModule } from '@nestjs/ng-universal'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'

const BROWSER_DIR = join(process.cwd(), 'dist/web')
applyDomino(global, join(BROWSER_DIR, 'index.html'))

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      viewsPath: BROWSER_DIR,
      bundle: require('../../dist/web-ssr/main.js'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
