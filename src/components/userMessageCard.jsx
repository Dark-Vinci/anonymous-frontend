

function UserMessageCard ({ message, createdAt }) {
    return (
        <div style={{ 
            border: '2px solid white', 
            margin: '10px', padding: '10px', 
            borderRadius: '10px'
        }}>
            <div style={{ fontSize: '9px' }}>Created at <time>{ createdAt }</time></div>
            <div
                style={{ textAlign: 'left' }}
            >{ message }</div>
        </div>
    )
}

export default UserMessageCard;