'use client';

import { useState, type BaseSyntheticEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Plane } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { contactSchema } from '@/lib/contactSchema';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from '@/hooks/useTranslations';
import SectionHeading from '@/components/ui/SectionHeading';
import HudCorners from '@/components/ui/HudCorners';

type FormValues = z.infer<typeof contactSchema>;

const variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ContactSection() {
  const t = useTranslations('Contact');
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: FormValues, e?: BaseSyntheticEvent) => {
    setIsSubmitting(true);

    const form = e?.target;
    const honeypot = form?.querySelector('input[name="_gotcha"]')?.value;

    if (honeypot) {
      console.warn('Bot détecté via honeypot.');
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast({
          title: t('successTitle'),
          description: t('successDesc'),
        });
        reset();
      } else {
        toast({
          title: t('errorTitle'),
          description: t('errorSend'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: t('errorTitle'),
        description: t('errorNetwork'),
        variant: 'destructive',
      });
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t('heading')} description={t('paragraph')} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* 💬 Form */}
          <motion.div
            variants={variants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative rounded-lg border radar-border bg-secondary/20 p-6 sm:p-8"
          >
            <HudCorners />
            <h3 className="text-2xl font-semibold mb-6">{t('formTitle')}</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  {t('name')}
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name')}
                  className="form-input"
                  placeholder={t('name')}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-destructive">
                    {t(`errors.${errors.name.message}`)}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  {t('email')}
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="form-input"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-destructive">
                    {t(`errors.${errors.email.message}`)}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  {t('message')}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register('message')}
                  className="form-input"
                  placeholder={t('message')}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-destructive">
                    {t(`errors.${errors.message.message}`)}
                  </p>
                )}
              </div>

              {/* 🔐 Honeypot */}
              <input type="text" name="_gotcha" className="hidden" />

              <button type="submit" disabled={isSubmitting} className="form-button">
                {isSubmitting ? (
                  <>
                    <Plane aria-hidden className="h-5 w-5 mr-2 inline contact-plane" />
                    {t('sending')}
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2 inline" />
                    {t('send')}
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* 📞 Contact infos */}
          <motion.div
            variants={variants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-6">{t('infosTitle')}</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-primary mr-4 mt-1" />
                <div>
                  <h4 className="text-lg font-medium mb-1">Email</h4>
                  <a
                    href="mailto:karimfeki2004@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    karimfeki2004@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-primary mr-4 mt-1" />
                <div>
                  <h4 className="text-lg font-medium mb-1">{t('location')}</h4>
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
