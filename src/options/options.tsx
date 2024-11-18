import React from 'react';
import {createRoot} from 'react-dom/client'
import "../assets/popup.css";

const options = (
  <div className="p-3 flex flex-col gap-3">
    <h1 className="text-2xl text-white">Options</h1>
  </div>
)

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(options)