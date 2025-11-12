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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <WhatsAppButton />

      <main
        className="flex-grow flex flex-col items-center justify-center p-4 pt-24"
        style={{
          backgroundImage: 'url(src/assets/vehicle-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="w-full max-w-lg mb-8">

          <div className="text-center mb-8">
            <div className="inline-block">
              <h1 className="text-4xl md:text-5xl font-bold text-black">
                Consignado
              </h1>
              <div className="h-1 bg-lime-500 mt-2 mx-auto rounded"></div>
            </div>

            <div className="mt-4">
              <p className="text-xl md:text-2xl text-gray-800">Compramos seu carro,</p>
              <p className="text-xl md:text-2xl text-gray-800">Saiba agora quanto ele vale!</p>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-lg shadow-2xl w-full border-2 border-lime-500">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Preencha o formulário:</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onFirstFormSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Marca" {...field} />
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
                        <Input placeholder="Modelo" {...field} />
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
                        <Input placeholder="Ano" {...field} />
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
                        <Input placeholder="Versão" {...field} />
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
                        <Input placeholder="Quilometragem" {...field} />
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
                        <Input placeholder="Valor desejado" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-lime-500 hover:bg-lime-600 text-white font-bold"
                >
                  Continuar
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Button>
              </form>
            </Form>
          </div>
        </div>

        <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
          <DialogContent className="sm:max-w-md">
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
                  className="w-full bg-lime-500 hover:bg-lime-600 text-white font-bold"
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
  );
};

export default Consignados;