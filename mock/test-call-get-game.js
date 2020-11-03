export default {
    gifts: [
        {
            giftID: 'g0',
            type: 'lottery',
            title: '(a 33 points)<br>Tirage au sort pour gagner deux billets pour New-York!',
            description: "DESCRIPTION: Badge d'honneur de 1er niveau.",
            imageURL: 'https://cdn.rts.ch/rtschallengeassets/gifts/WF/Cadeau2%402x.jpg',
            locked: true,
            message: 'Ce cadeau est verouillé, il vous faut plus de points!'
        },
        {
            giftID: 'g1',
            type: null,
            title: '(a 33 points)<br>Un gift en plus aussi à 33 points pour voir ce qui se passe quand on débloque deux gifts à la fois!!',
            description: "DESCRIPTION: Badge d'honneur de 1er niveau.",
            imageURL: 'https://cdn.rts.ch/rtschallengeassets/gifts/WF/Cadeau2%402x.jpg',
            locked: true,
            message: 'Ce cadeau est verouillé, il vous faut plus de points!'
        }
    ],
    gameStats: {
        totalChallengesCount: 32,
        availableChallengesCount: 32

    },
    uiElements: {
        successChunk: '0 réussis',
        sumChunk: '<strong>0</strong> défis joués',
        finalResultScoreChunk: 'Le meilleur joueur (WF2E-7) a 3650 points!',
        agreementsChunks: null
    },
    user: {
        nickname: 'TestMan',
        avatarURL: 'https://cdn.rts.ch/rtschallengeassets/avatars/fevi-prod/fevi10.png'
    },
    event: {
        shortName: 'WF2',
        lang: 'fr',
        baseURL: 'https://web-front-v3-git-feature-global-state.rtsch.now.sh',
        promos: [
            {
                type: 'Image',
                title: null,
                description: null,
                logoURL: null,
                backgroundImageURL: 'https://cdn.rts.ch/rtschallengeassets/events/wf/StartPage-Fevi.jpg'
            },
            {
                type: 'Image',
                title: null,
                description: null,
                logoURL: null,
                backgroundImageURL: 'https://cdn.rts.ch/rtschallengeassets/events/wf/StartPage-Fevi.jpg'
            }
        ],
        startPageElements: [
            {
                layout: 'Promo',
                title: 'Promo with Title only',
                description: null,
                logoURL: null,
                backgroundImageURL: 'https://i.pinimg.com/originals/de/ff/33/deff33fa90c673e50f6c2faf1b538258.jpg'
            },
            {
                layout: 'Promo',
                title: 'Possibilité de mettre un titre en dynamique sur plusieurs lignes.',
                description: 'Possibilité de mettre un sous-titre en dynamique sur trois lignes maximum.',
                logoURL: null,
                backgroundImageURL: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Starry_Night_Over_the_Rhone.jpg'
            }
        ],
        theme: {
            ID: 'WF2',
            backgroundImageURL: 'https://i.pinimg.com/originals/b0/28/a2/b028a2493053bcd5537605a92d15593e.jpg'

        },
        timeControl: {
            isStartable: true
        },
        translation: {
            bravo: 'Bravo!',
            lireCGUText: 'Lire les conditions générales',
            startPageButtonText: 'Commencer'
        },
        uiElements: {
            successChunk: null,
            agreementsChunks: [
                "J'accepte <a href='https://www.rts.ch' target='_blank'>les conditions générales</a>",
                "J'accepte <a href='https://www.rts.ch/entreprise/a-propos/8994006-charte-de-confiance-.html' target='_blank'>la politique de protection des données</a>",
                "J'accepte de recevoir un SMS si je gagne un lot"
            ]
        }
    }
}
