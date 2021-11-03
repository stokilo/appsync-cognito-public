/* eslint-disable @typescript-eslint/no-unused-vars */
import * as sst from '@serverless-stack/resources'
import ApiAndAuthStack from './ApiAndAuthStack'
import AppSyncStack from './AppSyncStack'
import { MyStackProps } from './MyStackProps'
import ParameterStack from './ParameterStack'

export default function main (app: sst.App): void {
  app.setDefaultFunctionProps({
    runtime: 'nodejs14.x'
  })

  const myStackProps: MyStackProps = {
    ssmOutput: {}
  }
  const api = new ApiAndAuthStack(app, 'ApiAndAuthStack', myStackProps)
  const sync = new AppSyncStack(app, 'AppSyncStack', myStackProps)
  const parameters = new ParameterStack(app, 'ParameterStack', myStackProps)
}
