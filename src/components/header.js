import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import ModalSeach from "../components/modalSearch";

const Header = ({ siteTitle }) => (
  <header>
    <div className="ast-container ast-container-header">
      <div className="flex-row">
        <div className="flex-column-6">
          <h1><Link to="/">Sample Site</Link></h1>
        </div>
        <div className="flex-column-6 header-link__search">
          <ModalSeach />
        </div>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
