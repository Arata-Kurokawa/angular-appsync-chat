import { Injectable } from '@angular/core'
import { Observable } from 'zen-observable-ts'
import { API, graphqlOperation } from 'aws-amplify'

@Injectable({
  providedIn: "root"
})
export class APIServer {
  async query(statement: string, _arguments: { [key: string] : any } = {}): Promise<any> {
    const response = (await API.graphql(graphqlOperation(statement, _arguments))) as any
    return response
  }

  async mutation(statement: string, _arguments: { [key: string] : any } = {}): Promise<any> {
    const response = (await API.graphql(graphqlOperation(statement, _arguments))) as any
    return response
  }

  subscription(statement: string, _arguments: { [key: string] : any } = {}): Observable<any> {
    return (API.graphql(graphqlOperation(statement, _arguments)) as Observable<any>)
  }
}
