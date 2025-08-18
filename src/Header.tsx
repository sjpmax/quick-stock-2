import EzStockLogo from '../public/EzStockLogo.png'

function Header(){
    return (
      <>
<div className="flex items-center">  
          <img src={EzStockLogo} className="w-5/6" alt="EzStock Logo"/>
          <div className="w-1/6">w-1/2</div>
      
      </div>
      </>
    )
}

export default Header