import React from 'react'

type Props = {
  name: string,
  imgUrl: string,
}

const User = ({ name, imgUrl }: Props) => {
  return (
    <React.Fragment>
      <p>Привет, {name}!</p>
      <img src={imgUrl} alt="img_profile" />
    </React.Fragment>
  )
}

export { User }