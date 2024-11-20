import React from 'react'
import { createRoot } from 'react-dom/client'
import Popup from './popup'

function init(){
  const container = document.createElement('div')
  if(!container){
    throw new Error("cannot created container");
  }
  document.body.appendChild(container)
  const root = createRoot(container)
  root.render(<Popup/>)
}

init();