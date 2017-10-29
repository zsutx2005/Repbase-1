import { options, Options } from './constants/options'
import { options as checkOptions } from './utils/check'

class Repbase {
  
  private config: Options
  
  constructor(config: Options) {
    this.config = checkOptions<Options>(Object.assign({}, options, config))
    
  }
  
  
}

export default Repbase
