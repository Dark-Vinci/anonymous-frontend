import Card from "./card"
import classes from '../styles/card.module.css'

function Cards ({ data }) {
    return (
        <div className={ classes.Cards }>
            {
                data.map(datum => {
                    return <Card
                        key = { datum.title + ( new Date()).getTime() }
                        description = { datum.description }
                        heading = { datum.title }
                    />
                })
            }
        </div>
    )
}

export default Cards