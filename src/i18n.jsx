import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'puppywhippies-language'
const isSpanish = value => String(value || '').toLowerCase().startsWith('es')
const isSpanishPath = path => path === '/es' || path.startsWith('/es/')
const stripSpanishPrefix = path => path.replace(/^\/es(?=\/|$)/, '') || '/'
const withSpanishPrefix = path => (path === '/' ? '/es/' : `/es${path}`)

const navigateToLanguage = nextLanguage => {
  const currentPath = window.location.pathname
  const basePath = stripSpanishPrefix(currentPath)
  const nextPath = nextLanguage === 'es' ? withSpanishPrefix(basePath) : basePath
  const normalizedNext = nextPath.replace(/\/{2,}/g, '/')

  if (normalizedNext !== currentPath) {
    window.history.pushState({}, '', `${normalizedNext}${window.location.search}${window.location.hash}`)
    window.dispatchEvent(new Event('puppywhippies:navigate'))
  }
}

export const copy = {
  en: {
    nav: {
      home: 'Home',
      flavors: 'Flavors',
      lasVegas: 'Las Vegas',
      ingredients: 'Ingredients',
      about: 'About',
      request: 'Request Availability',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      switchTo: 'Español',
    },
    hero: {
      line: 'Small-batch freeze-dried dog treats made with all-natural ingredients.',
      tags: ['Fruity', 'Freeze-Dried', 'Delicious'],
      sub: 'Pick a pilot flavor in the Las Vegas area, and we will confirm ingredients, serving notes, pickup or delivery fit, and next batch timing.',
      flavors: 'Explore Flavors',
      story: 'Our Story',
    },
    marquee: [
      'Fruity', 'Pup-Loving', 'Freeze-Dried', 'Las Vegas Area',
      'Blueberry', 'Made with Love', 'Veggie Ideas', 'Pup-Ready',
      'All-Natural Ingredients', 'Dog Families', 'Berry Good', 'Small Batch',
    ],
    products: {
      eyebrow: 'Our Treats',
      titleA: 'Flavor',
      titleB: 'Lineup',
      subtitle: 'Choose a freeze-dried pilot flavor. Each request starts with flavor fit, all-natural ingredient notes, serving guidance, and Las Vegas area pickup or delivery timing.',
      batch: 'Freeze-dried pilot batch',
      cta: 'Request Availability',
    },
    about: {
      bubble1: 'Made with Love',
      bubble2: 'Ingredient Details',
      eyebrow: 'Our Story',
      titleA: 'Why We',
      titleB: 'Started',
      body1: 'Puppy Whippies was born out of pure love for dogs and the families who spoil them. We wanted a cheerful freeze-dried dog treat ritual that adults can supervise and everyone can enjoy, without pretending every pet or household needs the same thing.',
      body2: 'Every Puppy Whippie request starts with the practical details: all-natural ingredients, serving size, availability, and whether the freeze-dried batch is a good fit for your pup. We are still refining the lineup, so we keep availability and serving guidance personal.',
      pillars: ['Ingredient Details', 'No Payment on Site', 'Dog-Loving Families', 'Las Vegas Area'],
      cta: 'Request Availability',
    },
    why: {
      eyebrow: 'Why Puppy Whippies?',
      title: ['The', 'Whippie', 'Difference'],
      subtitle: 'A playful freeze-dried treat concept for families who love their dogs deeply and want the details handled with care.',
      features: [
        ['Ingredients Before Pickup', 'All-natural batch ingredients are shared before pickup, delivery, or payment, so there are no mystery treats.'],
        ['Made for Dog Families', 'Designed for pet parents who want a special treat moment and clear serving guidance before trying it.'],
        ['Clear Fit Check', 'Tell us about your pup, allergies, and preferences so we can help you decide whether a batch makes sense.'],
        ['Freeze-Dried Texture', 'Light freeze-dried treats with serving size and batch notes shared before pickup or delivery.'],
        ['Made with Love', 'Small-batch preparation keeps the brand personal while the flavor lineup is still growing.'],
        ['Las Vegas Area Requests', 'Ask about current availability, pickup, delivery, and the best way to try the flavors around Las Vegas.'],
      ],
      stats: [['Pilot', 'Batch Status'], ['1:1', 'Request Help'], ['Natural', 'Ingredients'], ['No', 'Online Payment']],
    },
    details: {
      eyebrow: 'Good to Know',
      title: ['Before', 'You', 'Request'],
      items: [
        ['Current Batch', 'Puppy Whippies is in Las Vegas area freeze-dried pilot-batch mode. Availability, flavor, serving size, and pickup or delivery fit are confirmed by email before anything moves forward.', 'Pilot status'],
        ['Ingredient Check', 'Example batches use all-natural fruit or veggie-forward ingredients and are freeze-dried for a light treat texture. Current ingredients are confirmed before pickup or delivery.', 'Details first'],
        ['No Site Checkout', 'There is no cart or payment on this site yet. The form opens an email request so details can be confirmed personally.', 'No payment here'],
        ['Serving Note', 'Treats are not a meal replacement or veterinary product. Ask your vet if your pet has dietary needs, and supervise pets while serving.', 'Pet care'],
      ],
    },
    contact: {
      eyebrow: 'Get in Touch',
      title: ['Request', 'a', 'Flavor'],
      body: 'Request a freeze-dried pilot flavor for your pup in the Las Vegas area, including Summerlin, Henderson, Downtown, North Las Vegas, and nearby neighborhoods. We confirm current sample or pricing details by email before pickup, delivery, or payment.',
      info: ['Las Vegas area pilot batches: Summerlin, Henderson, Downtown, North Las Vegas, and nearby neighborhoods', 'hello@puppywhippies.com', 'Sample or pricing details confirmed before pickup, delivery, or payment'],
      formTitle: 'Request Availability',
      successTitle: 'Email draft opened?',
      successBody: 'Please send the draft from your mail app. If it did not open, email',
      successTail: 'and include the details below.',
      sentTitle: 'Request received',
      sentBody: 'Thanks. We received your Puppy Whippies request and will reply about availability, ingredients, serving notes, and Las Vegas pickup or delivery fit.',
      clear: 'Clear Form',
      copyDetails: 'Copy Email Details',
      copiedDetails: 'Request details copied.',
      labels: ['Your Name', 'Email Address', 'Flavor Interest', 'Quantity Interest', 'Your Las Vegas Neighborhood', 'Desired Date', 'Pet Notes', 'Message or Request'],
      placeholders: ['Jane & Biscuit', 'jane@example.com', '1 bag', 'Summerlin, Henderson, Downtown, etc.', 'Allergies, size, preferences, or anything we should know', 'I would like to request availability for a freeze-dried pilot batch...'],
      unsure: 'Not sure yet',
      note: 'This starts an email request only. We confirm all-natural ingredients, serving notes, Las Vegas area fit, timing, and whether the current pilot is a sample or priced pickup before any delivery or payment. Your details are only used to reply about Puppy Whippies availability.',
      submit: 'Start Email Request',
      autoMessage: flavor => `I would like to request availability for ${flavor}.`,
      subject: name => `Puppy Whippies request from ${name}`,
      emailFields: {
        name: 'Name',
        email: 'Email',
        flavor: 'Flavor',
        message: 'Message',
        quantity: 'Quantity',
        area: 'Pickup/delivery area',
        date: 'Desired date',
        notes: 'Pet notes',
        missing: 'Not provided',
        flexible: 'Flexible',
        none: 'None provided',
      },
    },
    footer: {
      tagline: 'Fruity * Freeze-Dried * All Natural',
      flavors: 'Flavors',
      flavorLinks: ['Flavor Lineup', 'Berry Flavors', 'Veggie Flavors', 'Request Info'],
      company: 'Company',
      companyLinks: ['Our Story', 'Las Vegas Dog Treats', 'Ingredients', 'Contact', 'Privacy'],
      notes: 'Request Notes',
      noteItems: ['No payment is collected on this site.', 'All-natural ingredients are confirmed by email.', 'Las Vegas area pickup or delivery is arranged per freeze-dried batch.'],
      copyright: 'Copyright 2026 Puppy Whippies. Made with love in the Las Vegas area. All rights reserved.',
      legal: 'Email requests are used only to reply about Puppy Whippies availability. Treats are not a veterinary product; supervise pets while serving.',
    },
    pages: {
      homeTitle: 'Puppy Whippies - Freeze-Dried Dog Treats',
      homeDescription: 'Puppy Whippies is a playful Las Vegas area pilot-batch dog treat brand with freeze-dried flavors, all-natural ingredient confirmation, and pickup or delivery fit by email.',
      breadcrumbsHome: 'Home',
      breadcrumbLabel: 'Breadcrumb',
      skipLink: 'Skip to content',
      flavorLineupSchema: 'Puppy Whippies Flavor Lineup',
      requestBased: 'Request-based',
      requestOnlyHours: 'Pilot requests by email only; no public storefront or walk-in hours.',
      flavorsTitle: 'Freeze-Dried Dog Treat Flavors in Las Vegas',
      flavorsDescription: 'Explore Puppy Whippies freeze-dried dog treat flavors made with all-natural ingredients for Las Vegas area dog families, including strawberry, blueberry, carrot, berry, cucumber, and sampler requests.',
      flavorsEyebrow: 'Flavor lineup',
      flavorsH1: 'Freeze-Dried Dog Treat Flavors',
      flavorsLede: 'Puppy Whippies flavors are requested as Las Vegas area freeze-dried pilot batches. Each batch starts with all-natural ingredient confirmation, serving guidance, and pickup or delivery fit.',
      localTitle: 'Las Vegas Dog Treats',
      localDescription: 'Puppy Whippies offers Las Vegas area pilot requests for small-batch freeze-dried dog treats with all-natural ingredients, flavor, pickup, and delivery details confirmed by email.',
      localEyebrow: 'Local pilot requests',
      localLede: 'Puppy Whippies is built for Las Vegas area dog families who want playful, small-batch freeze-dried treats with all-natural ingredients and serving notes confirmed before pickup or delivery.',
      requestAvailability: 'Request Availability',
      seeFlavors: 'See Flavors',
      localCards: [
        ['Small-batch requests', 'Each request starts as a pilot batch conversation, so the current flavor, treat count, and batch timing are clear before anything moves forward.'],
        ['Las Vegas area fit', 'Share your neighborhood, such as Summerlin, Henderson, Downtown, or nearby areas, and we will confirm whether pickup or delivery makes sense.'],
        ['No mystery treats', 'All-natural ingredients, serving size, and pet notes are confirmed by email before pickup, delivery, or payment.'],
      ],
      localProcessTitle: 'How local requests work',
      localProcessItems: [
        'Send a request with your flavor interest, neighborhood, desired timing, and any pet notes.',
        'We reply with current freeze-dried batch details, all-natural ingredients, serving guidance, and pickup or delivery fit.',
        'Only after the details make sense do we coordinate the next step. There is no cart or automatic checkout on the site.',
      ],
      localTrustTitle: 'Las Vegas service note',
      localTrustText: 'Puppy Whippies is currently a Las Vegas area pilot-batch project, not a public storefront. Requests are handled by email first, pickup or delivery details are scheduled by reply, and there are no open walk-in hours. Availability can vary by freeze-dried batch, so confirmation keeps ingredients, timing, and local expectations clear.',
      whoTitle: 'Who Puppy Whippies is for',
      whoItems: ['Dog families in the Las Vegas area who want freeze-dried samples before choosing favorites.', 'People who want all-natural ingredient notes before serving a new treat.', 'Families planning a small pup celebration, birthday, or weekend treat pickup.'],
      ingredientsTitle: 'Dog Treat Ingredients and Serving Notes',
      ingredientsDescription: 'See how Puppy Whippies confirms all-natural ingredients, serving notes, and pet notes for Las Vegas area freeze-dried dog treat requests.',
      ingredientsEyebrow: 'Ingredient clarity',
      ingredientsH1: 'Ingredients Before Pickup',
      ingredientsLede: 'Puppy Whippies keeps the ingredient conversation clear. Every Las Vegas area freeze-dried treat request includes current all-natural batch notes before pickup, delivery, or payment.',
      confirmedTitle: 'What gets confirmed',
      confirmedItems: ['Current all-natural fruit, veggie, or flavor ingredients used in the pilot batch.', 'Freeze-dried texture, serving notes, and batch guidance.', 'Any pet allergy, size, or preference notes you share.'],
      servingTitle: 'Serving note',
      servingText: 'Puppy Whippies are freeze-dried treats, not veterinary products. Supervise pets while serving and check with your veterinarian if your pup has special dietary needs.',
      askBatch: 'Ask About a Batch',
      aboutTitle: 'About Puppy Whippies',
      aboutDescription: 'Meet Puppy Whippies, a Las Vegas area pilot-batch freeze-dried dog treat brand built around playful flavors, all-natural ingredients, and dog-family joy.',
      aboutEyebrow: 'Our story',
      aboutH1: 'A Las Vegas Area Freeze-Dried Treat Brand',
      aboutLede: 'Puppy Whippies is a playful pilot-batch project for dog-loving families who want joyful freeze-dried treats with clear all-natural ingredient notes.',
      requestTitle: 'Request Puppy Whippies Availability',
      requestDescription: 'Request Puppy Whippies Las Vegas area freeze-dried dog treat availability and confirm flavor, all-natural ingredients, serving notes, pickup, or delivery timing by email.',
      requestEyebrow: 'Freeze-dried treat requests',
      requestLede: 'Start a Las Vegas area pilot request. No payment is collected on this site; we confirm batch details by email first.',
      privacyTitle: 'Privacy Policy',
      privacyDescription: 'Read how Puppy Whippies uses email request details for Las Vegas area freeze-dried dog treat availability, ingredient confirmation, and pickup or delivery replies.',
      privacyEyebrow: 'Privacy',
      privacyH1: 'Privacy Policy',
      privacyLede: 'Puppy Whippies uses request details only to reply about availability, ingredients, serving notes, and Las Vegas area pickup or delivery fit.',
      privacySections: [
        ['What we collect', 'When you start an email request, you may share your name, email address, flavor interest, quantity interest, neighborhood, desired date, pet notes, and message.'],
        ['How we use it', 'We use request details to reply about Puppy Whippies availability, all-natural ingredient notes, serving guidance, pickup or delivery fit, and batch timing.'],
        ['What we do not do', 'We do not collect payment on this site, do not run a public cart, and do not sell personal request details. For privacy questions, email hello@puppywhippies.com.'],
      ],
      faqIngredientQuestion: 'Are Puppy Whippies ingredients confirmed before pickup or delivery?',
      faqIngredientAnswer: 'Yes. Current all-natural batch ingredients and serving guidance are confirmed by email before pickup, delivery, or payment.',
      faqVetQuestion: 'Are Puppy Whippies veterinary products?',
      faqVetAnswer: 'No. Puppy Whippies are treat requests, not veterinary products. Pet families should supervise serving and share allergy or dietary notes before requesting a batch.',
      localBusinessDescription: 'Puppy Whippies offers Las Vegas area pilot requests for small-batch freeze-dried dog treats made with all-natural ingredients.',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      flavors: 'Sabores',
      lasVegas: 'Las Vegas',
      ingredients: 'Ingredientes',
      about: 'Nosotros',
      request: 'Consultar disponibilidad',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      switchTo: 'English',
    },
    hero: {
      line: 'Premios para perros liofilizados en lotes pequeños, hechos con ingredientes totalmente naturales.',
      tags: ['Frutales', 'Liofilizados', 'Deliciosos'],
      sub: 'Elige un sabor piloto en el área de Las Vegas y confirmaremos ingredientes, porción sugerida, si hay pickup o entrega y fecha del próximo lote.',
      flavors: 'Ver sabores',
      story: 'Nuestra historia',
    },
    marquee: [
      'Frutales', 'Para consentir a tu perro', 'Liofilizados', 'Área de Las Vegas',
      'Arándano', 'Hechos con cariño', 'Ideas con vegetales', 'Listos para tu perrito',
      'Ingredientes totalmente naturales', 'Familias con perros', 'Súper frutales', 'Lotes pequeños',
    ],
    products: {
      eyebrow: 'Nuestros premios',
      titleA: 'Sabores',
      titleB: 'disponibles',
      subtitle: 'Elige un sabor piloto liofilizado. Cada solicitud empieza confirmando el sabor, los ingredientes totalmente naturales, la porción sugerida y si hay opción de pickup o entrega en el área de Las Vegas.',
      batch: 'Lote piloto liofilizado',
      cta: 'Consultar disponibilidad',
    },
    about: {
      bubble1: 'Hecho con cariño',
      bubble2: 'Detalles de ingredientes',
      eyebrow: 'Nuestra historia',
      titleA: 'Por qué',
      titleB: 'empezamos',
      body1: 'Puppy Whippies nació por amor a los perros y a las familias que los consienten. Queríamos crear un ritual alegre con premios liofilizados que los adultos puedan supervisar y que todos disfruten, sin asumir que todos los perros o hogares necesitan lo mismo.',
      body2: 'Cada solicitud de Puppy Whippies empieza con los detalles importantes: ingredientes totalmente naturales, porción sugerida, disponibilidad y si el lote liofilizado es adecuado para tu perrito. Todavía estamos refinando la línea de sabores, por eso mantenemos la disponibilidad y las recomendaciones de porción de forma personal.',
      pillars: ['Detalles de ingredientes', 'Sin pago en el sitio', 'Para familias con perros', 'Área de Las Vegas'],
      cta: 'Consultar disponibilidad',
    },
    why: {
      eyebrow: '¿Por qué Puppy Whippies?',
      title: ['La', 'diferencia', 'Whippie'],
      subtitle: 'Un concepto divertido de premios liofilizados para familias que aman profundamente a sus perros y quieren detalles claros desde el inicio.',
      features: [
        ['Ingredientes antes del pickup', 'Compartimos los ingredientes totalmente naturales del lote antes del pickup, la entrega o el pago, para que no haya premios misteriosos.'],
        ['Hecho para familias con perros', 'Pensado para personas que cuidan a sus perros y quieren un momento especial con una guía clara antes de probar un nuevo premio.'],
        ['Revisión de compatibilidad', 'Cuéntanos sobre tu perrito, alergias y preferencias para ayudarte a decidir si un lote es adecuado para tu perro.'],
        ['Textura liofilizada', 'Premios liofilizados y ligeros con porción sugerida y notas del lote antes del pickup o la entrega.'],
        ['Hechos con cariño', 'La preparación en lotes pequeños mantiene la marca personal mientras la línea de sabores sigue creciendo.'],
        ['Solicitudes en Las Vegas', 'Pregunta por disponibilidad, pickup, entrega y la mejor forma de probar los sabores en Las Vegas.'],
      ],
      stats: [['Piloto', 'Estado del lote'], ['1:1', 'Ayuda por solicitud'], ['Naturales', 'Ingredientes'], ['Sin', 'Pago en línea']],
    },
    details: {
      eyebrow: 'Antes de pedir',
      title: ['Antes', 'de', 'solicitar'],
      items: [
        ['Lote actual', 'Puppy Whippies está en modo de lotes piloto liofilizados en el área de Las Vegas. La disponibilidad, el sabor, la porción sugerida y el pickup o la entrega se confirman por correo electrónico antes de avanzar.', 'Estado piloto'],
        ['Revisión de ingredientes', 'Los lotes de ejemplo usan ingredientes totalmente naturales con frutas o vegetales y se liofilizan para lograr una textura ligera. Los ingredientes actuales se confirman antes del pickup o la entrega.', 'Detalles primero'],
        ['Sin pago en línea', 'Todavía no hay carrito ni pago en línea en este sitio. El formulario abre una solicitud por correo electrónico para confirmar los detalles personalmente.', 'Sin pago aquí'],
        ['Recomendación de porción', 'Los premios no sustituyen una comida completa ni son un producto veterinario. Consulta a tu veterinario si tu mascota tiene necesidades alimentarias especiales y supervisa al servirlos.', 'Cuidado de mascotas'],
      ],
    },
    contact: {
      eyebrow: 'Ponte en contacto',
      title: ['Consulta', 'un', 'sabor'],
      body: 'Solicita un sabor piloto liofilizado para tu perrito en el área de Las Vegas, incluyendo Summerlin, Henderson, Downtown, North Las Vegas y vecindarios cercanos. Confirmamos por correo si el lote actual es muestra o pickup con precio antes de cualquier entrega o pago.',
      info: ['Lotes piloto en Las Vegas: Summerlin, Henderson, Downtown, North Las Vegas y vecindarios cercanos', 'hello@puppywhippies.com', 'Detalles de muestra o precio confirmados antes del pickup, la entrega o el pago'],
      formTitle: 'Consultar disponibilidad',
      successTitle: '¿Se abrió el borrador del correo?',
      successBody: 'Por favor envía el borrador desde tu app de correo. Si no se abrió, escribe a',
      successTail: 'e incluye los detalles de abajo.',
      sentTitle: 'Solicitud recibida',
      sentBody: 'Gracias. Recibimos tu solicitud de Puppy Whippies y responderemos sobre disponibilidad, ingredientes, recomendación de porción y opciones de pickup o entrega en Las Vegas.',
      clear: 'Limpiar formulario',
      copyDetails: 'Copiar detalles del correo',
      copiedDetails: 'Detalles de solicitud copiados.',
      labels: ['Tu nombre', 'Correo electrónico', 'Sabor de interés', 'Cantidad de interés', 'Tu vecindario en Las Vegas', 'Fecha deseada', 'Notas de tu mascota', 'Mensaje o solicitud'],
      placeholders: ['Jane y Biscuit', 'jane@example.com', '1 bolsa', 'Summerlin, Henderson, Downtown, etc.', 'Alergias, tamaño, preferencias o cualquier detalle importante', 'Quisiera consultar disponibilidad para un lote piloto liofilizado...'],
      unsure: 'Todavía no estoy seguro/a',
      note: 'Esto solo inicia una solicitud por correo electrónico. Confirmamos ingredientes totalmente naturales, recomendaciones de porción, disponibilidad en Las Vegas, fecha y si el lote piloto actual es muestra o pickup con precio antes de cualquier entrega o pago. Usamos tus datos solo para responder sobre Puppy Whippies.',
      submit: 'Iniciar solicitud por correo',
      autoMessage: flavor => `Quisiera consultar disponibilidad para ${flavor}.`,
      subject: name => `Solicitud de Puppy Whippies de ${name}`,
      emailFields: {
        name: 'Nombre',
        email: 'Correo',
        flavor: 'Sabor',
        message: 'Mensaje',
        quantity: 'Cantidad',
        area: 'Área de pickup/entrega',
        date: 'Fecha deseada',
        notes: 'Notas de la mascota',
        missing: 'No indicado',
        flexible: 'Flexible',
        none: 'Ninguna indicada',
      },
    },
    footer: {
      tagline: 'Frutales * Liofilizados * Totalmente naturales',
      flavors: 'Sabores',
      flavorLinks: ['Línea de sabores', 'Sabores con frutos rojos', 'Sabores con vegetales', 'Pedir información'],
      company: 'Compañía',
      companyLinks: ['Nuestra historia', 'Premios para perros en Las Vegas', 'Ingredientes', 'Contacto', 'Privacidad'],
      notes: 'Notas de solicitud',
      noteItems: ['No se cobra ningún pago en este sitio.', 'Los ingredientes totalmente naturales se confirman por correo electrónico.', 'El pickup o la entrega en Las Vegas se coordina por lote liofilizado.'],
      copyright: 'Copyright 2026 Puppy Whippies. Hecho con cariño en el área de Las Vegas. Todos los derechos reservados.',
      legal: 'Las solicitudes por correo electrónico se usan solo para responder sobre la disponibilidad de Puppy Whippies. Los premios no son un producto veterinario; supervisa a tu mascota al servirlos.',
    },
    pages: {
      homeTitle: 'Puppy Whippies - Premios liofilizados para perros',
      homeDescription: 'Puppy Whippies es una marca de lotes piloto en el área de Las Vegas con sabores liofilizados, ingredientes totalmente naturales confirmados y opciones de pickup o entrega por correo electrónico.',
      breadcrumbsHome: 'Inicio',
      breadcrumbLabel: 'Ruta de navegación',
      skipLink: 'Saltar al contenido',
      flavorLineupSchema: 'Línea de sabores Puppy Whippies',
      requestBased: 'Por solicitud',
      requestOnlyHours: 'Solicitudes piloto solo por correo; no hay tienda abierta al público ni horario para visitas sin cita.',
      flavorsTitle: 'Sabores liofilizados para perros en Las Vegas',
      flavorsDescription: 'Explora los sabores liofilizados de Puppy Whippies, hechos con ingredientes totalmente naturales para familias con perros en el área de Las Vegas.',
      flavorsEyebrow: 'Línea de sabores',
      flavorsH1: 'Sabores liofilizados para perros',
      flavorsLede: 'Los sabores de Puppy Whippies se solicitan como lotes piloto liofilizados en el área de Las Vegas. Cada lote empieza confirmando ingredientes totalmente naturales, porción sugerida y si hay pickup o entrega.',
      localTitle: 'Premios para perros en Las Vegas',
      localDescription: 'Puppy Whippies ofrece solicitudes piloto en Las Vegas para premios liofilizados en lotes pequeños con ingredientes totalmente naturales y detalles confirmados por correo electrónico.',
      localEyebrow: 'Solicitudes locales piloto',
      localLede: 'Puppy Whippies está hecho para familias con perros en Las Vegas que quieren premios liofilizados, divertidos y en lotes pequeños, con ingredientes totalmente naturales confirmados antes del pickup o la entrega.',
      requestAvailability: 'Consultar disponibilidad',
      seeFlavors: 'Ver sabores',
      localCards: [
        ['Solicitudes en lotes pequeños', 'Cada solicitud empieza como una conversación sobre el lote piloto, para aclarar sabor, cantidad y fecha antes de avanzar.'],
        ['Ajuste al área de Las Vegas', 'Comparte tu vecindario, como Summerlin, Henderson, Downtown o zonas cercanas, y confirmaremos si hay opción de pickup o entrega.'],
        ['Sin premios misteriosos', 'Confirmamos ingredientes totalmente naturales, porción sugerida y notas de tu mascota por correo electrónico antes del pickup, la entrega o el pago.'],
      ],
      localProcessTitle: 'Cómo funcionan las solicitudes locales',
      localProcessItems: [
        'Envía una solicitud con el sabor que te interesa, tu vecindario, la fecha deseada y cualquier nota sobre tu mascota.',
        'Respondemos con detalles del lote liofilizado actual, ingredientes totalmente naturales, recomendación de porción y si hay opción de pickup o entrega.',
        'Solo después de confirmar que todo tiene sentido coordinamos el siguiente paso. No hay carrito ni pago automático en el sitio.',
      ],
      localTrustTitle: 'Nota de servicio en Las Vegas',
      localTrustText: 'Puppy Whippies es actualmente un proyecto piloto de lotes liofilizados en el área de Las Vegas, no una tienda abierta al público. Las solicitudes se atienden primero por correo, los detalles de pickup o entrega se coordinan por respuesta y no hay horario abierto para visitas sin cita. La confirmación mantiene claros los ingredientes, la fecha y las expectativas locales.',
      whoTitle: 'Para quién es Puppy Whippies',
      whoItems: ['Familias con perros en Las Vegas que quieren probar sabores liofilizados antes de elegir favoritos.', 'Personas que quieren notas claras de ingredientes totalmente naturales antes de servir un nuevo premio.', 'Familias que planean una pequeña celebración, cumpleaños o premio especial de fin de semana para su perrito.'],
      ingredientsTitle: 'Ingredientes y recomendaciones de porción',
      ingredientsDescription: 'Mira cómo Puppy Whippies confirma ingredientes totalmente naturales, porción sugerida y notas sobre tu mascota para solicitudes de premios liofilizados en Las Vegas.',
      ingredientsEyebrow: 'Claridad de ingredientes',
      ingredientsH1: 'Ingredientes antes de recoger',
      ingredientsLede: 'Puppy Whippies mantiene clara la conversación sobre ingredientes. Cada solicitud de premios liofilizados en Las Vegas incluye notas actuales del lote antes del pickup, la entrega o el pago.',
      confirmedTitle: 'Lo que se confirma',
      confirmedItems: ['Ingredientes naturales actuales de frutas, vegetales u otros sabores usados en el lote piloto.', 'Textura liofilizada, porción sugerida y guía del lote.', 'Alergias, tamaño o preferencias de tu mascota que nos compartas.'],
      servingTitle: 'Recomendación de porción',
      servingText: 'Puppy Whippies son premios liofilizados para perros, no productos veterinarios. Supervisa a tu mascota al servirlos y consulta a tu veterinario si tu perrito tiene necesidades alimentarias especiales.',
      askBatch: 'Preguntar por un lote',
      aboutTitle: 'Acerca de Puppy Whippies',
      aboutDescription: 'Conoce Puppy Whippies, una marca de premios liofilizados en lotes piloto en Las Vegas, creada con sabores divertidos, ingredientes totalmente naturales y alegría para familias con perros.',
      aboutEyebrow: 'Nuestra historia',
      aboutH1: 'Una marca de premios liofilizados en Las Vegas',
      aboutLede: 'Puppy Whippies es un proyecto piloto para familias con perros que quieren premios liofilizados alegres con notas claras de ingredientes totalmente naturales.',
      requestTitle: 'Consultar disponibilidad de Puppy Whippies',
      requestDescription: 'Solicita disponibilidad de premios liofilizados Puppy Whippies en Las Vegas y confirma sabor, ingredientes totalmente naturales, porción sugerida, pickup o entrega por correo electrónico.',
      requestEyebrow: 'Solicitudes de premios liofilizados',
      requestLede: 'Inicia una solicitud piloto en el área de Las Vegas. No se cobra ningún pago en este sitio; primero confirmamos los detalles del lote por correo electrónico.',
      privacyTitle: 'Política de privacidad',
      privacyDescription: 'Lee cómo Puppy Whippies usa los detalles de solicitudes por correo para responder sobre disponibilidad, ingredientes y pickup o entrega en Las Vegas.',
      privacyEyebrow: 'Privacidad',
      privacyH1: 'Política de privacidad',
      privacyLede: 'Puppy Whippies usa los detalles de solicitud solo para responder sobre disponibilidad, ingredientes, recomendaciones de porción y opciones de pickup o entrega en Las Vegas.',
      privacySections: [
        ['Qué recopilamos', 'Cuando inicias una solicitud por correo, puedes compartir tu nombre, correo electrónico, sabor de interés, cantidad, vecindario, fecha deseada, notas de tu mascota y mensaje.'],
        ['Cómo lo usamos', 'Usamos los detalles de la solicitud para responder sobre disponibilidad de Puppy Whippies, ingredientes totalmente naturales, recomendaciones de porción, pickup o entrega y fecha del lote.'],
        ['Lo que no hacemos', 'No cobramos pagos en este sitio, no tenemos carrito público y no vendemos los detalles personales de las solicitudes. Para preguntas de privacidad, escribe a hello@puppywhippies.com.'],
      ],
      faqIngredientQuestion: '¿Se confirman los ingredientes de Puppy Whippies antes del pickup o la entrega?',
      faqIngredientAnswer: 'Sí. Los ingredientes totalmente naturales del lote actual y las recomendaciones de porción se confirman por correo electrónico antes del pickup, la entrega o el pago.',
      faqVetQuestion: '¿Puppy Whippies son productos veterinarios?',
      faqVetAnswer: 'No. Puppy Whippies son premios para perros, no productos veterinarios. Las familias deben supervisar al servirlos y compartir alergias o necesidades alimentarias antes de pedir un lote.',
      localBusinessDescription: 'Puppy Whippies ofrece solicitudes piloto en el área de Las Vegas para premios liofilizados en lotes pequeños hechos con ingredientes totalmente naturales.',
    },
  },
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return isSpanishPath(window.location.pathname) ? 'es' : 'en'
  })

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  useEffect(() => {
    const onNavigate = () => {
      const nextLanguage = isSpanishPath(window.location.pathname) ? 'es' : 'en'
      setLanguageState(nextLanguage)
      localStorage.setItem(STORAGE_KEY, nextLanguage)
    }
    window.addEventListener('popstate', onNavigate)
    window.addEventListener('puppywhippies:navigate', onNavigate)
    return () => {
      window.removeEventListener('popstate', onNavigate)
      window.removeEventListener('puppywhippies:navigate', onNavigate)
    }
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    const languages = navigator.languages?.length ? navigator.languages : [navigator.language]
    const shouldUseSpanish = saved === 'es' || (!saved && languages.some(isSpanish))

    if (shouldUseSpanish && window.location.pathname === '/') {
      navigateToLanguage('es')
      setLanguageState('es')
      localStorage.setItem(STORAGE_KEY, 'es')
    }
  }, [])

  const value = useMemo(() => ({
    language,
    isSpanish: language === 'es',
    setLanguage: nextLanguage => {
      const safeLanguage = nextLanguage === 'es' ? 'es' : 'en'
      navigateToLanguage(safeLanguage)
      setLanguageState(safeLanguage)
      localStorage.setItem(STORAGE_KEY, safeLanguage)
    },
    toggleLanguage: () => {
      const nextLanguage = language === 'es' ? 'en' : 'es'
      navigateToLanguage(nextLanguage)
      setLanguageState(nextLanguage)
      localStorage.setItem(STORAGE_KEY, nextLanguage)
    },
    href: path => {
      if (language !== 'es') return path
      if (path === '/') return '/es/'
      return `/es${path}`
    },
    c: copy[language],
  }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('useLanguage must be used within LanguageProvider')
  return value
}
