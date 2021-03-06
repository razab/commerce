import { ObjectId } from 'mongodb'
import { Column, CreateDateColumn, Entity, JoinColumn, ObjectIdColumn, OneToMany,
    UpdateDateColumn } from 'typeorm'
import { OrganizationType } from '../../constants/enums/organization-type'
import { GlobalStyles } from '../global-styles/global-styles'
import { OrganizationBranding } from '../organization-branding/organization-branding'
import { OrganizationRetailSettings } from '../organization-retail-settings/organization-retail-settings'
import { StoreUiSettings } from '../store-ui-settings/store-ui-settings'
import { Taxonomy } from '../taxonomy/taxonomy'
import { UiContent } from '../ui-content/ui-content'
import { Organization as IOrganization } from './organization.interface'

@Entity()
export class Organization implements IOrganization {
    @ObjectIdColumn() public id: ObjectId
    @Column() public name: string
    @Column(() => OrganizationRetailSettings) public retailSettings: OrganizationRetailSettings
    @Column(() => OrganizationBranding) public branding: OrganizationBranding
    @Column() public storeUrl: string
    @Column(() => UiContent) public storeUiContent: UiContent
    @Column({ enum: OrganizationType }) public type?: OrganizationType
    @Column() public dbaNames?: string[]
    @Column(() => UiContent) public blogUiContent?: UiContent
    @Column(() => StoreUiSettings) public storeUiSettings?: StoreUiSettings

    @OneToMany(() => Taxonomy, taxonomy => taxonomy.id)
    @JoinColumn()
    public searchableTaxonomies?: Taxonomy[]

    @Column(() => GlobalStyles) public globalStyles?: GlobalStyles
    @Column() public defaultsHaveBeenSet?: boolean
    @CreateDateColumn({ type: 'timestamp' }) public createdAt?: Date
    @UpdateDateColumn({ type: 'timestamp' }) public updatedAt?: Date
}
