import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Preencha todos os campos.");
      return;
    }
    setSending(true);
    // Simulate sending
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Mensagem enviada com sucesso!");
    setForm({ name: "", email: "", message: "" });
    setSending(false);
  };

  const info = [
    { icon: Mail, label: "Email", value: "contato@maison.com.br" },
    { icon: Phone, label: "Telefone", value: "(11) 99999-0000" },
    { icon: MapPin, label: "Endereço", value: "São Paulo, SP" },
  ];

  return (
    <div className="pt-24 lg:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">
            Contato
          </p>
          <h1 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-4">
            Fale Conosco
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Estamos à disposição para ajudá-lo a encontrar a peça perfeita para o seu espaço.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12 lg:gap-20">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-3 space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-medium tracking-wide">
                  Nome
                </Label>
                <Input
                  id="name"
                  placeholder="Seu nome"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="rounded-lg bg-secondary border-0 h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-medium tracking-wide">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="rounded-lg bg-secondary border-0 h-11"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-xs font-medium tracking-wide">
                Mensagem
              </Label>
              <Textarea
                id="message"
                placeholder="Como podemos ajudar?"
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="rounded-lg bg-secondary border-0 resize-none"
              />
            </div>
            <Button
              type="submit"
              disabled={sending}
              className="rounded-full px-8 gap-2 h-11"
            >
              {sending ? "Enviando..." : "Enviar Mensagem"}
              <Send className="h-4 w-4" />
            </Button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 space-y-8"
          >
            {info.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground tracking-wide mb-1">{label}</p>
                  <p className="text-sm font-medium text-foreground">{value}</p>
                </div>
              </div>
            ))}

            <div className="pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground tracking-wide mb-2">Horário</p>
              <p className="text-sm text-foreground">Seg - Sex: 9h às 18h</p>
              <p className="text-sm text-foreground">Sáb: 10h às 14h</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}