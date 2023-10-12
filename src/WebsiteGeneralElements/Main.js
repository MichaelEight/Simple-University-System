import './Main.css'
import Homepage from './Homepage.js' 
import MyIndex from './MyIndex.js'
import MyDziennik from './MyDziennik.js'

export default function Main(props) {
    const { selectedItem } = props;
  
    let componentToRender;
  
    // Debug, because putting it to .css doesn't work
    const sideSelectedStyles = {
      fontWeight: 'bold',
      textDecoration: 'underline',
      textDecorationColor: 'blue', // Specify the color
      textDecorationThickness: '5px', // Specify the thickness
      textUnderlineOffset: '10px',
    };

    switch (selectedItem) {
      case 0:
        componentToRender = (
          <Homepage sideSelectedStyles={sideSelectedStyles}/>
        );
        break;
      case 1:
        componentToRender = (
          <MyIndex sideSelectedStyles={sideSelectedStyles}/>
        );
        break;
      case 2:
        componentToRender = (
          <MyDziennik sideSelectedStyles={sideSelectedStyles}/>
        );
        break;
      default:
        componentToRender = <div>Placeholder for other values</div>;
    }

    return (
      <div className="middle-container">
        {componentToRender}
      </div>
    );
  }