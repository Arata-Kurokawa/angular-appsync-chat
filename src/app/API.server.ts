import { Injectable }        from '@angular/core'
import { Observable }        from 'zen-observable-ts'
import { API }               from 'aws-amplify'
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql/src/types/index'

@Injectable({
  providedIn: "root"
})
export class APIServer {
  async query(
    statement: string,
    _arguments: { [key: string] : any } = {},
    authMode: keyof typeof GRAPHQL_AUTH_MODE | undefined = undefined,
    authToken: string | undefined = undefined
  ): Promise<any> {
    const mode = authMode ?? 'AWS_LAMBDA'
    const token = authToken ?? 'Authorized'

    const response = (await API.graphql({ query: statement, variables: _arguments, authMode: mode, authToken: token})) as any
    return response
  }

  async mutation(
    statement: string,
    _arguments: { [key: string] : any } = {},
    authMode: keyof typeof GRAPHQL_AUTH_MODE | undefined = undefined,
    authToken: string | undefined = undefined
  ): Promise<any> {
    const mode = authMode ?? 'AWS_LAMBDA'
    const token = authToken ?? 'Authorized'

    const response = (await API.graphql({ query: statement, variables: _arguments, authMode: mode, authToken: token})) as any
    return response
  }

  subscription(
    statement: string,
    _arguments: { [key: string] : any } = {},
    authMode: keyof typeof GRAPHQL_AUTH_MODE | undefined = undefined,
    authToken: string | undefined = undefined
  ): Observable<any> {
    const mode = authMode ?? 'AWS_LAMBDA'
    const token = authToken ?? 'Authorized'

    return (API.graphql({ query: statement, variables: _arguments, authMode: mode, authToken: token}) as Observable<any>)
  }
}
