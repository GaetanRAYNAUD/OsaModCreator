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
        'download': 'Download',
        'or': 'or',
        'error': 'Error',
        'unsupported': {
          'title': '🚨 Browser not compatible',
          'browser1': 'Your browser does not support access to your local files.',
          'browser2': 'Try with an other browser.',
        },
        'create': {
          'title': 'How to Create a Mod?',
          'desc': 'Create your mod before you can modify it.',
          'step1': '1. Open the Europa Universalis IV launcher.',
          'step2': '2. Go to the "All installed mods" tab and click on "Upload mod".',
          'step3': '3. Click on "Create a mod".',
          'step4': '4. Fill in the mod details: Name, Game Version, Target Folder.',
          'step5': '5. Confirm the creation.',
          'step6': '6. Once done, return to the homepage to manage your mods.',
          'return_home': 'Return to Homepage',
        },
        'select': {
          'title': 'You already have a mod?',
          'desc': 'Select an existing mod to modify.',
          'select': 'Select your mod',
          'step1': 'Mods are located in your Documents folder under ',
          'step2': 'Paradox Interactive/Europa Universalis IV/mod',
          'error': {
            'EMPTY': 'The folder is empty. Please try again.',
            'NO_DESCRIPTOR': 'No descriptor.mod found in this folder, are you sure you selected a mod folder ?',
          },
        },
        'routes': {
          'mod': 'mod',
          'create_mod': 'create-a-mod',
        },
        'category': {
          'main': {
            'title': 'Mod',
            'descriptor': {
              'title': 'Description',
              'desc': 'Mod description, like name, tags, ect..',
            },
          },
          'common': {
            'title': 'Miscellaneous',
            'advisors': {
              'title': 'Advisors',
            },
            'countries': {
              'title': 'Countries',
            },
            'events': {
              'title': 'Events',
            },
            'decisions': {
              'title': 'Decisions',
            },
            'missions': {
              'title': 'Missions',
            },
            'technologies': {
              'title': 'Technologies',
            },
            'units': {
              'title': 'Units',
            },
            'institutions': {
              'title': 'Institutions',
            },
          },
          'economy': {
            'title': 'Economy',
            'buildings': {
              'title': 'Buildings',
            },
            'trade_goods': {
              'title': 'Trade goods',
            },
            'prices': {
              'title': 'Trade goods prices',
            },
            'great_projects': {
              'title': 'Great projects',
            },
            'trade_nodes': {
              'title': 'Trade nodes',
            },
            'trade_companies': {
              'title': 'Trade companies',
            },
            'colonial_regions': {
              'title': 'Colonial regions',
            },
          },
          'government': {
            'title': 'Government',
            'cultures': {
              'title': 'Cultures',
            },
          },
          'diplomacy': {
            'title': 'Diplomacy',
          },
          'religion': {
            'title': 'Religion',
          },
          'history': {
            'title': 'History',
            'country': {
              'title': 'Countries',
            },
            'province': {
              'title': 'Provinces',
            },
            'advisor': {
              'title': 'Advisors',
            },
            'war': {
              'title': 'Wars',
            },
            'diplomacy': {
              'title': 'Diplomacy',
            },
          },
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
          'create_step1': '1. Ouvrez le launcher de Europa Universalis IV.',
          'create_step2': '2. Allez dans l\'onglet "Tous les mods installés" et cliquez sur "Mettre en ligne un mod".',
          'create_step3': '3. Cliquez sur "Créer un mod".',
          'create_step4': '4. Remplissez les informations du mod : Nom, Version du jeu, Dossier cible.',
          'create_step5': '5. Validez la création.',
          'create_step6': '6. Une fois terminé, vous pouvez revenir à l\'accueil pour sélectionner le mod.',
          'return_home': 'Retour à l\'accueil',
        },
        'select_mod': 'Vous avez déjà un mod ?',
        'select_mod_desc': 'Sélectionnez un mod existant pour le modifier.',
        'routes': {
          'select_mod': 'choisir-mod',
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
