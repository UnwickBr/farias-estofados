import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { LockKeyhole, UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated } = useAuth()
  const [form, setForm] = useState({ login: '', password: '' })
  const [error, setError] = useState('')

  if (isAuthenticated) {
    return <Navigate to="/usuario" replace />
  }

  const redirectTo = location.state?.from?.pathname || '/usuario'

  const handleSubmit = (event) => {
    event.preventDefault()
    const result = login(form)

    if (!result.success) {
      setError(result.message)
      return
    }

    setError('')
    navigate(redirectTo, { replace: true })
  }

  return (
    <div className="min-h-screen pt-24 lg:pt-28 px-6 pb-20 flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_35%),linear-gradient(135deg,_#0f172a,_#111827_60%,_#1e293b)]">
      <div className="w-full max-w-md bg-white/8 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
        <p className="text-white/60 text-xs tracking-[0.3em] uppercase mb-3">Area restrita</p>
        <h1 className="font-display text-4xl text-white mb-3">Entrar</h1>
        <p className="text-white/70 text-sm leading-relaxed mb-8">
          Informe seu login e sua senha para acessar a pagina de usuario.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="login" className="text-white">
              Login
            </Label>
            <div className="relative">
              <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/45" />
              <Input
                id="login"
                value={form.login}
                onChange={(event) => setForm((current) => ({ ...current, login: event.target.value }))}
                placeholder="Digite seu login"
                className="pl-10 h-11 bg-white/10 border-white/15 text-white placeholder:text-white/45"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Senha
            </Label>
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/45" />
              <Input
                id="password"
                type="password"
                value={form.password}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                placeholder="Digite sua senha"
                className="pl-10 h-11 bg-white/10 border-white/15 text-white placeholder:text-white/45"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-300">{error}</p>}

          <Button type="submit" className="w-full h-11 rounded-full bg-blue-600 hover:bg-blue-500 text-white">
            Acessar conta
          </Button>
        </form>

        <div className="mt-8 rounded-xl bg-black/25 border border-white/10 p-4 text-sm text-white/70">
          <p className="font-medium text-white mb-1">Acesso de demonstracao</p>
          <p>Login: admin</p>
          <p>Senha: 123456</p>
        </div>
      </div>
    </div>
  )
}
