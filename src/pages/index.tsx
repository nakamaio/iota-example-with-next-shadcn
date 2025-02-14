import { useCurrentAccount, useCurrentWallet, useDisconnectWallet, useWallets } from '@iota/dapp-kit'
import Image from 'next/image'

import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { truncateAddress } from '~/helpers'
import { useTranslation } from '~/lib/i18n'

export default function Home() {
  const { t } = useTranslation('home')
  const wallets = useWallets()
  const account = useCurrentAccount()
  const { currentWallet, connectionStatus } = useCurrentWallet()
  const { mutate: disconnect } = useDisconnectWallet()

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-3xl text-gray-800">{t('hello')}</h1>
      {connectionStatus === 'connected' ? (
        <>
          <Card className="w-[400px] max-sm:w-[300px]">
            <CardHeader>
              <CardTitle>{t('accountDetails')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">
                <strong>{t('address')}:</strong> {account ? truncateAddress(account.address) : '-'}
              </p>
              <p className="leading-relaxed">
                <strong>{t('label')}:</strong> {account ? account.label || '-' : '-'}
              </p>
              <p className="leading-relaxed">
                <strong>{t('chains')}:</strong> {account ? account.chains.join(', ') : '-'}
              </p>
            </CardContent>
          </Card>

          <Card className="w-[400px] max-sm:w-[300px]">
            <CardHeader>
              <CardTitle>{t('walletDetails')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">
                <strong>{t('name')}:</strong> {currentWallet ? currentWallet.name : '-'}
              </p>
              <p className="leading-relaxed">
                <strong>{t('version')}:</strong> {currentWallet ? currentWallet.version : '-'}
              </p>
              <p className="leading-relaxed">
                <strong>{t('chains')}:</strong> {currentWallet ? currentWallet.chains.join(', ') : '-'}
              </p>
            </CardContent>
          </Card>

          <Card className="w-[400px] max-sm:w-[300px]">
            <CardHeader>
              <CardTitle>{t('installedWallets')}</CardTitle>
            </CardHeader>
            <CardContent>
              {wallets.length === 0 ? (
                <p className="leading-relaxed">{t('noWalletsInstalled')}</p>
              ) : (
                <ul className="list-none p-0 m-0">
                  {wallets.map((wallet) => (
                    <li key={wallet.name} className="flex items-center gap-3 mb-2">
                      <Image src={wallet.icon} alt={`${wallet.name} Icon`} width={24} height={24} />
                      {wallet.name}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Button
            onClick={() => disconnect()}
            className="w-[400px] max-sm:w-[300px] mt-4 py-3 px-6 text-base text-white rounded-lg shadow-md"
          >
            {t('disconnect')}
          </Button>
        </>
      ) : (
        <p className="text-lg text-gray-600">{t('connectMessage')}</p>
      )}
    </div>
  )
}
