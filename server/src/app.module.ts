import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { applyDomino, AngularUniversalModule } from '@nestjs/ng-universal'
import { mongooseModuleConfig } from '@qb/common/config/mongoose-module-config.generated'
import { join } from 'path'
import { AddressController } from './address/address.controller'
import { AddressService } from './address/address.service'
import { ExampleController } from './example/example.controller'

const BROWSER_DIR = join(process.cwd(), 'dist/web')
applyDomino(global, join(BROWSER_DIR, 'index.html'))

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      viewsPath: BROWSER_DIR,
      bundle: require('../../dist/web-ssr/main.js'),
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI_TEST),
    MongooseModule.forFeature(mongooseModuleConfig)
  ],
  controllers: [
    ExampleController,
    AddressController
  ],
  providers: [
    AddressService
  ],
})
export class AppModule {}
