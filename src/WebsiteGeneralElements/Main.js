import './Main.css'
import Page0 from'./Homepage.js' 

export default function Main(props) {
    const { selectedItem } = props;
  
    let componentToRender;
  
    switch (selectedItem) {
      case 0:
        componentToRender = (
          <Page0 />
        );
        break;
      // Uncomment the following case if you want to render MyIndex for selectedItem === 1
      // case 1:
      //   componentToRender = <MyIndex />;
      //   break;
      default:
        componentToRender = <div>Placeholder for other values</div>;
    }
  
    return (
      <div className="middle-container">
        {componentToRender}
      </div>
    );
  }