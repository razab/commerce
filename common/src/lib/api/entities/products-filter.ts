import { ProductsFilterType } from '../../constants/enums/products-filter-type'
import { arrayProp, prop, schema, MongooseDocument, Ref } from '../../goosetype'
import { AttributeValue } from '../interfaces/attribute-value'
import { ProductsFilter as IProductsFilter } from '../interfaces/products-filter'
import { SimpleAttributeValue } from '../interfaces/simple-attribute-value'
import { TaxonomyTerm as ITaxonomyTerm } from '../interfaces/taxonomy-term'
import { ProductsFilterDisplayWhen } from './products-filter-display-when'
import { TaxonomyTerm } from './taxonomy-term'

@schema(ProductsFilter)
export class ProductsFilter extends MongooseDocument implements IProductsFilter {
    @prop({ enum: ProductsFilterType }) public filterType: ProductsFilterType
    @prop() public enabled: boolean
    @prop() public displayAlways?: boolean
    @prop() public displayWhen?: ProductsFilterDisplayWhen
    @prop() public label?: string
    @arrayProp({ itemsRef: TaxonomyTerm }) public taxonomyTermOptions?: Ref<ITaxonomyTerm>[]
    @arrayProp({ itemsType: {} }) public attributeValueOptions?: (Ref<AttributeValue> | SimpleAttributeValue)[]
}
