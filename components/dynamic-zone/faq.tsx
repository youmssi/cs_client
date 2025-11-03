'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { FAQBlock } from '@/types';

export function FAQ({ heading, sub_heading, faqs }: Readonly<FAQBlock>) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {heading}
          </h2>
          {sub_heading && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {sub_heading}
            </p>
          )}
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={`${faq.question}-${index}`}
              value={`item-${index}`}
              className="border rounded-lg px-6 py-2 hover:bg-muted/50 transition-colors"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

