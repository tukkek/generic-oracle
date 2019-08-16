export function roll(min,max){
  return Math.floor(Math.random()*((max+1)-min))+min
}

export function rolldice(dice,sides){
  var sum=0
  for(let i=0;i<dice;i++) sum+=roll(1,sides)
  return sum
}

export function pick(array){ return array[roll(0,array.length-1)] }

export function chancein(n){return rolldice(1,n)==1}
