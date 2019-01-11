import { Column, Entity, JoinColumn, ObjectIdColumn, ObjectID, OneToMany } from 'typeorm'
import { Discount as IDiscount, DiscountExceptions as IDiscountExceptions } from '../interfaces/discount'
import { Price } from './price'
import { Product } from './product'
import { TaxonomyTerm } from './taxonomy-term'

export class DiscountExceptions implements IDiscountExceptions {
  @OneToMany(() => Product, product => product.id)
  @JoinColumn()
  public products: Product[]

  @OneToMany(() => TaxonomyTerm, taxonomyTerm => taxonomyTerm.id)
  @JoinColumn()
  public taxonomyTerms: TaxonomyTerm[]
}

@Entity()
export class Discount implements IDiscount {
  @ObjectIdColumn() public id: ObjectID
  @Column() public code: string
  @Column(() => Price) public total: Price
  @Column() public percentage: number // `20` for a 20% discount
  @Column() public freeShipping: boolean
  @Column(() => DiscountExceptions) public includes?: DiscountExceptions
  @Column(() => DiscountExceptions) public excludes?: DiscountExceptions
}
