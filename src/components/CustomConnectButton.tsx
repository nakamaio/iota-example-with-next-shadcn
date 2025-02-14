import { useState } from 'react'
import {
  ConnectModal,
  useAccounts,
  useCurrentAccount,
  useCurrentWallet,
  useDisconnectWallet,
  useSwitchAccount,
} from '@iota/dapp-kit'

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { truncateAddress } from '~/helpers'
import CopyIcon from './icons/CopyIcon'

import { Button } from '@/components/ui/button'

const CustomConnectButton = () => {
  const [showModal, setShowModal] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const { isConnected } = useCurrentWallet()
  const { mutate: disconnect } = useDisconnectWallet()
  const account = useCurrentAccount()
  const accounts = useAccounts()
  const { mutate: switchAccount } = useSwitchAccount()

  const handleCopy = () => {
    navigator.clipboard.writeText(account?.address || '')
  }

  const handleConnectModalOpenChange = (open: boolean) => {
    setShowModal(open)
  }

  const handleDisconnect = () => {
    disconnect()
    setShowWalletModal(false)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSwitchAccount = (account: any) => {
    switchAccount(
      { account },
      {
        onSuccess: () => {
          setShowWalletModal(false)
        },
      }
    )
  }

  return (
    <>
      <ConnectModal
        open={showModal && !isConnected}
        onOpenChange={handleConnectModalOpenChange}
        trigger={
          <Button
            variant={isConnected ? 'outline' : 'default'}
            className="px-6"
            onClick={!isConnected ? undefined : () => setShowWalletModal(true)}
          >
            {isConnected ? truncateAddress(account?.address) : 'Connect Wallet'}
          </Button>
        }
      />
      <Dialog open={showWalletModal} onOpenChange={setShowWalletModal}>
        <DialogContent>
          <DialogClose className="absolute right-4 top-4" />
          <DialogHeader>
            <DialogTitle className="text-center">Connected</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-8 p-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">{truncateAddress(account?.address)}</span>
              <Button variant="ghost" size="icon" onClick={handleCopy}>
                <CopyIcon />
              </Button>
            </div>

            {accounts.length > 1 && (
              <div className="w-full">
                <h3 className="mb-2 text-sm font-medium">Switch Account</h3>
                <ul className="flex flex-col gap-2">
                  {accounts.map((acc) => (
                    <li key={acc.address}>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleSwitchAccount(acc)}
                        disabled={acc.address === account?.address}
                      >
                        {truncateAddress(acc.address)}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button className="w-full" onClick={handleDisconnect}>
              Disconnect
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CustomConnectButton
