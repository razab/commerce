import { HttpException, Inject, Injectable } from '@nestjs/common'
import { ErrorMessages } from '@qb/common/constants/copy'
import { HttpStatus } from '@qb/common/constants/http-status'
import { ListRequest } from '@qb/common/domains/data-access/requests/list.request'
import { Organization } from '@qb/common/domains/organization/organization'
import { OrganizationRepository } from './organization.repository'

@Injectable()
export class OrganizationService {
  public organization: Organization

  constructor(
    @Inject(OrganizationRepository) private _repository: OrganizationRepository,
  ) {
    this._repository.registerPostInsertHook(this._postWriteHook.bind(this))
    this._repository.registerPostUpdateHook(this._postWriteHook.bind(this))
  }

  public async getOrganization(): Promise<Organization> {
    const organizations = await this._repository.list(new ListRequest({
      query: {}
    }))

    if (!organizations || !organizations.length) {
      throw new HttpException(
        ErrorMessages.FIND_ORGANIZATION_ERROR,
        HttpStatus.CLIENT_ERROR_NOT_FOUND,
      )
    }

    this.organization = organizations[0]
    return this.organization
  }

  private async _postWriteHook(organization: Organization): Promise<void> {
    this.organization = organization
  }

  /*
  RAW (possibly more up to date):

  {"_id":"5a8517f707da82fdd9568302","updatedAt":"2018-02-15T05:17:43.981Z","createdAt":"2018-02-15T05:17:43.981Z","name":"Hyzer Shop","retailSettings":{"salesTaxPercentage":6,"addSalesTax":false,"shippingFlatRate":{"amount":5,"currency":"USD"},"_id":"5a8517f707da82fdd9568306"},"branding":{"logo":"https://d1eqpdomqeekcv.cloudfront.net/branding/hyzershop-wordmark-250.png","colors":{"primary":"#00b0ff","_id":"5a8517f707da82fdd9568305"},"cartName":"basket","displayName":"Hyzer Shop","_id":"5a8517f707da82fdd9568304"},"storeUrl":"http://localhost:3000/shop","storeUiContent":{"_id":"5a8517f707da82fdd9568303","primaryNavigation":["5a85163ea5697de9dc39d4ae","5a85163ea5697de9dc39d4af","5a85163ea5697de9dc39d4b0","5a85163ea5697de9dc39d4b1","5a85163ea5697de9dc39d4b2","5a85163ea5697de9dc39d4b3","5a85163ea5697de9dc39d4b4"],"customRegions":{"productDetailInfoHeader":[{"isMetaRegion":true,"isActive":true,"className":"ff-display product-detail-info--disc-specs-label text-uppercase font-weight-bold","template":"<span class=\"product-detail-info--disc-specs-label--disc-type\">{{ discType }}</span><span class=\"product-detail-info--disc-specs-label--mid-dot\">•</span><span class=\"product-detail-info--disc-specs-label--stability\">{{ stability }}</span>","childRegions":[{"apiModel":"Product","dataArrayProperty":"taxonomyTerms","pathToDataArrayPropertyLookupKey":"taxonomy.slug","dataArrayPropertyLookupValue":"disc-type","pathToDataPropertyValue":"singularName","key":"discType"},{"apiModel":"Product","dataArrayProperty":"taxonomyTerms","pathToDataArrayPropertyLookupKey":"taxonomy.slug","dataArrayPropertyLookupValue":"stability","pathToDataPropertyValue":"singularName","key":"stability"}]},{"apiModel":"Product","className":"product-detail-info--flight-stat--speed","dataArrayProperty":"simpleAttributeValues","dataArrayPropertyLookupValue":"speed","pathToDataArrayPropertyLookupKey":"attribute.slug","pathToDataPropertyValue":"value","template":"<span class=\"flight-stats-bubble flight-stats-bubble--speed\"><span class=\"flight-stats-bubble--label\">Speed</span><span class=\"flight-stats-bubble--value\">{}</span></span>","isActive":true},{"apiModel":"Product","className":"product-detail-info--flight-stat--glide","dataArrayProperty":"simpleAttributeValues","dataArrayPropertyLookupValue":"glide","pathToDataArrayPropertyLookupKey":"attribute.slug","pathToDataPropertyValue":"value","template":"<span class=\"flight-stats-bubble flight-stats-bubble--glide\"><span class=\"flight-stats-bubble--label\">Glide</span><span class=\"flight-stats-bubble--value\">{}</span></span>","isActive":true},{"apiModel":"Product","className":"product-detail-info--flight-stat--turn","dataArrayProperty":"simpleAttributeValues","dataArrayPropertyLookupValue":"turn","pathToDataArrayPropertyLookupKey":"attribute.slug","pathToDataPropertyValue":"value","template":"<span class=\"flight-stats-bubble flight-stats-bubble--turn\"><span class=\"flight-stats-bubble--label\">Turn</span><span class=\"flight-stats-bubble--value\">{}</span></span>","isActive":true},{"apiModel":"Product","className":"product-detail-info--flight-stat--fade","dataArrayProperty":"simpleAttributeValues","dataArrayPropertyLookupValue":"fade","pathToDataArrayPropertyLookupKey":"attribute.slug","pathToDataPropertyValue":"value","template":"<span class=\"flight-stats-bubble flight-stats-bubble--fade\"><span class=\"flight-stats-bubble--label\">Fade</span><span class=\"flight-stats-bubble--value\">{}</span></span>","isActive":true}],"productDetailMid":[{"isMetaRegion":true,"isActive":false,"className":"product-detail-mid--specs","template":"<h2>Specs</h2>{{ stability }}{{ discType }}","childRegions":[{"apiModel":"Product","className":"product-detail-mid--specs--stability","dataArrayProperty":"attributeValues","pathToDataArrayPropertyLookupKey":"attribute.slug","dataArrayPropertyLookupValue":"stability","pathToDataPropertyValue":"singularName","template":"<dt class=\"ff-display-2\">Stability</dt><dd>{}</dd>","key":"stability"},{"apiModel":"Product","className":"product-detail-mid--specs--disc-type","dataArrayProperty":"taxonomyTerms","pathToDataArrayPropertyLookupKey":"taxonomy.slug","dataArrayPropertyLookupValue":"disc-type","pathToDataPropertyValue":"singularName","template":"<dt class=\"ff-display-2\">Type</dt><dd>{}</dd>","key":"discType"}]}]}},"storeUiSettings":{"orderOfVariableAttributeSelects":["plastic","color"],"combinedVariableAttributeSelects":[["color","netWeight"]],"productListFilterUis":[{"filterType":"price-range","enabled":true,"displayAlways":true}]},"globalStyles":{"backgroundPatternImageSrc":"https://d1eqpdomqeekcv.cloudfront.net/branding/bg-texture.gif","shoppingCartIcons":{"1":"https://d1eqpdomqeekcv.cloudfront.net/branding/basket-white-1.png","2":"https://d1eqpdomqeekcv.cloudfront.net/branding/basket-white-2.png","3":"https://d1eqpdomqeekcv.cloudfront.net/branding/basket-white-3.png","empty":"https://d1eqpdomqeekcv.cloudfront.net/branding/basket-white-empty.png","full":"https://d1eqpdomqeekcv.cloudfront.net/branding/basket-white-4.png"}},"__v":0}
  */
}
