import { ObjectId } from 'mongodb'
import { Column, Entity, JoinColumn, ManyToOne, ObjectIdColumn } from 'typeorm'
import { Attribute } from '../attribute/attribute'
import { AttributeValue as IAttributeValue } from './attribute-value.interface'

@Entity()
export class AttributeValue implements IAttributeValue {
  @ObjectIdColumn() public id: ObjectId

  @ManyToOne(() => Attribute, attribute => attribute.id)
  @JoinColumn()
  public attribute: Attribute

  @Column() public slug: string
  @Column() public value: any
  @Column() public name?: string
  @Column() public description?: string
}
