module.exports = [
	{
    id: 1,
    name: 'Pizza',
    image: 'pizza.jpg',
    user_id: 1,
    introduction: 'Lorem Ipseum',
    ingredients: [
      {
        quantity: 15,
        mesure: 'cl',
        name: 'eau'
      },
      {
        quantity: 5,
        mesure: 'g',
        name: 'levure boulangère'
      },
      {
        quantity: 3,
        mesure: 'CàS',
        name: 'huile d\'olive'
      },
      {
        quantity: 250,
        mesure: 'g',
        name: 'farine'
      }
    ],
    instructions: [
      { name: 'Délayez​​ la​ ​levure​ ​dans​ l’eau.' },
      { name: 'Versez​​ la​ ​farine​ ​dans​ un​ saladier et ​formez​ une​ ​fontaine​ (trou​ ​au​ ​milieu).' },
      { name: 'Ajoutez​ l’huile​ d’olive​ ​et​ ​le​​ mélange​ eau​ ​+ levure.​ ​Mélangez​ ​doucement​ ​le​ ​liquide​ ​ et​ ​la​ ​farine avec​ ​vos​ ​mains' },
      { name: 'Malaxez​ la​ ​pâte​ pendant​​ une​ dizaine​ ​de​ minutes​ jusqu’à​​ ce​ que​ ​la​ ​pâte​ ​soit​ ​homogène​ ​et​ se détache​ ​bien​ ​des​​ mains.' },
      { name: 'Laissez​​ reposer la​ ​pâte​ ​dans​ le​ ​saladier​ ​pendant​ ​une heure​ ​en​ couvran​t le	saladier​ ​d’un​ ​torchon.' },
      { name: 'Passer​​ l’heure,​ la​ pâte​ ​va​ ​doubler​ de​ ​volume.​ ​"Dégazer" ​la​ ​pâte​ ​en​​ frappant​​ énergiquement sur​ celle-ci.​ ​Puis,​ ​étalez​ ​la​​ pâte​ ​dans​ ​un​ plat.​ ​Préchauffez​ ​votre four​ ​à ​250°C' },
      { name: 'Enfournez​​ la​ pizza​​ dans​ ​le​ four​ ​sur​ la​​ grille​ ​inférieure​​ pendant​ 11 minutes.' }
    ],
    conclusion: 'Lorem Ipsum',
    published: true
  },
  {
    id: 2,
    name: 'Lemon curd',
    image: 'lemon_curd.png',
    user_id: 1,
    introduction: 'Lorem Ipsum',
    ingredients: [
      {
        quantity: 1,
        mesure: '',
        name: 'oeuf'
      },
      {
        quantity: 50,
        mesure: 'g',
        name: 'sucre'
      },
      {
        quantity: 1,
        mesure: '',
        name: 'citron'
      },
      {
        quantity: 20,
        mesure: 'g',
        name: 'beurre'
      }
    ],
    instructions: [
      { name: 'Dans​​ une​ ​petite​ casserole,​ fouetter​ l’oeuf​ et​​ le​ sucre.' },
      { name: 'Ajouter ​le​ ​citron​ et​​ le​ ​beurre.' },
      { name: 'Mélanger​ à ​feu​ doux​ jusqu’à​ ce​ que​ le​ mélange​ épaississe.' },
      { name: 'Passer​​ à ​la passoire​ dans​ un​ bocal.' }
    ],
    conclusion: 'Lorem Ipsum',
    published: true
  },
  {
    id: 3,
    name: 'Petits carrés aux amandes caramélisées',
    image: 'carres_amandes.jpg',
    user_id: 1,
    introduction: 'Un délicieux biscuit surmonté d\'amandes caramélisées.',
    ingredients: [
      {
        title: 'Pour le biscuit (shortbread)',
        step: [
          { 
            quantity: 115,
            mesure: 'g',
            name: 'beurre'
          },
          { 
            quantity: 50,
            mesure: 'g',
            name: 'sucre'
          },
          { 
            quantity: 175,
            mesure: 'g',
            name: 'farine'
          }
        ]
      },
      {
        title: 'Pour les amandes caramélisées',
        step: [
          { 
            quantity: 1,
            mesure: 'CàS',
            name: 'crème fraiche'
          },
          { 
            quantity: 1,
            mesure: 'CàS',
            name: 'miel'
          },
          { 
            quantity: 75,
            mesure: 'g',
            name: 'beurre'
          },
          { 
            quantity: 100,
            mesure: 'g',
            name: 'sucre'
          },
          { 
            quantity: 125,
            mesure: 'g',
            name: 'amandes effilées'
          }
        ]
      },
    ],
    instructions: [
      {
        title: 'Préparation du biscuit',
        step: [
          { name: 'Préchauffez le four à 180°C.' },
          { name: 'Mélangez​ ​le​​ beurre,​ le​​ sucre​ et​ la​ farine.​ Puis​ bien​ malaxer​ ​(avec​ ​les​ mains)​ ​la​ ​pâte​ ​et​ ​en faire​ ​une​ ​boule.' },
          { name: 'Posez​ ​la​ pâte​​ au​​ fond​ d’un​ moule​ ​chemisé​ ​beurré​ ​et​ fariné​ ​(c’est​ mieux​ de​ ​ mettre​ du​ ​papier de​ ​cuisson​ à ​la​ ​place...).​ ​Étalez​ ​bien​ ​la​ ​pâte​ ​à ​l’aide​ ​de​ ​votre​ ​poignet.' },
          { name: 'Enfournez pour 15 min.' }
        ]
      },
      {
        title: 'Préparation des amandes caramélisées',
        step: [
          { name: '​Dans​​ une​ casserole,​ faites​ chauffer​ ​la​ ​crème​ ​fraîche,​ le​ ​miel,​ ​le​ ​beurre​ ​et​ ​le​ ​sucre​ à ​feu doux.' },
          { name: '​Dès​​ que le​ mélange​ ​est​ lisse,​ ajoutez​ ​les​ amandes​ ​effilées.' },
          { name: 'Répartissez​ ​le​​ mélange​ sur​ le​ ​biscuit​ ​et​​ remettez​ ​au​ ​four​ ​20​ minutes​ à 180°C​ ​(jusqu’à​ ​ce​ ​que les​​ amandes​ ​soient​ ​dorées).' },
        ]
      }
    ],
    conclusion: 'Laissez refroidir le moule à température ambiante puis découpez en petits carrés de 5 cm et dégustez :)',
    published: true
  },
  {
    id: 4,
    name: 'Pancakes',
    image: 'pancakes.jpg',
    user_id: 2,
    introduction: 'Pour des brunchs ensoleillés',
    ingredients: [
      {
        quantity: 200,
        mesure: 'g',
        name: 'farine'
      },
      {
        quantity: 1,
        mesure: 'sachet',
        name: 'levure chimique'
      },
      {
        quantity: 30,
        mesure: 'g',
        name: 'sucre de canne'
      },
      {
        quantity: 2,
        mesure: '',
        name: 'oeufs'
      },
      {
        quantity: 50,
        mesure: 'g',
        name: 'beurre'
      },
      {
        quantity: 30,
        mesure: 'cl',
        name: 'lait'
      },
      {
        quantity: 1,
        mesure: 'sachet',
        name: 'sucre vanillé'
      }
    ],
    instructions: [
      { name: 'Dans un saladier, mélangez la farine, la levure, le sel et le sucre.' },
      { name: 'Dans une casserole ou au micro-ondes, faites fondre le beurre et l’ajouter.' },
      { name: 'Dans un bol, battez les oeufs dans le lait et mélangez petit à petit à la farine.' },
      { name: 'Faites chauffer une petite poêle avec de la matière grasse et versez une louche de pâte.' },
      { name: 'Laissez la pâte cuire et retournez-la une fois que se forment des petites bulles.' }
    ],
    conclusion: 'Ajoutez de la garniture sur vos pancakes tièdes (confiture, pâte à tartiner, lemon curd, etc...)',
    published: true
  },
  {
    id: 5,
    name: 'Flan parisien',
    image: 'flans.jpg',
    user_id: 2,
    introduction: 'Aussi bon et moins chez que chez le boulanger',
    ingredients: [
      {
        quantity: 1,
        mesure: '',
        name: 'pâte brisée ou sablée'
      },
      {
        quantity: 80,
        mesure: 'g',
        name: 'Maizena'
      },
      {
        quantity: 150,
        mesure: 'g',
        name: 'sucre'
      },
      {
        quantity: 2,
        mesure: 'CàS',
        name: 'arôme de vanille'
      },
      {
        quantity: 2,
        mesure: '',
        name: 'oeufs'
      },
      {
        quantity: 75,
        mesure: 'cl',
        name: 'lait'
      }
    ],
    instructions: [
      { name: 'Etalez la pâte brisée dans un moule à tarte (24 / 26 cm de diamêtre.' },
      { name: 'Mélangez dans une casserole, la Maizena, le sucre, les oeufs ajoutés un à un et le lait ajouté au fur et à mesure. Remuez sans arrêt à feu doux.' },
      { name: 'Retirez la casserole dès la 1ère ébullition et versez ce mélange sur la pâte à tarte.' },
      { name: 'Préchauffez votre four à 200°C (le temps que le flan refroidisser à température ambiante).' },
      { name: 'Enfournez le flan à 200°C pendant 40 min.' }
    ],
    conclusion: 'Vous pouvez ajoutez 200 g de chocolat patissier lors de la préparation pour varier les plaisirs...',
    published: true
  },
  {
    id: 6,
    name: 'Moelleux au chocolat',
    image: 'moelleux_chocolat.jpg',
    user_id: 2,
    introduction: 'Rapide et terriblement simple à faire',
    ingredients: [
      {
        quantity: 200,
        mesure: 'g',
        name: 'chocolat'
      },
      {
        quantity: 4,
        mesure: '',
        name: 'oeufs'
      },
      {
        quantity: 125,
        mesure: 'g',
        name: 'beurre'
      },
      {
        quantity: 40,
        mesure: 'g',
        name: 'Maizena'
      },
      {
        quantity: 125,
        mesure: 'g',
        name: 'sucre'
      }
    ],
    instructions: [
      { name: 'Préchauffez le four à 180°C.'},
      { name: 'Faire fondre le chocolat et le beurre (au bain marie ou au micro onde).' },
      { name: 'Dans un saladier, battre les oeufs avec le sucre jusqu\'a ce que le mélange devienne mousseux.' },
      { name: 'Ajouter la Maizena, le chocolat et le beurre fondus.' },
      { name: 'Beurrez ou chemisez avec du papier sulfurisé le moule à manquer et y verser la pâte.' },
      { name: 'Enfournez à 180°C pendant 15 / 20 min (surveillez le temps de cuisson).' }
    ],
    conclusion: 'A déguster avec ou sans crème anglaise.',
    published: true
  },
  {
    id: 7,
    name: 'Far breton',
    image: 'far_breton.jpg',
    user_id: 2,
    introduction: 'Important, il vous faudra un moule à haut rebord (avec fond amovible, c\'est le top) car la pâte sera liquide (pâte à crêpes).',
    ingredients: [
      {
        quantity: 3,
        mesure: '',
        name: 'oeufs'
      },
      {
        quantity: 70,
        mesure: 'g',
        name: 'sucre'
      },
      {
        quantity: 130,
        mesure: 'g',
        name: 'farine'
      },
      {
        quantity: 1,
        mesure: 'CàS',
        name: 'arôme de vanille'
      },
      {
        quantity: 0.5,
        mesure: '',
        name: 'lait'
      },
      {
        quantity: 25,
        mesure: 'g',
        name: 'beurre demi sel'
      }
    ],
    instructions: [
      { name: 'Préchauffez le four à 200°C avec le moule à haut rebord dedans.' },
      { name: 'Dans un saladier, à l\'aide d\'un fouet, battez le oeufs et le sucre énergiquement.' },
      { name: 'Ajoutez la farine en plusieurs fois (afin d\'eviter l\'apparition de grumeaux).' },
      { name: 'Délayez petit à petit le lait.' },
      { name: 'Ajoutez la vanille.' },
      { name: 'Une fois le four préchauffé, retirez le moule du foule puis versez le beurre jusq\'à ce qu\'il fonde complétement. Ajoutez la pâte et enfournez 35 min.' }
    ],
    conclusion: 'Vous pouvez remplacez la vanille par une cuillère de cannelle',
    published: true
  },
  {
    id: 8,
    name: 'Pain d\'épices à l\'anis',
    image: 'pain_depices.jpg',
    user_id: 1,
    introduction: 'Réconfortant en période d\'hiver. A préparer avec du miel de forêt ou de montagne pour son gout fort et sa couleur ambre',
    ingredients: [
      {
        quantity: 1,
        mesure: 'tasse à café',
        name: 'sucre roux'
      },
      {
        quantity: 1,
        mesure: 'tasse à café',
        name: 'miel de forêt'
      },
      {
        quantity: 1,
        mesure: 'tasse à café',
        name: 'lait'
      },
      {
        quantity: 1,
        mesure: 'noix',
        name: 'beurre'
      },
      {
        quantity: 125,
        mesure: 'g',
        name: 'farine'
      },
      {
        quantity: 125,
        mesure: 'g',
        name: 'farine de seigle'
      },
      {
        quantity: 0.5,
        mesure: 'sachet',
        name: 'levure chimique'
      },
      {
        quantity: 1,
        mesure: 'CàC',
        name: 'bicarbonate de sodium'
      },
      {
        quantity: 1,
        mesure: 'CàC',
        name: 'poudre d\'anis'
      },
      {
        quantity: 1,
        mesure: '',
        name: 'oeuf'
      }
    ],
    instructions: [
      { name: 'Préchauffez le four à 150°C.' },
      { name: 'Dans une casserole, chauffez doucement (sans bouillir), miel, sucre, lait et la noix de beurre. Réservez.' },
      { name: 'Dans un saladier, mélangez farines, poudres et oeuf.' },
      { name: 'Ajoutez le contenu de la casserole dans le saladier et mélangez bien.' },
      { name: 'Beurrez tout l\'intérieur d\'un moule à cake. '},
      { name: 'Versez le contenu du mélange dans un moule à cake.' },
      { name: 'Enfournez le moule à 150°C pendant 40 min.' }
    ],
    conclusion: 'Vous pouvez remplacez la poudre d\'anis par un mélange de 4 épices spéciales pain d\'épice et en y ajoutant un cuillère de cannelle.',
    published: true
  },
  {
    id: 9,
    name: 'Smoothie​ à la​ banane',
    image: 'smoothie_banane.jpg',
    user_id: 1,
    introduction: 'Lorem Ipseum',
    ingredients: [
      {
        quantity: 1,
        mesure: '',
        name: 'banane'
      },
      {
        quantity: 25,
        mesure: 'cl',
        name: 'lait'
      },
      {
        quantity: 4,
        mesure: '',
        name: 'glaçons'
      },
      {
        quantity: 1,
        mesure: 'CàC',
        name: 'canelle'
      }
    ],
    instructions: [
      { name: 'Verser le lait dans le mixeur' },
      { name: 'Couper en fines rondelles la banane dans le mixeur ainsi que la canelle.' },
      { name: 'Mixer quelques secondes par intermitence pour éviter la surchauffe.' }
    ],
    conclusion: 'Se boit très frais',
    published: true
  },
  {
    id: 10,
    name: 'Quatres quarts',
    image: 'quatre-quarts-de-bretagne.png',
    user_id: 3,
    introduction: 'Lorem Ipsum',
    ingredients: [
      {
        quantity: 3,
        mesure: '',
        name: 'oeufs'
      },
      {
        quantity: 0,
        mesure: '',
        name: 'beurre demi-salé'
      },
      {
        quantity: 0,
        mesure: '',
        name: 'sucre'
      },
      {
        quantity: 0,
        mesure: '',
        name: 'farine'
      },
      {
        quantity: 1,
        mesure: 'sachet',
        name: 'levure'
      },
      {
        quantity: 1,
        mesure: 'CàS',
        name: 'vanille'
      }
    ],
    instructions: [
      { name: 'Pesez​ ​l’ensemble​​ des​ oeufs​ (environ 180​ grammes​ pour​ des oeufs​ moyens).​ Enlevez​ 30 grammes​​ pour​ ​le​ beurre​ ​et​​ le​​ sucre.' },
      { name: 'Dans​ un​ ​saladier,​ ​mélangez​ ​farine,​ poudres​ ​et​ ​l’oeuf.' },
      { name: 'Versez​ ​le​​ mélange​ ​dans​ ​un​ ​moule​ ​à ​cake.' },
      { name: '​Préchauffez​ ​le​ ​four​ ​à ​150°C.'},
      { name: 'Enfournez​ ​le​ moule​ ​pour​ 45​ ​minutes.' }
    ],
    conclusion: 'Vous pouvez changer la vanille par de la fleur d\'oranger, des zestes de citron, d\'orange, etc...',
    published: true
  }
]