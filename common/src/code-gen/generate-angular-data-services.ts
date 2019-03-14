import { writeFileSync } from 'fs'
import { mkdirpSync } from 'fs-extra'
import { singularize } from 'inflection'
import { kebabCase, upperFirst } from 'lodash'
import { resolve } from 'path'
import * as apiEndpoints from '../lib/constants/api-endpoints'
import { endpointsBlacklist } from './endpoints-blacklist'
import { destExistsOrUserAcceptsMkdirp } from './pre-generate'

async function main(): Promise<void> {
  const baseImports = `// THIS FILE IS GENERATED. Do not edit this file.
// tslint:disable
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { DataService } from '@qb/common/modules/data/data.service'
`

  let entityImports = `\n`
  let constantsImports = `\n`
  let body = ``

  Object.keys(apiEndpoints)
    .filter((endpointName) => endpointsBlacklist.indexOf(endpointName) === -1)
    .forEach((endpointName) => {
      const entityName = upperFirst(singularize(endpointName))
      const entityNameKebab = kebabCase(singularize(endpointName))

      entityImports +=
`import { ${entityName} } from '@qb/common/domains/${entityNameKebab}/${entityNameKebab}.interface'\n`
      constantsImports +=
`import { ${endpointName} } from '@qb/common/constants/api-endpoints'\n`

      body += `
@Injectable({ providedIn: 'root' })
export class ${entityName}DataService extends DataService<${entityName}> {
  public readonly baseEndpoint = ${endpointName}
  constructor(protected readonly _httpClient: HttpClient) { super() }
}
`
    })

  const destPath = resolve(__dirname, '../generated/ui')

  if (await destExistsOrUserAcceptsMkdirp(destPath)) {
    mkdirpSync(destPath)
    writeFileSync(resolve(__dirname, '../generated/ui/data-services.generated.ts'),
      baseImports + entityImports + constantsImports + body
    )
  }
}
main()
