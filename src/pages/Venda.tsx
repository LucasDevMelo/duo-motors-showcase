import React from 'react';
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

const saleFormSchema = z.object({
  brand: z.string().min(1, "Marca é obrigatória").max(100),
  model: z.string().min(1, "Modelo é obrigatório").max(100),
  year: z.string().regex(/^\d{4}$/, "Ano deve ter 4 dígitos"),
  version: z.string().max(100).optional(),
  kilometers: z.string().regex(/^\d+$/, "Quilometragem deve ser um número").optional(),
});

const Venda = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof saleFormSchema>>({
    resolver: zodResolver(saleFormSchema),
    defaultValues: {
      brand: "",
      model: "",
      year: "",
      version: "",
      kilometers: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof saleFormSchema>) => {
    try {
      const { error } = await supabase.from('sale_submissions').insert({
        brand: values.brand,
        model: values.model,
        year: parseInt(values.year),
        version: values.version || null,
        kilometers: values.kilometers ? parseInt(values.kilometers) : null,
        owner_name: "",
        phone: "",
      });

      if (error) throw error;

      toast({
        title: "Formulário enviado!",
        description: "Entraremos em contato em breve.",
      });
      
      form.reset();
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
          backgroundImage:  'url(src/assets/vehicle-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="w-full max-w-lg mb-8">

          <div className="text-center mb-8">
            <div className="inline-block">
              <h1 className="text-4xl md:text-5xl font-bold text-black">
                Venda seu Carro
              </h1>
              <div className="h-1 bg-lime-500 mt-2 mx-auto rounded"></div>
            </div>

            <div className="mt-4">
              <p className="text-xl md:text-2xl text-gray-800">Quer vender seu carro de forma rápida e segura?</p>
              <p className="text-xl md:text-2xl text-gray-800">A Duo Motors oferece a melhor avaliação!</p>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-lg shadow-2xl w-full border-2 border-lime-500">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Preencha o formulário:</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                <Button
                  type="submit"
                  className="w-full bg-lime-500 hover:bg-lime-600 text-white font-bold"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Enviando..." : "Enviar"}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Venda;