// app/utils/textGenerator.ts

export function generateReadableText(wordCount = 15) {
  const syllables = [
    'sa','ri','ga','ma','pa','dha','ni','sa'
  ];

  const englishWords = [
    'the','and','but','so','it','is','in','on','at','for','with','as','by','to','of','or','an','a',
    'this','that','these','those','he','she','they','we','you','I','my','your','his','her','its',
    'not','all','any','some','one','two','three','first','last','new','old','good','bad','big',
    'small','happy','sad','fast','slow','hot','cold','yes','no' ,'if','when','where','why','how',
    'can','will','just','about','more','most','other','than','then','there','here','now','after',
    'before','over','under','again','once','ever','never','always','sometimes','often','very','really',
    'much','little','few','many','each','every','such','own','same','different','important','interesting',
    'easy','difficult','possible','impossible','likely','unlikely','sure','certain','clear','true',
    'false','right','wrong','left','long','short','high','low','young','old', 'strong','weak','rich','poor',
    'beautiful','ugly','clean','full','empty','light','dark','early','late','quick','slow',
    'happy','sad','angry','calm','brave','scared','friendly','mean','kind','cruel',
    'funny','serious','smart','stupid','lucky','unlucky','healthy','sick','safe',
  ];

  function generateWord(syllableCount: number) {
    let word = '';
    for (let i = 0; i < syllableCount; i++) {
      word += syllables[Math.floor(Math.random() * syllables.length)];
    }
    return word;
  }

  let text = '';
  for (let i = 0; i < wordCount; i++) {
    let word;
    if (Math.random() < 0.3) {
      word = englishWords[Math.floor(Math.random() * englishWords.length)];
    } else {
      const syllableCount = Math.floor(Math.random() * 3) + 1;
      word = generateWord(syllableCount);
    }
    if (Math.random() < 0.1) word += ',';
    if (Math.random() < 0.05) word += '.';
    text += word + ' ';
  }

  text = text.trim();
  text = text.charAt(0).toUpperCase() + text.slice(1);
  if (!text.endsWith('.')) text += '.';
  return text;
}

