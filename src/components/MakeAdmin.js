import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

// Add these icon imports (you'll need to install @heroicons/react)
import { UserIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { ShieldCheckIcon as ShieldCheckSolid } from '@heroicons/react/24/solid';

const cardStyle = {
  background: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 16px rgba(0,0,0,0.09)',
  padding: '20px',
  margin: '20px 0',
  maxWidth: '400px'
};

const listItemStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 16px',
  margin: '8px 0',
  background: '#f8f9fa',
  borderRadius: '8px',
  transition: 'all 0.2s',
  cursor: 'pointer',
  ':hover': {
    background: '#f1f3f5',
    transform: 'translateX(4px)'
  }
};

const buttonStyle = {
  background: '#1976d2',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  padding: '8px 16px',
  fontSize: '0.9rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'background 0.2s'
};

const MakeAdmin = (props) => {
  const data = props.data;
  const [processingId, setProcessingId] = React.useState(null);

  const makeAdminRequest = async (user_id) => {
    if (!user_id) {
      toast.error("No user selected");
      return;
    }

    setProcessingId(user_id);

    try {
      const response = await axios.patch("https://eduquest-backend-two.vercel.app/api/admin/add-admin", {
        user_id: user_id,
      });

      toast.success(response.data.message, {
        duration: 4000,
        style: {
          background: '#e3f2fd',
          color: '#1976d2',
          border: '1px solid #90caf9'
        }
      });
      props.fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed", {
        style: {
          background: '#fde3e3',
          color: '#d32f2f',
          border: '1px solid #ef9a9a'
        }
      });
    }
    setProcessingId(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={cardStyle}>
        <h3 style={{
          margin: '0 0 20px 0',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#1976d2'
        }}>
          <ShieldCheckSolid width={24} height={24} />
          Manage Admins
        </h3>

        <div style={{ marginTop: '16px' }}>
          {data.map((user) => (
            <div
              key={user._id}
              style={listItemStyle}
              onClick={() => !processingId && makeAdminRequest(user._id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <UserIcon width={20} height={20} style={{ color: '#6c757d' }} />
                <span style={{ fontWeight: 500 }}>{user.username}</span>
              </div>

              <button
                style={{
                  ...buttonStyle,
                  background: processingId === user._id ? '#b0bec5' : '#1976d2',
                  cursor: processingId ? 'not-allowed' : 'pointer'
                }}
                disabled={processingId === user._id}
              >
                {processingId === user._id ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <ShieldCheckIcon width={16} height={16} />
                    Make Admin
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '8px',
            fontSize: '0.9rem'
          }
        }}
      />
    </div>
  );
};

export default MakeAdmin;
