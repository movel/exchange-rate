import * as React from 'react'
import { Link } from 'react-router-dom';
import { SVGHome } from './SVGHome'
import './PageNotFound.sass'

const PageNotFound = () => {
  return (
    <div className="page__404">
      <h1 className="page__404-title">404</h1>
      <h2>Sorry!</h2>
      <p className="page__404-text">The page you are looking for does not exist or another error occured</p>
      <div className="page__404-link">
        <Link to="/">
          <div className="page__404-link__part1"><SVGHome /></div>&nbsp;<div className="page__404-link__part2">GO BACK HOME</div>
        </Link> 
      </div>
    </div>
  )
  
};

export default PageNotFound