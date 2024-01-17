// ** Icons Import
import { Heart } from 'react-feather'

const Footer = () => {
  return (
    <p className="clearfix mb-0">
      <span className="float-md-start d-block d-md-inline-block mt-25">
        Copyright © {new Date().getFullYear()}{" "}
        <a
          href="https://www.southeastbank.com.bd/"
          target="_blank"
          rel="noopener noreferrer"
        >
         SEBPLC. Fingerprint Authentication Solution
        </a>
        <span className="d-none d-sm-inline-block">, All rights Reserved</span>
      </span>
      <span className="float-md-end d-none d-md-block">
        Developed by:  <a
          href="https://www.commlinkinfotech.com"
          target="_blank"
          rel="noopener noreferrer"
        >Commlink Info Tech Ltd.</a>
      </span>
    </p>
  )
}

export default Footer
