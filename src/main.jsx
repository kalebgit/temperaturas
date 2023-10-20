import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.scss'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/Root/Root.jsx'
import Home from './routes/Home/Home'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: "/",
        element: <Home/>
      }
      
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
