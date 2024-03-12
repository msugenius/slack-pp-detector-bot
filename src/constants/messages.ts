import { randomElement } from '../utils/randomizer'

export default {
  start:
    'Привіт!\nДля того, щоб почати відстежування рупи, відправте мені команду /watch!',
  subscribingInProgress: 'Додаю цей чат у відстежувачів рупи...',
  successfullySubscribed: 'Чат було додано у список відстежувачів.',
  unsubscribingInProgress: 'Видаляю цей чат з відстежувачів рупи.',
  successfullyUnsubscribed: 'Чат було видалено зі списку відстежувачів.',
  avatarChanged: randomElement([
    'Honey wake up, new roopa avatar just dropped!',
    'Rise and shine, the dawn of a new roopa avatar is here!',
    'Attention, attention! roopa avatar has undergone a transformation!',
    'Hey there! Guess what? roopa avatar just got a makeover!',
    'Ding-dong! roopa avatar upgrade has arrived!',
    'Wakey-wakey! Time to check out revamped roopa avatar!',
    'Good morning! roopa avatar has leveled up overnight!',
    'Psst... roopa avatar has a surprise for you! Check it out!',
    `Knock-knock! Who's there? Brand new roopa avatar!`,
    'Heads up! roopa avatar is sporting a fresh new look!',
    'Alert! roopa avatar has been upgraded to the next level!',
    `Even Krivenko can't miss this! roopa avatar has been updated!`
  ]),
}
