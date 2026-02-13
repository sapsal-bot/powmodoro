
// data/praiseData.ts

const intensifiers = [
  "UNBELIEVABLE!", "PHENOMENAL!", "GALACTIC!", "MIND-BLOWING!", "LEGENDARY!",
  "SUPERSONIC!", "COSMIC!", "TRANSCENDENT!", "EPIC!", "DAZZLING!",
  "MEGA-AWESOME!", "ULTRA-FANTASTIC!", "GLORIOUS!", "TRIUMPHANT!", "BRILLIANT!",
  "SPECTACULAR!", "ASTOUNDING!", "INCREDIBLE!", "MAGNIFICENT!", "REMARKABLE!",
  "EXTRAORDINARY!", "RESPLENDENT!", "SUBLIME!", "MAJESTIC!", "WONDERFUL!",
  "FANTASTIC!", "MARVELOUS!", "STUPENDOUS!", "PRODIGIOUS!", "SUPERB!",
  "EXQUISITE!", "OPTIMAL!", "PEAK PERFORMANCE!", "UNMATCHED!", "BREATHTAKING!",
  "IMPRESSIVE!", "RADIANT!", "STELLAR!", "AWE-INSPIRING!", "UNFLAPPABLE!",
  "VICTORIOUS!", "CHAMPION-LEVEL!", "MASTERFUL!", "UNYIELDING!", "SUPREME!"
];

const mainCompliments = [
  "FOCUS WAS GODLIKE!", "CONCENTRATION: MAXED OUT!", "PRODUCTIVITY LEVELS CRITICAL!",
  "YOU CONQUERED THE TIME-SPACE CONTINUUM!", "YOUR BRAIN IS A SUPERNOVA!",
  "TASK DOMINATION COMPLETE!", "MENTAL POWER OFF THE CHARTS!", "WILLPOWER UNLEASHED!",
  "YOU ARE THE MASTER OF MOMENTS!", "ATTENTION SPAN: INFINITE!",
  "GOALS DEFEATED WITH EASE!", "MISSION ACCOMPLISHED, CHAMPION!", "UNSTOPPABLE FORCE OF NATURE!",
  "THE UNIVERSE ADMIRES YOUR FOCUS!", "ABSOLUTE GENIUS AT WORK!",
  "YOUR DEDICATION SHINES BRIGHT!", "FOCUS SO SHARP, IT CUTS THROUGH DISTRACTION!",
  "PRODUCTIVITY SOARING BEYOND LIMITS!", "YOU'VE TAPPED INTO UNLIMITED POTENTIAL!",
  "EVERY SECOND WAS MASTERFULLY UTILIZED!", "THE TASK STOOD NO CHANCE AGAINST YOU!",
  "YOUR MENTAL FORTITUDE IS UNBREAKABLE!", "A TITAN OF CONCENTRATION!",
  "COMMANDER OF YOUR OWN TIME!", "EACH MOMENT, A STEP TOWARDS GREATNESS!",
  "DISTRACTIONS EVAPORATED IN YOUR PRESENCE!", "THE SYMPHONY OF YOUR FOCUS WAS PERFECT!",
  "A BEACON OF UNDIVIDED ATTENTION!", "YOUR INNER DRIVE IS UNCONTAINABLE!",
  "YOU'VE REACHED A NEW ZENITH OF EFFICIENCY!", "YOUR WILL IS IRON, YOUR FOCUS UNWAVERING!",
  "THE FLOW STATE WAS YOURS TO COMMAND!", "EFFORTLESSLY PRODUCTIVE, BEYOND BELIEF!",
  "A TRUE ARCHITECT OF YOUR OWN SUCCESS!", "MASTER OF THE MIND, VICTOR OF THE CLOCK!",
  "YOU'VE UNFURLED THE BANNER OF ACHIEVEMENT!", "YOUR WORK ETHIC IS A LEGEND IN THE MAKING!",
  "THE ZONES OF FOCUS ARE YOUR DOMAIN!", "UNLOCKING NEW LEVELS OF COGNITIVE POWER!",
  "EVERY CHALLENGE MET WITH UNYIELDING RESOLVE!", "YOU ARE THE EPITOME OF PRODUCTIVE ENERGY!",
  "THE ART OF CONCENTRATION, PERFECTED!", "A MARVEL OF MENTAL DISCIPLINE!",
  "THE UNIVERSE ALIGNS WITH YOUR INTENT!", "YOU ARE A FORCE TO BE RECKONED WITH!"
];

