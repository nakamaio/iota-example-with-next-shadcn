import CustomConnectButton from '../CustomConnectButton'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="flex justify-between items-center w-full bg-white h-16 px-6 mb-8 box-border font-inter max-[420px]:flex-col max-[420px]:h-auto max-[420px]:py-4">
        <span className="font-bold font-inter">IOTA Move Example dApp</span>
        <CustomConnectButton />
      </header>

      <main className="flex w-full p-6 justify-center items-center font-inter">{children}</main>
    </>
  )
}

export default Layout
