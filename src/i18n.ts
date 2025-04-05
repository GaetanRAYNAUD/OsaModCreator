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
        'save': 'Save',
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
          'descriptor': 'descriptor',
          'common': {
            'advisors': 'common/advisors',
            'countries': 'common/countries',
            'events': 'common/events',
            'decisions': 'common/decisions',
            'missions': 'common/missions',
            'technologies': 'common/technologies',
            'units': 'common/units',
            'institutions': 'common/institutions',
          },
          'economy': {
            'buildings': 'economy/buildings',
            'trade_goods': 'economy/trade_goods',
            'prices': 'economy/prices',
            'great_projects': 'economy/great_projects',
            'trade_nodes': 'economy/trade_nodes',
            'trade_companies': 'economy/trade_companies',
            'colonial_regions': 'economy/colonial_regions',
          },
          'government': {
            'governments': 'government/governments',
            'government_reforms': 'government/government_reforms',
            'cultures': 'government/cultures',
            'ideas': 'government/ideas',
            'policies': 'government/policies',
            'custom_ideas': 'government/custom_ideas',
            'disasters': 'government/disasters',
            'estates': 'government/estates',
            'factions': 'government/factions',
            'parliament_issues': 'government/parliament_issues',
            'parliament_bribes': 'government/parliament_bribes',
          },
          'diplomacy': {
            'cb': 'diplomacy/cb',
            'war_goals': 'diplomacy/war_goals',
            'diplomatic_actions': 'diplomacy/diplomatic_actions',
          },
          'religion': {
            'religions': 'religion/religions',
            'church_aspects': 'religion/church_aspects',
            'fervor': 'religion/fervor',
            'fetishist_cults': 'religion/fetishist_cults',
            'personal_deities': 'religion/personal_deities',
            'religious_reforms': 'religion/religious_reforms',
          },
          'history': {
            'bookmarks': 'history/bookmarks',
            'countries': 'history/countries',
            'provinces': 'history/provinces',
            'advisors': 'history/advisors',
            'diplomacy': 'history/diplomacy',
            'wars': 'history/wars',
          },
        },
        'category': {
          'main': {
            'title': 'Mod',
            'descriptor': {
              'title': 'Description',
              'desc': 'Mod description, name, tags, ect..',
            },
          },
          'common': {
            'title': 'Miscellaneous',
            'advisors': {
              'title': 'Advisors',
              'desc': 'Advisors types',
            },
            'countries': {
              'title': 'Countries',
              'desc': 'List of countries with misc information, rulers names, units names, etc..',
            },
            'events': {
              'title': 'Events',
              'desc': 'List of events, conditions, effects, etc..',
            },
            'decisions': {
              'title': 'Decisions',
              'desc': 'List of decisions, conditions, preconditions, effects, etc..',
            },
            'missions': {
              'title': 'Missions',
              'desc': 'List of missions, conditions, effects, etc..',
            },
            'technologies': {
              'title': 'Technologies',
              'desc': 'Technologies levels and the bonuses they gives',
            },
            'units': {
              'title': 'Units',
              'desc': 'Units types, stats, technologies groups',
            },
            'institutions': {
              'title': 'Institutions',
              'desc': 'Institutions, bonuses, dates, etc..',
            },
          },
          'economy': {
            'title': 'Economy',
            'buildings': {
              'title': 'Buildings',
              'desc': 'List of buildings with cost and effects',
            },
            'trade_goods': {
              'title': 'Trade goods',
              'desc': 'List of trades goods and trading in bonuses',
            },
            'prices': {
              'title': 'Trade goods prices',
              'desc': 'Prices of trade goods',
            },
            'great_projects': {
              'title': 'Great projects',
              'desc': 'Great projects with cost, effects and location',
            },
            'trade_nodes': {
              'title': 'Trade nodes',
              'desc': 'Trade nodes with connections between them and province members',
            },
            'trade_companies': {
              'title': 'Trade companies',
              'desc': 'Trade companies and province members',
            },
            'colonial_regions': {
              'title': 'Colonial regions',
              'desc': 'Colonials regions with province members and properties of the provinces',
            },
          },
          'government': {
            'title': 'Government',
            'governments': {
              'title': 'Governments',
              'desc': 'Governments types',
            },
            'government_reforms': {
              'title': 'Governments reforms',
              'desc': 'Governments reforms',
            },
            'cultures': {
              'title': 'Cultures',
              'desc': 'Cultures and cultural groups',
            },
            'ideas': {
              'title': 'Ideas',
              'desc': 'Idea groups and national ideas',
            },
            'policies': {
              'title': 'Policies',
              'desc': 'Policies types and ideas groups required',
            },
            'custom_ideas': {
              'title': 'Custom ideas',
              'desc': 'Idea available for custom countries',
            },
            'disasters': {
              'title': 'Disasters',
              'desc': 'Disasters with requirements and effects',
            },
            'estates': {
              'title': 'Estates',
              'desc': 'List of estates and privileges',
            },
            'factions': {
              'title': 'Factions',
              'desc': 'Factions for eligible governments',
            },
            'parliament_issues': {
              'title': 'Parliament Issues',
              'desc': 'List of parliament issues possible',
            },
            'parliament_bribes': {
              'title': 'Parliament Bribes',
              'desc': 'List of parliament bribes possible to help passing issues',
            },
          },
          'diplomacy': {
            'title': 'Diplomacy',
            'cb': {
              'title': 'Casus Bellis',
              'desc': '',
            },
            'war_goals': {
              'title': 'War goals',
              'desc': 'War goals for Casus Bellis',
            },
            'diplomatic_actions': {
              'title': 'Diplomatic actions',
              'desc': 'List of possible diplomatic actions and there conditions',
            },
          },
          'religion': {
            'title': 'Religion',
            'religions': {
              'title': 'Religions',
              'desc': 'Religions and religion groups',
            },
            'church_aspects': {
              'title': 'Church aspects',
              'desc': 'Church aspects for eligible religions',
            },
            'fervor': {
              'title': 'Fervor',
              'desc': 'Fervor for eligible religions',
            },
            'fetishist_cults': {
              'title': 'Fetishist cults',
              'desc': 'Fetishist cults for eligible religions',
            },
            'personal_deities': {
              'title': 'Personal deities',
              'desc': 'Personal deities for eligible religions',
            },
            'religious_reforms': {
              'title': 'Religious reforms',
              'desc': 'Religious reforms for eligible religions',
            },
          },
          'history': {
            'title': 'History',
            'bookmarks': {
              'title': 'Bookmarks',
              'desc': 'Bookmarks that are available at the start of a game with suggested countries',
            },
            'countries': {
              'title': 'Countries',
              'desc': 'History of countries with technological group, religion, culture, etc..',
            },
            'provinces': {
              'title': 'Provinces',
              'desc': 'History of provinces, who owned it, the religion, culture, etc..',
            },
            'advisors': {
              'title': 'Advisors',
              'desc': 'Historical advisors',
            },
            'wars': {
              'title': 'Wars',
              'desc': 'Historical wars with dates, attackers and defenders',
            },
            'diplomacy': {
              'title': 'Diplomacy',
              'desc': 'History of alliances, vassals, etc..',
            },
          },
        },
        'input': {
          'descriptor': {
            'name': 'Name',
            'version': 'Mod version',
            'supportedVersion': 'Supported version',
            'supportedVersion.tooltip': 'Must be in form: v1.xx, with xx the version of the game supported. Can be a * if support any sub version.',
            'tags': 'Tags',
            'replacePath': 'Paths to replace',
            'replacePath.tooltip': 'Game folders than you want to completely replace with the mod\'s folder.',
            'picture': 'Picture',
            'dependencies': 'Dependencies',
            'dependencies.tooltip': 'List of mod names to tell the game to load before this one.',
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
