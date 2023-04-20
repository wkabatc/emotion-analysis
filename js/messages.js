const getAudienceMessages = function () {
  const messages = [
    [
      "Twoja publiczność wygląda na znudzoną na poziomie X%. Sugeruję opowiedzieć żart lub ciekawostkę.",
      "neutral",
      "min",
      0.6,
      "negative",
    ],
    [
      "Wśród publiczności panuje smutek na poziomie X%. Sugeruję opowiedzieć śmieszną anegdotę.",
      "sad",
      "min",
      0.4,
      "negative",
    ],
    [
      "Emocje publiczności są neutralne na poziomie X%. Sugeruję przestawić ciekawe dane statystyczne.",
      "neutral",
      "min",
      0.8,
      "negative",
    ],
    [
      "Rozzłościłeś swoją publiczność na poziomie X%. Obróć wypowiedź w żart.",
      "angry",
      "min",
      0.4,
      "negative",
    ],
    [
      "Dobrze Ci idzie, ponieważ Twoja prezentacja wzbudza radość wśród publiczności na poziomie X%",
      "happy",
      "min",
      0.7,
      "positive",
    ],
    [
      "Twoja publiczność jest zdegustowana na poziomie X%. Przedstaw kontrastową historię.",
      "disgusted",
      "min",
      0.35,
      "negative",
    ],
    [
      "Zaskoczyłeś swoją publiczność na poziomie X%. Sugeruję podtrzymać ciekawość publiczności.",
      "surprised",
      "min",
      0.7,
      "positive",
    ],
    [
      "Radość wśród publiczności jest na niskim poziomie X%. Przedstaw śmieszną historię.",
      "happy",
      "max",
      0.2,
      "negative",
    ],
    [
      "Zaskoczenie Twojej publiczności jest na niskim poziomie X%. Skup się na innowacyjności Twojego rozwiązania.",
      "surprised",
      "max",
      0.15,
      "negative",
    ],
    [
      "Twoja prezentacja nie wzbudza ciekawości wśród widzów. Sugeruję opowiedzieć żart.",
      "neutral",
      "min",
      0.6,
      "negative",
    ],
    [
      "Poziom złości Twojej publiczności wynosi X%. Przedstaw pozytywne informacje.",
      "angry",
      "min",
      0.5,
      "negative",
    ],
    [
      "Twoja publiczność wygląda na przestraszoną na poziomie X%. Sugeruję obrócić słowa w żart.",
      "fearful",
      "min",
      0.3,
      "negative",
    ],
    [
      "Publiczność jest obrzydzona na poziomie X%. Skup się na pozytywnych informacjach.",
      "disgusted",
      "min",
      0.35,
      "negative",
    ],
    [
      "Wzbudzasz pozytywne emocje, ponieważ wśród publiczności dominuje radość na poziomie X%.",
      "happy",
      "not valid",
      0,
      "positive",
    ],
    [
      "Wzbudzasz neutralne emocje, ponieważ wśród publiczności dominuje neutralność na poziomie X%.",
      "neutral",
      "not valid",
      0,
      "negative",
    ],
    [
      "Wzbudzasz negatywne emocje, ponieważ wśród publiczności dominuje smutek na poziomie X%.",
      "sad",
      "not valid",
      0,
      "negative",
    ],
    [
      "Wzbudzasz negatywne emocje, ponieważ wśród publiczności dominuje złość na poziomie X%.",
      "angry",
      "not valid",
      0,
      "negative",
    ],
    [
      "Wzbudzasz negatywne emocje, ponieważ wśród publiczności dominuje strach na poziomie X%.",
      "fearful",
      "not valid",
      0,
      "negative",
    ],
    [
      "Wzbudzasz negatywne emocje, ponieważ wśród publiczności dominuje obrzydzenie na poziomie X%.",
      "disgusted",
      "not valid",
      0,
      "negative",
    ],
    [
      "Wzbudzasz pozytywne emocje, ponieważ wśród publiczności dominuje zaskoczenie na poziomie X%.",
      "surprised",
      "not valid",
      0,
      "positive",
    ],
  ];
  return messages;
};

const getPresenterMessages = function () {
  const messages = [
    [
      "Wyglądasz na znudzonego na poziomie X%. Sugeruję się uśmiechnąć.",
      "neutral",
      "min",
      0.7,
      "negative",
    ],
    [
      "Poziom smutku odczytanego z Twojej twarzy wynosi X%. Sugeruję pomyśleć o czymś zabawnym.",
      "sad",
      "min",
      0.6,
      "negative",
    ],
    [
      "Twoje emocje są neutralne na poziomie X%. Sugeruję nadać większej dynamiki Twojej prezentacji.",
      "neutral",
      "min",
      0.75,
      "negative",
    ],
    [
      "Wyglądasz na rozzłoszczonego na poziomie X%. Proponuję się uspokoić.",
      "angry",
      "min",
      0.5,
      "negative",
    ],
    [
      "Radość odczytana z Twojej twarzy wynosi X%. Tak trzymaj!",
      "happy",
      "min",
      0.7,
      "positive",
    ],
    [
      "Wyglądasz na przestraszonego na poziomie X%. Sugeruję skupić się na pozytywnych informacjach.",
      "fearful",
      "min",
      0.6,
      "negative",
    ],
    [
      "Jesteś obrzydzony na poziomie X%. Skup się na pozytywnych informacjach.",
      "disgusted",
      "min",
      0.7,
      "negative",
    ],
    [
      "Poziom Twojej radości jest na niskim poziomie X%. Sugeruję opowiedzieć żart lub śmieszną historię.",
      "happy",
      "max",
      0.3,
      "negative",
    ],
    [
      "Na Twojej twarzy dominuje radość na poziomie X%.",
      "happy",
      "not valid",
      0,
      "positive",
    ],
    [
      "Na Twojej twarzy dominuje neutralność na poziomie X%.",
      "neutral",
      "not valid",
      0,
      "negative",
    ],
    [
      "Na Twojej twarzy dominuje smutek na poziomie X%. ",
      "sad",
      "not valid",
      0,
      "negative",
    ],
    [
      "Na Twojej twarzy dominuje złość na poziomie X%.",
      "angry",
      "not valid",
      0,
      "negative",
    ],
    [
      "Na Twojej twarzy dominuje strach na poziomie X%.",
      "fearful",
      "not valid",
      0,
      "negative",
    ],
    [
      "Na Twojej twarzy dominuje obrzydzenie na poziomie X%.",
      "disgusted",
      "not valid",
      0,
      "negative",
    ],
    [
      "Na Twojej twarzy dominuje zaskoczenie na poziomie X%.",
      "surprised",
      "not valid",
      0,
      "positive",
    ],
  ];
  return messages;
};

module.exports = {
  getAudienceMessages,
  getPresenterMessages,
};