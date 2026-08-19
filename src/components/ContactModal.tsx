import React, { useState } from 'react';
import { X, MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (message: string, type?: 'success' | 'info') => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [formSent, setFormSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    onShowToast('Zpráva byla úspěšně odeslána!', 'success');
    setTimeout(() => {
      setFormSent(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-[#1056b8]">ELEKTRO MARKET</span>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-bold text-slate-700">Kontakty a kamenné prodejny</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left: Contact Info & Branches */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-2">Jsme tu pro vás</h3>
                <p className="text-xs text-slate-500">
                  Potřebujete poradit s výběrem elektroniky, stavem objednávky nebo reklamací? Rádi vám pomůžeme.
                </p>
              </div>

              {/* Direct contacts */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/70 border border-blue-100">
                  <div className="w-8 h-8 rounded-lg bg-[#1056b8] text-white flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-500">Bezplatná zákaznická linka</div>
                    <div className="text-sm font-black text-slate-900">+420 800 123 456</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/70 border border-blue-100">
                  <div className="w-8 h-8 rounded-lg bg-[#1056b8] text-white flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-500">E-mailová podpora</div>
                    <div className="text-sm font-black text-slate-900">podpora@elektromarket.cz</div>
                  </div>
                </div>
              </div>

              {/* Stores */}
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                  Kamenné prodejny a výdejní místa
                </h4>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <MapPin className="w-4 h-4 text-[#1056b8]" />
                    <span>Showroom Praha – Václavské náměstí</span>
                  </div>
                  <p className="text-slate-600 pl-6">Vodičkova 791/41, 110 00 Praha 1</p>
                  <div className="flex items-center gap-1.5 text-slate-500 pl-6 text-[11px]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Po–Pá: 8:00–20:00 | So–Ne: 9:00–18:00</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <MapPin className="w-4 h-4 text-[#1056b8]" />
                    <span>Showroom Brno – Vaňkovka</span>
                  </div>
                  <p className="text-slate-600 pl-6">Ve Vaňkovce 1, 602 00 Brno</p>
                  <div className="flex items-center gap-1.5 text-slate-500 pl-6 text-[11px]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Po–Pá: 9:00–20:00 | So–Ne: 9:00–19:00</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right: Contact Form */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="text-base font-black text-slate-900 mb-1">Napište nám zprávu</h3>
              <p className="text-xs text-slate-500 mb-4">Odpovídáme obvykle do 2 hodin.</p>

              {formSent ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Zpráva odeslána</h4>
                  <p className="text-xs text-slate-500">Děkujeme za dotaz, brzy se vám ozveme.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Vaše jméno *</label>
                    <input
                      type="text"
                      required
                      placeholder="např. Petr Svoboda"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#1056b8] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Váš e-mail *</label>
                    <input
                      type="email"
                      required
                      placeholder="petr@domena.cz"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#1056b8] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Zpráva nebo dotaz *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="S čím vám můžeme pomoci?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#1056b8] focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#1056b8] hover:bg-[#0d4899] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition"
                  >
                    <Send className="w-4 h-4" />
                    <span>Odeslat zprávu</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
