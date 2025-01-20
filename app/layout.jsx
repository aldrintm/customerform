import '@/assets/styles/globals.css'
import AuthProvider from '@/components/AuthProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const metadata = {
  title: 'MarbleSoft CRM',
  keyword:
    'quartz, granite, silestone, cambria, dekton, kitchen countertops, marble, engineered stone, corian, fabricator, countertop installer, countertop installation, quartz slabs, bath vanity, caesarstone, vadara quartz',
  description: 'Customer Database',
}

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang='en'>
        <body className='flex min-h-screen w-full flex-col'>
          <main>{children}</main>
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  )
}

export default MainLayout
