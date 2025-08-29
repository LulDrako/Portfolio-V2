"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";

const formSchema = z.object({
  name: z.string().min(2, "Ton nom doit faire au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  message: z.string().min(10, "Le message doit faire au moins 10 caractères"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactSection() {
  const t = useTranslations("Contact");
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues, e?: any) => {
    setIsSubmitting(true);

    const form = e?.target;
    const honeypot = form?.querySelector('input[name="_gotcha"]')?.value;

    if (honeypot) {
      console.warn("Bot détecté via honeypot.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast({
          title: t("successTitle"),
          description: t("successDesc"),
        });
        reset();
      } else {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue. Réessaie plus tard.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d’envoyer le message.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4 cockpit-glow">{t("heading")}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-muted-foreground max-w-2xl mx-auto whitespace-nowrap">
            {t("paragraph")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* 💬 Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-6">{t("formTitle")}</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">{t("name")}</label>
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  className="form-input"
                  placeholder={t("name")}
                />
                {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">{t("email")}</label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="form-input"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">{t("message")}</label>
                <textarea
                  id="message"
                  rows={5}
                  {...register("message")}
                  className="form-input"
                  placeholder={t("message")}
                />
                {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>}
              </div>

              {/* 🔐 Honeypot */}
              <input type="text" name="_gotcha" className="hidden" />

              <button type="submit" disabled={isSubmitting} className="form-button">
                {isSubmitting ? t("sending") : (
                  <>
                    <Send className="h-5 w-5 mr-2 inline" />
                    {t("send")}
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* 📞 Contact infos */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-6">{t("infosTitle")}</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-primary mr-4 mt-1" />
                <div>
                  <h4 className="text-lg font-medium mb-1">Email</h4>
                  <a href="mailto:karimfeki2004@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                    karimfeki2004@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-primary mr-4 mt-1" />
                <div>
                  <h4 className="text-lg font-medium mb-1">{t("phone")}</h4>
                  <p className="text-muted-foreground">+33 7 75 24 66 77</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-primary mr-4 mt-1" />
                <div>
                  <h4 className="text-lg font-medium mb-1">{t("location")}</h4>
                  <p className="text-muted-foreground">Paris, France</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
