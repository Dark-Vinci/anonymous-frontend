import Card from "./card"
import classes from '../styles/cards.module.css'

function Cards ({ data }) {
    return (
        <div className={ classes.container }>
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