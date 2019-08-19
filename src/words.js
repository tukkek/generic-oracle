export var adjectives=[]
export var adverbs=[]
export var verbs=[]
export var nouns=[]
export var interpretations=[]
export var emoji=[]
export var details=[]

async function get(file,relative=true){
  if(relative) file='src/words/'+file;
  let json=await fetch(file)
  return await json.json()
}

async function loademoji(){
  let emojilib=await get('https://cdn.jsdelivr.net/npm/emojilib@2.4.0/emojis.json',false)
  for(let e in emojilib){
    let c=emojilib[e]['char']
    let keywords=emojilib[e]['keywords']
    keywords.push(e)
    for(let k of keywords) {
      while(k.indexOf('_')>=0) k=k.replace('_',' ')
      emoji.push(`<span class='emoji'>${c}</span> (${k})`)
    }
  }
}

function loaddetails(){
  details.push(...adjectives)
  details.push(...interpretations)
  details.push(...emoji)
}

export async function loadwords(){
  if(adjectives.length) return
  adjectives.push(...(await get('adjs.json'))['adjs'])
  adjectives.push(...(await get('descriptions.json'))['descriptions'])
  adjectives.push(...(await get('moods.json'))['moods'])
  adverbs.push(...(await get('adverbs.json'))['adverbs'])
  verbs.push(...(await get('infinitive_verbs.json')))
  nouns.push(...(await get('nouns.json'))['nouns'])
  nouns.push(...(await get('setting.json'))['settings'].map(s=>s['name']))
  nouns.push(...(await get('event.json'))['events'].map(s=>s['name']))
  nouns.push(...(await get('character.json'))['characters'].map(s=>s['name']))
  nouns.push(...(await get('artifact.json'))['artifacts'].map(s=>s['name']))
  nouns.push(...(await get('passages.json'))['passages'])
  nouns.push(...(await get('rooms.json'))['rooms'])
  nouns.push(...(await get('environmental_hazards.json'))['entries'])
  let venues=(await get('venues.json'))['categories']
  for(let category of venues) for(let venue of category['categories']) nouns.push(venue['name'])
  nouns.push(...(await get('instruments.json'))['instruments'])
  nouns.push(...(await get('monsters.json'))['names'])
  nouns.push(...(await get('objects.json'))['objects'])
  for(let card of (await get('tarot_interpretations.json'))['tarot_interpretations']){
    interpretations.push(...card['meanings']['light'])
    interpretations.push(...card['meanings']['shadow'])
  }
  await loademoji()
  loaddetails()
}
