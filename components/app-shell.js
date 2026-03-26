'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { WalletStatus } from '@/components/wallet-status'

const navItems = [
  { href: '/', label: 'Desk' },
  { href: '/workbench', label: 'Workbench' },
  { href: '/archive', label: 'Archive' },
  { href: '/proof', label: 'Proof' },
]

export function AppShell({ children }) {
  const pathname = usePathname()

  return (
    <div className="app-shell">
      <div className="app-frame">
        <header className="topbar">
          <div className="brand">
            <div className="brand-mark">BT</div>
            <div className="brand-copy">
              <strong>BlockTodo</strong>
              <p>Onchain task keeping on Base</p>
            </div>
          </div>
          <WalletStatus />
        </header>
        <main>{children}</main>
      </div>
      <nav className="bottom-nav" aria-label="Primary">
        {navItems.map((item) => {
          const active = pathname === item.href
          return (
            <Link key={item.href} className={`nav-link${active ? ' active' : ''}`} href={item.href}>
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
