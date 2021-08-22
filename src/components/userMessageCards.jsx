import UserMessageCard from "./userMessageCard";

function UserMessageCards ({ data }) {
    return (
        <div
            style={{
                display: 'flex', 
                flexDirection: 'column'
            }}
        >
            { data.map(message => {
                return <UserMessageCard 
                    createdAt={ message.createdAt }
                    message={ message.message }
                    key={ message.createdAt }
                />
            })}
        </div>
    )
}

export default UserMessageCards;