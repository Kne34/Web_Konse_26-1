import './App.css'
import { RouterProvider } from 'react-router';
import ro from './Root/router';

function App() {
  return (
    <div className='fullscreen'>
      <RouterProvider router={ro}/>
    </div>
  )
}

export default App
