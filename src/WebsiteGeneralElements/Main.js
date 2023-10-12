import './Main.css'
import Homepage from './Homepage.js' 
import MyIndex from './MyIndex.js'
import MyDziennik from './MyDziennik.js'

export default function Main(props) {
    const { selectedItem } = props;
  
    let componentToRender;

    switch (selectedItem) {
      case 0:
        componentToRender = (
          <Homepage />
        );
        break;
      case 1:
        componentToRender = (
          <MyIndex />
        );
        break;
      case 2:
        componentToRender = (
          <MyDziennik />
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