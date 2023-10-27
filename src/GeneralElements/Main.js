import '../GeneralElementsStyles/Main.css'
import Homepage from '../NavPages/Homepage.js' 
import MyIndex from '../NavPages/MyIndex.js'
import MyDziennik from '../NavPages/MyDziennik.js'
import MyDziekanat from '../NavPages/MyDziekanat.js'
import Recruitment from '../NavPages/Recruitment.js'
import AdminPanel from '../NavPages/AdminPanel';

export default function Main(props) {
    const { selectedItem, user } = props;
  
    let componentToRender;

    // 0 Homepage
    // 1 MyIndex
    // 2 MyDziennik
    // 3 MyDziekanat
    // 4 Recruitment
    // 5 AdminPanel (hidden for non-admin)
    
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
      case 3:
        componentToRender = (
          <MyDziekanat />
        );
        break;
      case 4:
        componentToRender = (
          <Recruitment />
        );
        break;
      case 4:
        componentToRender = (
          <AdminPanel user={user}/>
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