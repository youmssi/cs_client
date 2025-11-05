import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getStrapiMediaUrl } from '@/lib/utils/media';
import type { FeatureCategory } from '@/types/products';
import Image from 'next/image';

interface ProductFeaturesShowcaseProps {
  headline: string;
  subheadline?: string | null;
  feature_categories?: Array<{ id: number }> | null;
  layout?: 'grid' | 'tabs' | 'accordion' | null;
  featureCategoriesData?: FeatureCategory[];
}

export function ProductFeaturesShowcase({
  headline,
  subheadline,
  layout = 'grid',
  featureCategoriesData = [],
}: ProductFeaturesShowcaseProps) {
  if (featureCategoriesData.length === 0) return null;

  // Grid Layout
  if (layout === 'grid') {
    return (
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {headline}
            </h2>
            {subheadline && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {subheadline}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureCategoriesData.map((category) => (
              <Card key={category.id} className="h-full">
                <CardHeader>
                  {category.icon && (
                    <Image
                      src={getStrapiMediaUrl(category.icon.url)}
                      alt={category.name}
                      width={48}
                      height={48}
                      className="mb-4"
                    />
                  )}
                  <CardTitle>{category.name}</CardTitle>
                  {category.description && (
                    <CardDescription>{category.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  {category.features && category.features.length > 0 && (
                    <ul className="space-y-3">
                      {category.features.map((feature, index) => (
                        <li key={index} className="space-y-2">
                          <h4 className="font-semibold">{feature.name}</h4>
                          {feature.description && (
                            <p className="text-sm text-muted-foreground">
                              {feature.description}
                            </p>
                          )}
                          {feature.image && (
                            <Image
                              src={getStrapiMediaUrl(feature.image.url)}
                              alt={feature.name}
                              width={300}
                              height={200}
                              className="rounded-lg mt-2"
                            />
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Tabs Layout
  if (layout === 'tabs') {
    return (
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {headline}
            </h2>
            {subheadline && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {subheadline}
              </p>
            )}
          </div>

          <Tabs defaultValue={featureCategoriesData[0]?.id.toString()} className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-8">
              {featureCategoriesData.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id.toString()}
                  className="text-xs md:text-sm"
                >
                  {category.icon && (
                    <Image
                      src={getStrapiMediaUrl(category.icon.url)}
                      alt=""
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                  )}
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {featureCategoriesData.map((category) => (
              <TabsContent key={category.id} value={category.id.toString()}>
                <Card>
                  <CardHeader>
                    <CardTitle>{category.name}</CardTitle>
                    {category.description && (
                      <CardDescription>{category.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    {category.features && category.features.length > 0 && (
                      <div className="grid md:grid-cols-2 gap-6">
                        {category.features.map((feature, index) => (
                          <div key={index} className="space-y-2">
                            <h4 className="font-semibold">{feature.name}</h4>
                            {feature.description && (
                              <p className="text-sm text-muted-foreground">
                                {feature.description}
                              </p>
                            )}
                            {feature.image && (
                              <Image
                                src={getStrapiMediaUrl(feature.image.url)}
                                alt={feature.name}
                                width={400}
                                height={250}
                                className="rounded-lg mt-2"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    );
  }

  // Accordion Layout
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {headline}
          </h2>
          {subheadline && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {subheadline}
            </p>
          )}
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {featureCategoriesData.map((category) => (
            <AccordionItem
              key={category.id}
              value={category.id.toString()}
              className="border rounded-lg px-6 py-2"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  {category.icon && (
                    <Image
                      src={getStrapiMediaUrl(category.icon.url)}
                      alt={category.name}
                      width={32}
                      height={32}
                    />
                  )}
                  <div className="text-left">
                    <h3 className="font-semibold">{category.name}</h3>
                    {category.description && (
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    )}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                {category.features && category.features.length > 0 && (
                  <div className="grid md:grid-cols-2 gap-4">
                    {category.features.map((feature, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="font-semibold">{feature.name}</h4>
                        {feature.description && (
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        )}
                        {feature.image && (
                          <Image
                            src={getStrapiMediaUrl(feature.image.url)}
                            alt={feature.name}
                            width={300}
                            height={200}
                            className="rounded-lg mt-2"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

