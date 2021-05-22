export * from './Base.paginate'
export * from '../args/Base.args'
export * from './Question.paginate'
export interface ModelPaginate {
    paginate(args:any):any
  }