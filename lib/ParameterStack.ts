/* eslint-disable @typescript-eslint/no-unused-vars */
import * as sst from '@serverless-stack/resources'
import * as SSM from '@aws-cdk/aws-ssm'
import { MyStackProps } from './MyStackProps'

export default class ParameterStack extends sst.Stack {
  constructor (scope: sst.App, id: string, props: MyStackProps) {
    super(scope, id, props)

    const ssmParam = new SSM.StringParameter(this, 'AccountLevelStacksConfiguration', {
      parameterName: '/account/stacks-config',
      description: 'Stacks config account level wide.',
      stringValue: JSON.stringify(props.ssmOutput)
    })

    this.addOutputs(props.ssmOutput!)
  }
}
