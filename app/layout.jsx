import '@/assets/styles/globals.css'

export const metadata = {
  title: 'CRM',
  keyword:
    'quartz, granite, silestone, cambria, dekton, kitchen countertops, marble, engineered stone, corian, fabricator, countertop installer, countertop installation, quartz slabs, bath vanity, caesarstone, vadara quartz',
  description: 'Customer Database',
}

const MainLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body className='flex min-h-screen w-full flex-col'>
        <main>{children}</main>
      </body>
    </html>
  )
}

export default MainLayout
