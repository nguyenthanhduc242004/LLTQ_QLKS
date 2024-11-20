import Header from './Header';
import Sidebar from './Sidebar';

export default function DefaultLayout({ children }) {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <Header />
                <div
                    className="content"
                    style={{
                        height: 'calc(100vh - 56px)',
                        padding: '0 20px',
                        overflowY: 'auto',
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
