import { UserPool } from '@aws-cdk/aws-cognito'
import { StackProps } from '@serverless-stack/resources'

export declare type SSMOutput = {
  userPoolId?: string
  userPoolClientId?: string
  identityPoolId?: string
  apiEndpoint?: string
  graphQlApiEndpoint?: string
  region?: string
  domainPrefix?: string
  apiName?: string
  apiNameIAM?: string
  apiNameJWT?: string
  redirectSignIn?: string
  redirectSignOut?: string
}
export declare type MyStackProps = StackProps & {
  userPool?: UserPool
  ssmOutput?: SSMOutput
}
