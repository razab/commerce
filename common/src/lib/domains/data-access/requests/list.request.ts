import { Crud } from '@qb/common/constants/crud'
import { ObjectID } from 'typeorm'
import { ListRequest as IListRequest } from './list.request.interface'

export class ListRequest<EntityType> implements IListRequest<EntityType> {
  public skip ?= 0
  public limit ?= Crud.Pagination.productsPerPage
  public sortBy ?= Crud.Sorting.defaultSortField as keyof EntityType
  public sortDirection ?= Crud.Sorting.defaultSortDirection
  public query?: object = {}
  public ids?: (string | ObjectID)[]
  public search?: string
  public searchFields?: string[]

  constructor(request?: ListRequest<EntityType>) {
    if (request) {
      if (typeof request.skip !== 'undefined') this.skip = request.skip
      if (typeof request.limit !== 'undefined') this.limit = request.limit
      if (typeof request.sortBy !== 'undefined') this.sortBy = request.sortBy
      if (typeof request.sortDirection !== 'undefined') this.sortDirection = request.sortDirection
      if (typeof request.query !== 'undefined') this.query = request.query
      if (typeof request.ids !== 'undefined') this.ids = request.ids
      if (typeof request.search !== 'undefined') this.search = request.search
      if (typeof request.searchFields !== 'undefined') this.searchFields = request.searchFields
    }
  }
}