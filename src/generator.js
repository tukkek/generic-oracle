import {roll,rolldice,pick,chancein} from './rpg.js'
import {adjectives,nouns,adverbs,verbs,details} from './words.js'

var rows=false
var columns=false
var units=[]

function capitalize(s){return s[0].toUpperCase()+s.substring(1).toLowerCase()}

class Unit{
  constructor(){
    this.title=capitalize(pick(adjectives)+' '+pick(nouns))
    this.details=[]
    let ndetails=roll(1,4)
    while(this.details.length<ndetails) 
      this.details.push(capitalize(pick(details)))
    let goal=pick(verbs)+' '+pick(nouns)
    if(chancein(4)) goal=pick(adverbs)+' '+goal
    this.details.push('Goal: '+goal.toLowerCase())
  }
}

function getoption(option){
  return Number(document.querySelector('#controls #'+option).value)
}

function refresh(){
  document.querySelector('#details').innerHTML=''
  rows=getoption('rows')
  columns=getoption('columns')
  let map=document.querySelector('#map');
  map.innerHTML=''
  for(let x=0;x<rows;x++){
    let row=document.createElement('tr')
    for(let y=0;y<columns;y++) row.appendChild(document.createElement('td'))
    map.appendChild(row)
  }
  units.splice(0);
}

function drawcards(){
  let details=document.querySelector('#details')
  let template=document.querySelector('template#detail')
  for(let i=0;i<units.length;i++){
    let detail=document.importNode(template.content, true)
    let u=units[i]
    detail.querySelector('.title').innerHTML=(i+1)+'. '+u.title
    let descriptions=detail.querySelector('.description')
    for(let d of u.details){
      let description=document.createElement('li')
      description.innerHTML=d
      descriptions.appendChild(description)
    }
    details.appendChild(detail)
  }
}

export function generate(interesting=false){
  refresh()
  if(!interesting) interesting=rolldice(getoption('amount'),getoption('dice'))
  if(interesting>rows*columns) interesting=rows*columns
  let occupied=new Set()
  let map=document.querySelector('#map')
  while(occupied.size<interesting){
    let x=roll(1,rows)-1
    let y=roll(1,columns)-1
    if(occupied.has(x+':'+y)) continue
    occupied.add(x+':'+y)
    let u=new Unit()
    units.push(u)
    map.querySelectorAll('tr')[x].querySelectorAll('td')[y].innerHTML=u.title
  }
  units.sort(function(a,b){
    if (a.title>b.title) return 1
    if (b.title<a.title) return -1
    return 0;
  })
  drawcards()
}
