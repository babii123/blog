import React, { DetailedHTMLProps, HTMLAttributes } from 'react'

interface styleModel {
  textAlign:string,
  padding:string,
  color:string,
  fontSize:string
}

const Footer: React.FC = () => {
      const style = {
            textAlign: 'center' as 'center',
            padding:'1rem' as '1rem',
            color:'#888' as '#888',
            fontSize:'10px' as '10px'
      }
      return (
        <div>
          <div style={style}>
            <div>系统由 React+Node+Ant Desgin驱动 </div>
            <div>Babii.com</div>
          </div>
        </div>
      );
}

export default Footer
