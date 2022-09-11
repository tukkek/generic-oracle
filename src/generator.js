import {roll,rolldice,pick,chancein} from './rpg.js'
import {adjectives,nouns,adverbs,verbs} from './words.js'

const HIGH=document.querySelector('input[value="high"]')
const LOW=document.querySelector('input[value="low"]')

var rows=false
var columns=false
var units=[]

function capitalize(s){return s[0].toUpperCase()+s.substring(1).toLowerCase()}

class Unit{
  constructor(){
    let stack=[]
    while(stack.length==0){
      if(chancein(2)){
        if(chancein(2)) stack.push(adverbs)
        stack.push(verbs)
      }
      if(chancein(2)){
        if(chancein(2)) stack.push(adjectives)
        stack.push(nouns)
      }
    }
    this.title=capitalize(stack.map(s=>pick(s)).join(' '))
    /*this.details=[]
    let ndetails=1
    while(chancein(2)) ndetails+=1
    //ndetails=2
    while(this.details.length<ndetails) 
      this.details.push(capitalize(pick(details)))
    let goal=pick(verbs)+' '+pick(nouns)
    if(chancein(4)) goal=pick(adverbs)+' '+goal
    this.details.push('Goal: '+goal.toLowerCase())*/
  }
}

function getoption(option){
  return Number(document.querySelector('#controls #'+option).value)
}

function refresh(){
  //document.querySelector('#details').innerHTML=''
  rows=getoption('rows')
  columns=getoption('columns')
  let map=document.querySelector('#map');
  map.innerHTML=''
  for(let x=0;x<rows;x++){
    let row=document.createElement('tr')
    for(let y=0;y<columns;y++){
      let td=document.createElement('td')
      td.innerHTML='&nbsp;';
      row.appendChild(td)
    }
    map.appendChild(row)
  }
  units.splice(0);
}

/*function drawcards(){
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
}*/

function getamount(){
  let a=document.querySelector('#controls #amount').value
  if(a.indexOf('-')>=0){
    a=a.split('-').map(a=>Number(a))
    return roll(a[0],a[1])
  }
  if(a.indexOf('d')>=0){
    a=a.split('d').map(a=>Number(a))
    return rolldice(Number(a[0]),Number(a[1]))
  }
  return Number(a)
}

export function generate(interesting=false){
  refresh()
  if(!interesting){
    if(HIGH.checked) interesting=Math.max(getamount(),getamount())
    else if(LOW.checked) interesting=Math.min(getamount(),getamount())
    else interesting=getamount()
  }
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
  //drawcards()
}
