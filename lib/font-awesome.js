import { faBars } from '@fortawesome/free-solid-svg-icons'
import {
  faFacebook,
  faTwitter,
  faGoogle
} from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

export default () => {
  library.add(faBars, faFacebook, faTwitter, faGoogle)
}
