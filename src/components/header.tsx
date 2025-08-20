import EzStockLogo from '/EzStockLogo.png?url'

function Header(){
    return (
      <>
<div className="flex items-center">  
          <img src={EzStockLogo} className="w-6/6" alt="EzStock Logo"/>
      
      </div>
      </>
    )
}

export default Header