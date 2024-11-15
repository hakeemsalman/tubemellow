import React from 'react';
import {createRoot} from 'react-dom/client'
import "../assets/popup.css";

const test = (
  <div>
    <h1>Hello World</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit iure animi culpa odio beatae est inventore, ratione impedit molestiae eligendi quam, optio voluptatem quo nihil rem qui, id earum alias?</p>
  </div>
)

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(test)