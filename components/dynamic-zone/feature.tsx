import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { FeatureBlock } from '@/types';

export function Feature({
  heading,
  sub_heading,
  globe_card,
  ray_card,
  graph_card,
  social_media_card,
}: Readonly<FeatureBlock>) {
  const cards = [
    globe_card && { ...globe_card, type: 'globe' as const },
    ray_card && { ...ray_card, type: 'ray' as const },
    graph_card && { ...graph_card, type: 'graph' as const },
    social_media_card && { ...social_media_card, type: 'social' as const },
  ].filter(Boolean);

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
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

        {cards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => {
              if (!card) return null;

              return (
                <Card
                  key={index}
                  className={`hover:shadow-lg transition-shadow ${
                    card.span === 'two' ? 'md:col-span-2' : ''
                  } ${card.span === 'three' ? 'lg:col-span-3' : ''}`}
                >
                  <CardHeader>
                    <CardTitle>{card.title || 'Feature'}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{card.description}</p>

                    {card.type === 'ray' && 'before_ray_items' in card && (
                      <div className="space-y-2 pt-4 border-t">
                        {card.before_ray_items && (
                          <div className="space-y-1">
                            <p className="text-sm font-semibold">Before:</p>
                            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                              {card.before_ray_items.item_1 && (
                                <li>{card.before_ray_items.item_1}</li>
                              )}
                              {card.before_ray_items.item_2 && (
                                <li>{card.before_ray_items.item_2}</li>
                              )}
                              {card.before_ray_items.item_3 && (
                                <li>{card.before_ray_items.item_3}</li>
                              )}
                            </ul>
                          </div>
                        )}
                        {card.after_ray_items && (
                          <div className="space-y-1">
                            <p className="text-sm font-semibold">After:</p>
                            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                              {card.after_ray_items.item_1 && (
                                <li>{card.after_ray_items.item_1}</li>
                              )}
                              {card.after_ray_items.item_2 && (
                                <li>{card.after_ray_items.item_2}</li>
                              )}
                              {card.after_ray_items.item_3 && (
                                <li>{card.after_ray_items.item_3}</li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {card.type === 'graph' && 'top_items' in card && card.top_items && (
                      <div className="space-y-2 pt-4 border-t">
                        {card.top_items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <span className="text-sm font-semibold">{item.text}</span>
                            <Badge variant="secondary">{item.number}</Badge>
                          </div>
                        ))}
                        {card.highlighted_text && (
                          <p className="text-sm font-bold text-primary mt-2">
                            {card.highlighted_text}
                          </p>
                        )}
                      </div>
                    )}

                    {card.span && (
                      <Badge variant="outline" className="mt-2">
                        Span: {card.span}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

