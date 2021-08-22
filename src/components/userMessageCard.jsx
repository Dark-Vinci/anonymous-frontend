

function UserMessageCard ({ message, createdAt }) {
    return (
        <div style={{ 
            border: '2px solid white', 
            margin: '10px', padding: '10px', 
            borderRadius: '10px'
        }}>
            <div>Created at <time>{ createdAt }</time></div>
            <div
                style={{ textAlign: 'left' }}
            >{ message }</div>
        </div>
    )
}

export default UserMessageCard;