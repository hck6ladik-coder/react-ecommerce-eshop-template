import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Check, 
  Truck, 
  CreditCard, 
  UserCheck, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight, 
  Printer,
  ShoppingBag,
  Smartphone,
  Package,
  Store,
  Mailbox,
  Banknote,
  Building2
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SHIPPING_OPTIONS, PAYMENT_OPTIONS } from '../data/products';
import { CustomerDetails, ShippingOption, PaymentOption, Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    items,
    isCheckoutOpen,
    setIsCheckoutOpen,
    subtotal,
    discountAmount,
    shippingPrice,
    paymentPrice,
    total,
    shippingOption,
    setShippingOption,
    paymentOption,
    setPaymentOption,
    formatPrice,
    createOrder,
  } = useCart();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [formData, setFormData] = useState<CustomerDetails>({
    firstName: 'Jan',
    lastName: 'Novák',
    email: 'jan.novak@email.cz',
    phone: '+420 777 123 456',
    street: 'Vodičkova 791/41',
    city: 'Praha 1',
    zip: '11000',
    note: '',
    isCompany: false,
    companyName: '',
    ico: '',
    dic: '',
  });

  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFinishOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const order = createOrder(formData);
    setCreatedOrder(order);
    setStep(4);

    // Fire celebratory confetti!
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Truck': return <Truck className="w-5 h-5" />;
      case 'Package': return <Package className="w-5 h-5" />;
      case 'Mailbox': return <Mailbox className="w-5 h-5" />;
      case 'Store': return <Store className="w-5 h-5" />;
      case 'CreditCard': return <CreditCard className="w-5 h-5" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5" />;
      case 'Building2': return <Building2 className="w-5 h-5" />;
      case 'Banknote': return <Banknote className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-[#1056b8]">ELEKTRO MARKET</span>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-bold text-slate-700">Bezpečná objednávka</span>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step Navigation Progress */}
        {step < 4 && (
          <div className="bg-white border-b border-slate-100 px-6 py-3">
            <div className="flex items-center justify-between max-w-xl mx-auto text-xs font-bold">
              
              {/* Step 1 */}
              <div 
                onClick={() => setStep(1)}
                className={`flex items-center gap-2 cursor-pointer ${step >= 1 ? 'text-[#1056b8]' : 'text-slate-400'}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-[#1056b8] text-white' : 'bg-slate-100 text-slate-500'}`}>
                  1
                </div>
                <span className="hidden sm:inline">Košík</span>
              </div>

              <div className={`flex-1 h-0.5 mx-3 ${step >= 2 ? 'bg-[#1056b8]' : 'bg-slate-200'}`} />

              {/* Step 2 */}
              <div 
                onClick={() => items.length > 0 && setStep(2)}
                className={`flex items-center gap-2 cursor-pointer ${step >= 2 ? 'text-[#1056b8]' : 'text-slate-400'}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-[#1056b8] text-white' : 'bg-slate-100 text-slate-500'}`}>
                  2
                </div>
                <span className="hidden sm:inline">Doprava & Platba</span>
              </div>

              <div className={`flex-1 h-0.5 mx-3 ${step >= 3 ? 'bg-[#1056b8]' : 'bg-slate-200'}`} />

              {/* Step 3 */}
              <div 
                onClick={() => items.length > 0 && setStep(3)}
                className={`flex items-center gap-2 cursor-pointer ${step >= 3 ? 'text-[#1056b8]' : 'text-slate-400'}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-[#1056b8] text-white' : 'bg-slate-100 text-slate-500'}`}>
                  3
                </div>
                <span className="hidden sm:inline">Dodací údaje</span>
              </div>

            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          
          {/* STEP 1: REVIEW ITEMS */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-900 mb-1">1. Kontrola položek v košíku</h3>
                <p className="text-xs text-slate-500">Zkontrolujte si vybrané položky a jejich množství.</p>
              </div>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                {items.map((item) => (
                  <div key={item.product.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={item.product.image} alt="" className="w-12 h-12 object-contain bg-white rounded-lg border p-1" />
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{item.product.name}</h4>
                        <p className="text-xs text-slate-500">{item.product.subtitle} · {item.quantity} ks</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-slate-900">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price summary */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Mezisoučet:</span>
                  <span className="font-bold text-slate-800">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Sleva:</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-blue-200">
                  <span>Celkem za zboží:</span>
                  <span className="text-[#1056b8]">{formatPrice(Math.max(0, subtotal - discountAmount))}</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Zpět do e-shopu
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-[#1056b8] hover:bg-[#0d4899] text-white text-xs font-bold flex items-center gap-2 shadow-sm"
                >
                  <span>Doprava a platba</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SHIPPING & PAYMENT */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Shipping section */}
              <div>
                <h3 className="text-base font-black text-slate-900 mb-1 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#1056b8]" />
                  Zvolte způsob doručení
                </h3>
                <div className="grid grid-cols-1 gap-2.5 mt-3">
                  {SHIPPING_OPTIONS.map((opt: ShippingOption) => {
                    const selected = shippingOption.id === opt.id;
                    const price = subtotal >= 2000 ? 0 : opt.price;
                    return (
                      <label
                        key={opt.id}
                        onClick={() => setShippingOption(opt)}
                        className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                          selected
                            ? 'border-[#1056b8] bg-blue-50/50 ring-1 ring-[#1056b8]'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl ${selected ? 'bg-[#1056b8] text-white' : 'bg-slate-100 text-slate-600'}`}>
                            {renderIcon(opt.icon)}
                          </div>
                          <div>
                            <div className="font-bold text-xs sm:text-sm text-slate-900">{opt.name}</div>
                            <div className="text-[11px] text-slate-500">{opt.description} · <span className="text-emerald-600 font-semibold">{opt.deliveryEstimate}</span></div>
                          </div>
                        </div>
                        <div className="text-right font-black text-xs sm:text-sm text-slate-900">
                          {price === 0 ? <span className="text-emerald-600">ZDARMA</span> : formatPrice(price)}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Payment section */}
              <div>
                <h3 className="text-base font-black text-slate-900 mb-1 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#1056b8]" />
                  Zvolte způsob platby
                </h3>
                <div className="grid grid-cols-1 gap-2.5 mt-3">
                  {PAYMENT_OPTIONS.map((pay: PaymentOption) => {
                    const selected = paymentOption.id === pay.id;
                    return (
                      <label
                        key={pay.id}
                        onClick={() => setPaymentOption(pay)}
                        className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                          selected
                            ? 'border-[#1056b8] bg-blue-50/50 ring-1 ring-[#1056b8]'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl ${selected ? 'bg-[#1056b8] text-white' : 'bg-slate-100 text-slate-600'}`}>
                            {renderIcon(pay.icon)}
                          </div>
                          <div>
                            <div className="font-bold text-xs sm:text-sm text-slate-900">{pay.name}</div>
                            <div className="text-[11px] text-slate-500">{pay.description}</div>
                          </div>
                        </div>
                        <div className="text-right font-black text-xs sm:text-sm text-slate-900">
                          {pay.price === 0 ? <span className="text-emerald-600">ZDARMA</span> : formatPrice(pay.price)}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Zpět do košíku
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-[#1056b8] hover:bg-[#0d4899] text-white text-xs font-bold flex items-center gap-2 shadow-sm"
                >
                  <span>Dodací údaje</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CUSTOMER DETAILS */}
          {step === 3 && (
            <form onSubmit={handleFinishOrder} className="space-y-5">
              <div>
                <h3 className="text-base font-black text-slate-900 mb-1 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#1056b8]" />
                  Kontaktní a doručovací údaje
                </h3>
                <p className="text-xs text-slate-500">Zadejte adresu, kam máme vaši objednávku doručit.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Jméno *</label>
                  <input
                    type="text"
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#1056b8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Příjmení *</label>
                  <input
                    type="text"
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#1056b8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">E-mail pro potvrzení *</label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#1056b8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Telefonní číslo *</label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#1056b8] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Ulice a číslo popisné *</label>
                  <input
                    type="text"
                    required
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#1056b8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Město *</label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#1056b8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">PSČ *</label>
                  <input
                    type="text"
                    required
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#1056b8] focus:outline-none"
                  />
                </div>
              </div>

              {/* Company check */}
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                  <input
                    type="checkbox"
                    name="isCompany"
                    checked={formData.isCompany}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded text-[#1056b8] accent-[#1056b8]"
                  />
                  <span>Nakupuji na firmu (IČO / DIČ)</span>
                </label>

                {formData.isCompany && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">Název firmy *</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1056b8] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">IČO *</label>
                      <input
                        type="text"
                        name="ico"
                        value={formData.ico}
                        onChange={handleInputChange}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1056b8] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">DIČ</label>
                      <input
                        type="text"
                        name="dic"
                        value={formData.dic}
                        onChange={handleInputChange}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1056b8] focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Final Summary Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-600">Doprava ({shippingOption.name}):</span>
                  <span className="font-bold text-slate-800">{shippingPrice === 0 ? 'ZDARMA' : formatPrice(shippingPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Platba ({paymentOption.name}):</span>
                  <span className="font-bold text-slate-800">{paymentPrice === 0 ? 'ZDARMA' : formatPrice(paymentPrice)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Celková částka k zaplacení:</span>
                  <span className="text-[#1056b8]">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Zpět k dopravě
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-black flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02]"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>Závazně objednat ({formatPrice(total)})</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: ORDER SUCCESS / CONFIRMATION */}
          {step === 4 && createdOrder && (
            <div className="text-center py-6 space-y-6">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>

              <div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-200">
                  Objednávka úspěšně přijata
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                  Děkujeme za vaši objednávku!
                </h2>
                <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  Číslo vaší objednávky je <strong className="text-slate-900 font-mono text-base">{createdOrder.id}</strong>. 
                  Potvrzení a daňový doklad jsme odeslali na e-mail <strong>{createdOrder.customer.email}</strong>.
                </p>
              </div>

              {/* Order Recap Details */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left text-xs max-w-lg mx-auto space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-500">Datum a čas:</span>
                  <span className="font-bold text-slate-800">{createdOrder.date}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-500">Zvolená doprava:</span>
                  <span className="font-bold text-slate-800">{createdOrder.shipping.name}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-500">Platební metoda:</span>
                  <span className="font-bold text-slate-800">{createdOrder.payment.name}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-500">Doručovací adresa:</span>
                  <span className="font-bold text-slate-800 text-right">
                    {createdOrder.customer.firstName} {createdOrder.customer.lastName}, {createdOrder.customer.street}, {createdOrder.customer.city} {createdOrder.customer.zip}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black pt-1 text-slate-900">
                  <span>Celková cena:</span>
                  <span className="text-[#1056b8]">{formatPrice(createdOrder.total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  Vytisknout potvrzení
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setStep(1);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#1056b8] hover:bg-[#0d4899] text-white text-xs font-bold flex items-center gap-2 shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Zpět do e-shopu
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
