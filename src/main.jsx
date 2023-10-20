import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.scss'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/Root/Root.jsx'
import Home from './routes/Home/Home'
import Simulation from './routes/Simulation/Simulation'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/simulation", 
        element: <Simulation/>
      }
      
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
