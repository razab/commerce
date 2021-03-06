import { DomainEventVerb } from '@qb/common/constants/enums/domain-event-verb'
import { HttpVerb } from '@qb/common/modules/http/http.models'
import { ObjectId } from 'mongodb'
import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from 'typeorm'
import { Diff } from '../diff/diff'
import { DomainEvent as IDomainEvent } from './domain-event.interface'

@Entity()
export class DomainEvent implements IDomainEvent {
    @ObjectIdColumn() public id: ObjectId
    @Column({ enum: DomainEventVerb }) public verb: DomainEventVerb
    @Column({ enum: HttpVerb }) public httpVerb?: HttpVerb
    @Column() public httpRequest?: any
    @Column() public httpResponse?: any
    @Column(() => Diff) public diff: Diff
    @CreateDateColumn({ type: 'timestamp' }) public createdAt?: Date
    @UpdateDateColumn({ type: 'timestamp' }) public updatedAt?: Date
}
