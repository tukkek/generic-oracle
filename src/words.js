export var adjectives=[]
export var adverbs=[]
export var verbs=[]
export var nouns=[]
export var interpretations=[]

async function get(file){
  let json=await fetch('src/words/'+file)
  return await json.json()
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
  //nouns.push(...(await get('fruits.json'))['fruits'])
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
}
