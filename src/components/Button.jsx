import React, { Children } from 'react'

export default function Button({children,className}) {
  return (
    <button className={className}>{children}</button>
  )
}
