import { StateRatesType } from './rates/index';
import { StateAuthType } from './auth/index';
import { StateSelectedType } from './selected/index';
import { StateConfigType } from './config/index';
import { RouterState } from 'connected-react-router'

export type AppStateType = {
  selected: StateSelectedType,
  router: RouterState,
  auth: StateAuthType,
  rates: StateRatesType
  config: StateConfigType,
}