const emotionalTags = [
  "🎉🚀🔥", "✨🌟💫", "🎊🥳🏆", "💥💯🏅", "💖🤩🎶",
  "👑✨🌟", "🐱‍👤🚀🌈", "💎💡📈", "🥇🤩🥳", "🌟💪🥳",
  "🎇🎆🌠", "🤩🥳💫", "💯🎉✨", "🚀🏅🏆", "🌟🌈🔥"
];

// New arrays for more complex praise generation
const descriptivePhrases = [
  "Amidst all distractions and challenges,",
  "With unwavering resolve and laser-like precision,",
  "Confronting the task head-on and dominating it,",
  "Through sheer force of will and mental fortitude,",
  "Ignoring all external noise and internal chatter,",
  "Embracing the deep work and conquering the clock,",
  "Demonstrating unparalleled commitment to the moment,",
  "Channeling all energy into absolute productivity,",
  "Breaking through mental barriers with graceful ease,",
  "Performing with an intensity that inspires awe,"
];

const concludingStatements = [
  "Truly a masterclass in concentration and efficiency!",
  "A shining example for us all to aspire to!",
  "Your greatness is undeniable, celebrate this victory!",
  "This triumph will be etched in the annals of productivity!",
  "Go forth and bask in the glory of your focus!",
  "The universe itself applauds your magnificent effort!",
  "You've not just finished, you've excelled beyond measure!",
  "What an incredible display of focus and determination!",
  "Your consistent effort is building an empire of success!",
  "Remember this feeling of accomplishment, you earned it!"
];

const getRandomElement = (arr: string[]): string => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const generateLocalPraise = (sessionNumber: number): string => {
  const intensifier1 = getRandomElement(intensifiers).replace("!", "");
  const intensifier2 = getRandomElement(intensifiers).replace("!", "");
  const mainCompliment1 = getRandomElement(mainCompliments).replace("!", "");
  const mainCompliment2 = getRandomElement(mainCompliments).replace("!", "");
  const descriptivePhrase = getRandomElement(descriptivePhrases);
  const concludingStatement = getRandomElement(concludingStatements);
  const emotionalTag = getRandomElement(emotionalTags);

  const patterns = [
    `${intensifier1.toUpperCase()}! SESSION #${sessionNumber} WAS NOTHING SHORT OF ${intensifier2.toUpperCase()}! ${descriptivePhrase} your ${mainCompliment1.toLowerCase()} and ${mainCompliment2.toLowerCase()}. ${concludingStatement} ${emotionalTag}`,
    `FOR SESSION #${sessionNumber}: ${intensifier1.toUpperCase()}! You didn't just focus, you ABSOLUTELY ${mainCompliment1.toLowerCase().replace("you ", "").replace("your ", "")}. ${descriptivePhrase.replace(",", "")}, you've now achieved a level of focus that is truly ${intensifier2.toLowerCase().replace("!", "")}! ${concludingStatement} ${emotionalTag}`,
    `YOUR FOCUS FOR SESSION #${sessionNumber} WAS ${intensifier1.toUpperCase()} AND ${intensifier2.toUpperCase()}! Indeed, ${descriptivePhrase.toLowerCase()} ${mainCompliment1.toLowerCase()}. ${concludingStatement} ${emotionalTag}`,
    `${descriptivePhrase} you have completed SESSION #${sessionNumber} with ${intensifier1.toLowerCase()} determination! Your ${mainCompliment1.toLowerCase()} is truly ${intensifier2.toLowerCase().replace("!", "")}. ${concludingStatement} ${emotionalTag}`,
    `SESSION #${sessionNumber} complete! What an ${intensifier1.toLowerCase().replace("!", "")} display! ${mainCompliment1.replace("!", "")} so incredibly that ${descriptivePhrase.toLowerCase()} you rose above all to become ${intensifier2.toLowerCase().replace("!", "")} in your task. ${concludingStatement} ${emotionalTag}`
  ];

  return getRandomElement(patterns);
};
