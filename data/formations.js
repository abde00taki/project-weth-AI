// In-memory data store for formations

export const formations = [
  {
    id: '1',
    title: 'Développement Web Frontend',
    description: 'Apprenez à créer des interfaces web modernes avec HTML, CSS et JavaScript.',
    duration: '12 semaines',
    price: 2500,
    level: 'Débutant',
    category: 'Développement Web',
    image: 'img/formation-frontend.jpg',
    details: 'Cette formation complète vous permettra de maîtriser les bases du développement web frontend. Vous apprendrez à créer des sites web responsifs et interactifs en utilisant les technologies standards du web. Le programme couvre HTML5, CSS3, JavaScript ES6+, ainsi que des frameworks populaires comme Bootstrap et introduction à React.'
  },
  {
    id: '2',
    title: 'Développement Web Backend avec Node.js',
    description: 'Maîtrisez le développement backend avec Node.js et Express.',
    duration: '10 semaines',
    price: 2800,
    level: 'Intermédiaire',
    category: 'Développement Web',
    image: 'img/formation-backend.jpg',
    details: 'Cette formation intensive en développement backend avec Node.js vous permettra de créer des API RESTful robustes et des applications serveur performantes. Vous découvrirez comment utiliser Express.js, gérer les bases de données avec MongoDB, et implémenter l\'authentification et l\'autorisation. La sécurité et les bonnes pratiques seront abordées tout au long du cours.'
  },
  {
    id: '3',
    title: 'Développement Mobile avec React Native',
    description: 'Créez des applications mobiles natives pour iOS et Android avec React Native.',
    duration: '8 semaines',
    price: 3200,
    level: 'Avancé',
    category: 'Développement Mobile',
    image: 'img/formation-mobile.jpg',
    details: 'Cette formation avancée vous permettra de développer des applications mobiles multiplateformes avec React Native. Vous apprendrez à créer des interfaces utilisateur natives, à gérer l\'état de l\'application, à interagir avec les API natives des appareils et à déployer vos applications sur les stores. Des projets pratiques vous permettront de maîtriser le développement mobile moderne.'
  },
  {
    id: '4',
    title: 'UX/UI Design',
    description: 'Apprenez à concevoir des interfaces utilisateur intuitives et attrayantes.',
    duration: '6 semaines',
    price: 1800,
    level: 'Débutant à Intermédiaire',
    category: 'Design',
    image: 'img/formation-uxui.jpg',
    details: 'Cette formation en UX/UI design vous enseignera les principes fondamentaux de la conception d\'interfaces centrées sur l\'utilisateur. Vous découvrirez les méthodologies de recherche utilisateur, le prototypage, les tests d\'utilisabilité et la conception visuelle. Vous travaillerez avec des outils professionnels comme Figma et Adobe XD pour créer des maquettes et des prototypes interactifs.'
  },
  {
    id: '5',
    title: 'DevOps et CI/CD',
    description: 'Maîtrisez les pratiques DevOps et mettez en place des pipelines CI/CD efficaces.',
    duration: '9 semaines',
    price: 3500,
    level: 'Avancé',
    category: 'Infrastructure',
    image: 'img/formation-devops.jpg',
    details: 'Cette formation avancée en DevOps vous permettra d\'acquérir les compétences nécessaires pour automatiser le déploiement et la gestion des applications. Vous apprendrez à utiliser Docker, Kubernetes, Jenkins et GitLab CI pour mettre en place des pipelines d\'intégration et de déploiement continus. La surveillance, la gestion des logs et la sécurité seront également abordées.'
  }
];

// Helper functions to manage formations
export const getFormations = () => {
  return formations;
};

export const getFormationById = (id) => {
  return formations.find(formation => formation.id === id);
};

export const addFormation = (formation) => {
  // Generate an ID based on the current timestamp if none is provided
  const newFormation = {
    ...formation,
    id: formation.id || String(formations.length + 1)
  };
  formations.push(newFormation);
  return newFormation;
};

export const updateFormation = (id, updatedFormation) => {
  const index = formations.findIndex(formation => formation.id === id);
  if (index !== -1) {
    formations[index] = { ...formations[index], ...updatedFormation };
    return formations[index];
  }
  return null;
};

export const deleteFormation = (id) => {
  const index = formations.findIndex(formation => formation.id === id);
  if (index !== -1) {
    const deleted = formations.splice(index, 1);
    return deleted[0];
  }
  return null;
};