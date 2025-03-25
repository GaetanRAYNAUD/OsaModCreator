import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        'app': {
          'title': 'OsaModCreator',
          'subtitle': 'Create and modify your own mods for EU4 easily.',
        },
        'mod': {
          'create': 'How to Create a Mod?',
          'create_desc': 'Create your mod before you can modify it.',
          "create_step1": "1. Open the Europa Universalis IV launcher.",
          "create_step2": "2. Go to the \"All installed mods\" tab and click on \"Upload mod\".",
          "create_step3": "3. Click on \"Create a mod\".",
          "create_step4": "4. Fill in the mod details: Name, Game Version, Target Folder.",
          "create_step5": "5. Confirm the creation.",
          "create_step6": "6. Once done, return to the homepage to manage your mods.",
          "return_home": "Return to Homepage",
        },
        'choose_mod': 'You already have a mod ?',
        'choose_mod_desc': 'Select an existing mod to modify.',
        'routes': {
          'choose_mod': 'choose-mod',
          'create_mod': 'create-a-mod',
        },
      },
    },
    fr: {
      translation: {
        'app': {
          'title': 'OsaModCreator',
          'subtitle': 'Créez et modifiez vos propres mods pour EU4 facilement.',
        },
        'mod': {
          'create': 'Comment créer un mod ?',
          'create_desc': 'Créer votre mod avant de pouvoir le modifier.',
          "create_step1": "1. Ouvrez le launcher de Europa Universalis IV.",
          "create_step2": "2. Allez dans l'onglet \"Tous les mods installés\" et cliquez sur \"Mettre en ligne un mod\".",
          "create_step3": "3. Cliquez sur \"Créer un mod\".",
          "create_step4": "4. Remplissez les informations du mod : Nom, Version du jeu, Dossier cible.",
          "create_step5": "5. Validez la création.",
          "create_step6": "6. Une fois terminé, vous pouvez revenir à l'accueil pour sélectionner le mod.",
          "return_home": "Retour à l'accueil"
        },
        'choose_mod': 'Vous avez déjà un mod ?',
        'choose_mod_desc': 'Sélectionnez un mod existant pour le modifier.',
        'routes': {
          'choose_mod': 'choisir-mod',
          'create_mod': 'comment-creer-mod',
        },
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
