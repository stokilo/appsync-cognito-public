import * as sst from '@serverless-stack/resources'
import { AuthorizationType, MappingTemplate } from '@aws-cdk/aws-appsync'
import { RemovalPolicy } from '@aws-cdk/core'
import { MyStackProps } from './MyStackProps'

export default class AppSyncStack extends sst.Stack {
  constructor (scope: sst.App, id: string, props: MyStackProps) {
    super(scope, id, props)

    const notesTable = new sst.Table(this, 'Notes', {
      fields: {
        id: sst.TableFieldType.STRING
      },
      primaryIndex: { partitionKey: 'id' },
      dynamodbTable: {
        removalPolicy: RemovalPolicy.DESTROY,
        contributorInsightsEnabled: false
      }
    })

    const api = new sst.AppSyncApi(this, 'AppSyncApi', {
      graphqlApi: {
        schema: 'graphql/schema.graphql',
        authorizationConfig: {
          defaultAuthorization: {
            authorizationType: AuthorizationType.USER_POOL,
            userPoolConfig: {
              userPool: props.userPool!
            }
          }
        }
      },
      defaultFunctionProps: {
        environment: {
          NOTES_TABLE: notesTable.dynamodbTable.tableName
        }
      },
      dataSources: {
        notes: 'src/main.handler',
        tableDs: {
          table: notesTable
        }
      },
      resolvers: {
        // 'Query    listNotes': 'notes',
        'Query listNotes': {
          dataSource: 'tableDs',
          resolverProps: {
            requestMappingTemplate: MappingTemplate.fromString(`
              {
                  "version": "2017-02-28",
                  "operation": "Scan"
              }
            `),
            responseMappingTemplate: MappingTemplate.dynamoDbResultList()
          }
        },

        'Query    getNoteById': 'notes',
        'Mutation createNote': 'notes',
        'Mutation updateNote': 'notes',
        'Mutation deleteNote': 'notes',
        'Subscription onCreateNote': 'notes'
      }
    })

    // Enable the AppSync API to access the DynamoDB table
    api.attachPermissions([notesTable])
    props.ssmOutput!.graphQlApiEndpoint = api.graphqlApi.graphqlUrl
  }
}
