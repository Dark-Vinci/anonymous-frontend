import MessageCard from "./messageCard"


function MessageCards ({ data }) {
    return (
        <div>
            {
                data.map(datum => {
                    return <MessageCard
                        key = { datum.createdAt }
                        createdAt={ data.createdAt }
                        content = { datum.content }
                    />
                })
            }
        </div>
    );
}

export default MessageCards;