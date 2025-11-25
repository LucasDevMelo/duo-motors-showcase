import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// --- BACKGROUND COMPONENT (Geométrico Low-Poly) ---
const BackgroundPattern = () => (
  <div className="fixed inset-0 overflow-hidden -z-10 bg-[#f0f2f5]">
    <div className="absolute inset-0 bg-gradient-to-br from-white via-[#e6e9ef] to-[#dbe0e8]" />
    <div className="absolute -top-[20%] -left-[20%] w-[80%] h-[80%] bg-white/40 skew-y-[-15deg] rotate-12 transform-gpu blur-[1px]" />
    <div className="absolute top-[10%] right-[-10%] w-[60%] h-[70%] bg-slate-200/30 skew-x-[-20deg] -rotate-6 transform-gpu" />
    <div className="absolute bottom-[-10%] left-[10%] w-[50%] h-[60%] bg-white/70 skew-y-12 -rotate-[15deg] transform-gpu" />
    <div className="absolute top-[30%] right-[20%] w-[40%] h-[50%] bg-slate-300/20 skew-y-[-8deg] rotate-[30deg] transform-gpu blur-[2px]" />
    <div className="absolute -top-[10%] right-[10%] w-[40%] h-[40%] bg-white/50 skew-x-12 rotate-[20deg] transform-gpu" />
    <div className="absolute bottom-[-20%] right-[-20%] w-[90%] h-[50%] bg-slate-100/40 skew-y-[-5deg] rotate-[-10deg] transform-gpu" />
    <div className="absolute inset-0 bg-white opacity-[0.02] mix-blend-overlay pointer-events-none" 
         style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
    />
  </div>
);

const consignmentFormSchema = z.object({
  brand: z.string().min(1, "Marca é obrigatória").max(100),
  model: z.string().min(1, "Modelo é obrigatório").max(100),
  year: z.string().regex(/^\d{4}$/, "Ano deve ter 4 dígitos"),
  version: z.string().max(100).optional(),
  kilometers: z.string().regex(/^\d+$/, "Quilometragem deve ser um número").optional(),
  desired_value: z.string().min(1, "Valor desejado é obrigatório"),
});

const contactFormSchema = z.object({
  owner_name: z.string().min(1, "Nome é obrigatório").max(100),
  phone: z.string().min(1, "Telefone é obrigatório").max(20),
});

const Consignados = () => {
  const { toast } = useToast();
  const [showContactForm, setShowContactForm] = useState(false);
  const [vehicleData, setVehicleData] = useState<z.infer<typeof consignmentFormSchema> | null>(null);
  
  const form = useForm<z.infer<typeof consignmentFormSchema>>({
    resolver: zodResolver(consignmentFormSchema),
    defaultValues: {
      brand: "",
      model: "",
      year: "",
      version: "",
      kilometers: "",
      desired_value: "",
    },
  });

  const contactForm = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      owner_name: "",
      phone: "",
    },
  });

  const onFirstFormSubmit = (values: z.infer<typeof consignmentFormSchema>) => {
    setVehicleData(values);
    setShowContactForm(true);
  };

  const onFinalSubmit = async (contactValues: z.infer<typeof contactFormSchema>) => {
    if (!vehicleData) return;

    try {
      const { error } = await supabase.from('consignment_submissions').insert({
        brand: vehicleData.brand,
        model: vehicleData.model,
        year: parseInt(vehicleData.year),
        version: vehicleData.version || null,
        kilometers: vehicleData.kilometers ? parseInt(vehicleData.kilometers) : null,
        desired_value: vehicleData.desired_value,
        owner_name: contactValues.owner_name,
        phone: contactValues.phone,
      });

      if (error) throw error;

      toast({
        title: "Formulário enviado!",
        description: "Entraremos em contato em breve.",
      });
      
      form.reset();
      contactForm.reset();
      setShowContactForm(false);
      setVehicleData(null);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  return (
    // Removido bg-gray-50 e adicionado relative para controlar o z-index
    <div className="min-h-screen flex flex-col relative font-sans">
      
      {/* Background Component */}
      <BackgroundPattern />

      {/* Conteúdo com z-index para ficar acima do background */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <WhatsAppButton />

        <main className="flex-grow flex flex-col items-center justify-center p-4 pt-24">
          <div className="w-full max-w-lg mb-8">

            <div className="text-center mb-8">
              <div className="inline-block">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                  Consignado
                </h1>
                <div className="h-1 bg-lime-500 mt-2 mx-auto rounded"></div>
              </div>

              <div className="mt-4">
                <p className="text-xl md:text-2xl text-slate-700">Compramos seu carro,</p>
                <p className="text-xl md:text-2xl text-slate-700">Saiba agora quanto ele vale!</p>
              </div>
            </div>

            {/* Adicionado backdrop-blur e background semi-transparente para modernizar */}
            <div className="bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-2xl w-full border-2 border-lime-500/50">
              <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">Preencha o formulário:</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onFirstFormSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input className="bg-white" placeholder="Marca" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input className="bg-white" placeholder="Modelo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input className="bg-white" placeholder="Ano" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="version"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input className="bg-white" placeholder="Versão" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="kilometers"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input className="bg-white" placeholder="Quilometragem" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="desired_value"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input className="bg-white" placeholder="Valor desejado" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-lime-500 hover:bg-lime-600 text-white font-bold h-12 text-lg shadow-lg hover:shadow-lime-200 transition-all"
                  >
                    Continuar
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </Button>
                </form>
              </Form>
            </div>
          </div>

          <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
            <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-xl border-lime-500">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center">Complete seu cadastro</DialogTitle>
              </DialogHeader>
              <Form {...contactForm}>
                <form onSubmit={contactForm.handleSubmit(onFinalSubmit)} className="space-y-4">
                  <FormField
                    control={contactForm.control}
                    name="owner_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Nome completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={contactForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Telefone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-lime-500 hover:bg-lime-600 text-white font-bold h-10"
                    disabled={contactForm.formState.isSubmitting}
                  >
                    {contactForm.formState.isSubmitting ? "Enviando..." : "Enviar"}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Consignados;