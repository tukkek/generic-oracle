const HELP=document.querySelector('#help')
const INSTRUCTIONS=`
    Valid amount formats:
    
    2d6\twill roll and sum 2 6-sided die.
    1-3\twill roll a number between 1 and 3.
      5\twill generate exactly 5 results.
    
    Selecting Low will return the lowest of two results.
    Selecting High will return the highest of two results.
`

export function setup(){HELP.onclick=()=>alert(INSTRUCTIONS)}
