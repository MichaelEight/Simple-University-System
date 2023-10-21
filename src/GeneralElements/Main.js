import '../GeneralElementsStyles/Main.css'
import Homepage from '../NavPages/Homepage.js' 
import MyIndex from '../NavPages/MyIndex.js'
import MyDziennik from '../NavPages/MyDziennik.js'

export default function Main(props) {
    const { selectedItem, user } = props;
  
    let componentToRender;

    switch (selectedItem) {
      case 0:
        componentToRender = (
          <Homepage />
        );
        break;
      case 1:
        componentToRender = (
          <MyIndex user={user}/>
        );
        break;
      case 2:
        componentToRender = (
          <MyDziennik user={user}/>
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