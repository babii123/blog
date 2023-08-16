export const processFormat = (figure)=>{
      return figure > 10000 ? (((figure - figure % 1000) / 10000 + 'w')) : (figure)
}