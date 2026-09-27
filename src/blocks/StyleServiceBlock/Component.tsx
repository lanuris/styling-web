import type { StyleServiceBlock as StyleServiceBlockProps } from '@/payload-types'

import { StyleServiceCard } from './StyleServiceCard'

export const StyleServiceBlock: React.FC<StyleServiceBlockProps & { id?: string }> = ({
  contactButtonLabel,
  contactForm,
  closeButtonLabel,
  description,
  id,
  place,
  price,
  predefinedMessage,
  subtitle,
  title,
}) => (
  <section
    className="container py-12 sm:py-20"
    id={`block-${id}`}
    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
  >
    <StyleServiceCard
      contactButtonLabel={contactButtonLabel}
      closeButtonLabel={closeButtonLabel}
      contactForm={contactForm}
      description={description}
      place={place}
      predefinedMessage={predefinedMessage}
      price={price}
      subtitle={subtitle}
      title={title}
    />
  </section>
)
