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
                    createdAt={ message.date }
                    message={ message.content }
                    key={ message._id }
                />
            })}
        </div>
    )
}

export default UserMessageCards;