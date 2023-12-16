import '../NavPagesStyles/Sidebar.css';
import '../GlobalStyles.css';
import '../NavPagesStyles/AdminPanel.css';
import ResetPasswordTab from './AdminPanelContent/SetPassword.js'

export default function AdminPanel() {
  return (
    <div className="tab-grid-container">
      <div className="tab">
        <ResetPasswordTab />
      </div>
      <div className="tab">
        <div>Content for Tab 2 (Placeholder)</div>
      </div>
      <div className="tab">
        <div>Content for Tab 3 (Placeholder)</div>
      </div>
      <div className="tab">
        <div>Content for Tab 4 (Placeholder)</div>
      </div>
      
      <div className="tab">
        <div>Content for Tab 5 (Placeholder)</div>
      </div>
      <div className="tab">
        <div>Content for Tab 6 (Placeholder)</div>
      </div>
      <div className="tab">
        <div>Content for Tab 7 (Placeholder)</div>
      </div>
      <div className="tab">
        <div>Content for Tab 8 (Placeholder)</div>
      </div>
      {/* Add more tabs here as needed */}
    </div>
  );
}