import { Navigate } from 'react-router-dom'
import { UserRound, Mail, ShieldCheck, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/AuthContext'

export default function User() {
  const { isAuthenticated, user, logout } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen pt-24 lg:pt-28 px-6 pb-20 bg-slate-100">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-white">
          <div className="bg-[linear-gradient(135deg,_#0f172a,_#1d4ed8)] px-8 py-10 text-white">
            <p className="text-xs tracking-[0.3em] uppercase text-white/60 mb-3">Conta</p>
            <h1 className="font-display text-4xl mb-3">Pagina do usuario</h1>
            <p className="text-white/80 max-w-2xl">
              Voce entrou com login e senha e agora pode acessar esta area protegida da conta.
            </p>
          </div>

          <div className="p-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <UserRound className="h-8 w-8 text-blue-600 mb-4" />
              <p className="text-sm text-slate-500 mb-1">Nome</p>
              <p className="text-lg font-semibold text-slate-900">{user?.name}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <Mail className="h-8 w-8 text-blue-600 mb-4" />
              <p className="text-sm text-slate-500 mb-1">Email</p>
              <p className="text-lg font-semibold text-slate-900 break-all">{user?.email}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <ShieldCheck className="h-8 w-8 text-blue-600 mb-4" />
              <p className="text-sm text-slate-500 mb-1">Perfil</p>
              <p className="text-lg font-semibold text-slate-900">Usuario autenticado</p>
            </div>
          </div>

          <div className="px-8 pb-8">
            <Button onClick={logout} className="rounded-full bg-slate-900 hover:bg-slate-800 text-white gap-2">
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
