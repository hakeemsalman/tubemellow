import React from 'react';
import {createRoot} from 'react-dom/client'
import "../assets/popup.css";

const test = (
  <div className="p-3 flex flex-col gap-3">
    <h1 className="text-2xl text-white">Hello World</h1>
    <p className="text-sm text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit iure animi culpa odio beatae est inventore, ratione impedit molestiae eligendi quam, optio voluptatem quo nihil rem qui, id earum alias?</p>
  </div>
)

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(test)